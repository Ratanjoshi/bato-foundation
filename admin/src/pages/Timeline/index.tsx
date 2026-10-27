import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Toast from "@/components/Toast";
import { handleError } from "@/utils/responseHandler";
import {
  useListTimelinesQuery,
  useDeleteTimelineMutation,
  usePublishTimelineByIdMutation,
} from "@/redux/store/api";
import { TIMELINE_ADD_ROUTE, TIMELINE_EDIT_ROUTE } from "@/routes/routeNames";
import moment from "moment";
import { IMAGE_BASE_URL } from "@/constants";

const TimelineList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isPublished, setIsPublished] = useState<string>("");

  const { data, isLoading, isFetching } = useListTimelinesQuery({
    page,
    limit,
    search,
    isPublished: isPublished === "" ? undefined : isPublished,
  });

  const [deleteTimeline] = useDeleteTimelineMutation();
  const [publishTimeline] = usePublishTimelineByIdMutation();

  const timelines = data?.data?.rows ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this timeline entry?")) return;
    try {
      const res = await deleteTimeline(id).unwrap();
      Toast(res?.msg || "Deleted successfully", "success");
    } catch (error) {
      handleError({ error });
    }
  };

  const handlePublishToggle = async (id: number, current: boolean) => {
    try {
      const res = await publishTimeline({ id, isPublished: !current }).unwrap();
      Toast(res?.msg || "Updated successfully", "success");
    } catch (error) {
      handleError({ error });
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Timeline Milestones</h1>
        <Button
          className="bg-primaryColor text-white px-4 py-2 rounded"
          leftSection={<MdAdd />}
          handleClick={() => navigate(TIMELINE_ADD_ROUTE)}
        >
          Add Milestone
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <Input
          placeholder="Search title, year, description..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="border rounded px-3 py-2"
          value={isPublished}
          onChange={(e) => {
            setIsPublished(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="true">Published</option>
          <option value="false">Unpublished</option>
        </select>
        <select
          className="border rounded px-3 py-2"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={10}>10 / page</option>
          <option value={25}>25 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-[#f3f7fa] text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Year</th>
              <th className="p-3">Title</th>
              <th className="p-3">Order</th>
              <th className="p-3">Published</th>
              <th className="p-3">Created</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || isFetching ? (
              <tr>
                <td colSpan={7} className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : timelines.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-6">
                  No timeline entries found.
                </td>
              </tr>
            ) : (
              timelines.map((t: any) => (
                <tr key={t.id} className="border-t">
                  <td className="p-3">
                    {t.image ? (
                      <img
                        src={
                          t.image.startsWith("http")
                            ? t.image
                            : `${IMAGE_BASE_URL}${t.image}`
                        }
                        alt={t.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="p-3 font-semibold text-accent">{t.year}</td>
                  <td className="p-3 max-w-[200px] truncate" title={t.title}>
                    {t.title}
                  </td>
                  <td className="p-3">{t.order}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handlePublishToggle(t.id, t.isPublished)}
                      className={`px-2 py-1 rounded text-xs ${
                        t.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {t.isPublished ? "Published" : "Unpublished"}
                    </button>
                  </td>
                  <td className="p-3">
                    {t.createdAt
                      ? moment(t.createdAt).format("DD MMM YYYY")
                      : "—"}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600"
                        onClick={() => navigate(TIMELINE_EDIT_ROUTE(t.id))}
                      >
                        <MdEdit size={18} />
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(t.id)}
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            className="px-3 py-1 border rounded"
            handleClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Prev
          </Button>
          <Button
            className="px-3 py-1 border rounded"
            handleClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimelineList;
