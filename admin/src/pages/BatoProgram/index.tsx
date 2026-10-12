import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Toast from "@/components/Toast";
import { handleError } from "@/utils/responseHandler";
import {
  useListBatoProgramsQuery,
  useDeleteBatoProgramMutation,
  usePublishBatoProgramByIdMutation,
} from "@/redux/services/batoProgram";
import { BATO_PROGRAM_ADD_ROUTE } from "@/routes/routeNames";
import moment from "moment";
import { IMAGE_BASE_URL } from "@/constants";

const BatoProgramList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isPublished, setIsPublished] = useState<string>("");

  const { data, isLoading, isFetching } = useListBatoProgramsQuery({
    page,
    limit,
    search,
    status,
    isPublished: isPublished === "" ? undefined : isPublished,
  });

  const [deleteProgram] = useDeleteBatoProgramMutation();
  const [publishProgram] = usePublishBatoProgramByIdMutation();

  const programs = data?.data?.rows ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this program?")) return;
    try {
      const res = await deleteProgram(id).unwrap();
      Toast(res?.msg || "Deleted successfully", "success");
    } catch (error) {
      handleError({ error });
    }
  };

  const handlePublishToggle = async (id: number, current: boolean) => {
    try {
      const res = await publishProgram({ id, isPublished: !current }).unwrap();
      Toast(res?.msg || "Updated successfully", "success");
    } catch (error) {
      handleError({ error });
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">BATO Programs</h1>
        <Button
          className="bg-primaryColor text-white px-4 py-2 rounded"
          leftSection={<MdAdd />}
          handleClick={() => navigate(BATO_PROGRAM_ADD_ROUTE)}
        >
          Add Program
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <Input
          placeholder="Search title, description, location"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="border rounded px-3 py-2"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          className="border rounded px-3 py-2"
          value={isPublished}
          onChange={(e) => {
            setIsPublished(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All</option>
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
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Status</th>
              <th className="p-3">Location</th>
              <th className="p-3">Published</th>
              <th className="p-3">Order</th>
              <th className="p-3">Created</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || isFetching ? (
              <tr>
                <td colSpan={9} className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : programs.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-6">
                  No programs found.
                </td>
              </tr>
            ) : (
              programs.map((p: any) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">
                    {p.image ? (
                      <img
                        src={
                          p.image.startsWith("http")
                            ? p.image
                            : `${IMAGE_BASE_URL}${p.image}`
                        }
                        alt={p.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="p-3">{p.title}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{p.status}</td>
                  <td className="p-3">{p.location}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handlePublishToggle(p.id, p.isPublished)}
                      className={`px-2 py-1 rounded text-xs ${
                        p.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {p.isPublished ? "Published" : "Unpublished"}
                    </button>
                  </td>
                  <td className="p-3">{p.order}</td>
                  <td className="p-3">
                    {p.createdAt
                      ? moment(p.createdAt).format("DD MMM YYYY")
                      : "—"}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600"
                        onClick={() => navigate(`/admin/bato-program/${p.id}`)}
                      >
                        <MdEdit size={18} />
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(p.id)}
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

export default BatoProgramList;
