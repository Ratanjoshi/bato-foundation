import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Toast from "@/components/Toast";
import { handleError } from "@/utils/responseHandler";
import {
  useListBesidesProgramsQuery,
  useDeleteBesidesProgramMutation,
  usePublishBesidesProgramByIdMutation,
} from "@/redux/services/besidesProgram";
import { BESIDES_PROGRAM_ADD_ROUTE } from "@/routes/routeNames";
import { ICONS } from "./IconPicker";
import moment from "moment";

const BesidesProgramList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isPublished, setIsPublished] = useState<string>("");

  const { data, isLoading, isFetching } = useListBesidesProgramsQuery({
    page,
    limit,
    search,
    isPublished,
  });

  const [deleteItem] = useDeleteBesidesProgramMutation();
  const [publishItem] = usePublishBesidesProgramByIdMutation();

  const items = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const total = data?.meta?.total ?? 0;

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      const res = await deleteItem(id).unwrap();
      Toast(res?.message || "Deleted successfully", "success");
    } catch (error) {
      handleError({ error });
    }
  };

  const handlePublishToggle = async (id: number) => {
    try {
      const res = await publishItem(id).unwrap();
      Toast(res?.message || "Updated successfully", "success");
    } catch (error) {
      handleError({ error });
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-semibold">Besides Programs</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage "Beyond Programmes" cards
          </p>
        </div>
        <Button
          className="bg-primaryColor text-white px-4 py-2 rounded"
          leftSection={<MdAdd />}
          handleClick={() => navigate(BESIDES_PROGRAM_ADD_ROUTE)}
        >
          Add Item
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <Input
          placeholder="Search title or description"
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
        <div className="flex items-center text-sm text-gray-500">
          Total: {total}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-[#f3f7fa] text-left">
            <tr>
              <th className="p-3 w-16">Icon</th>
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3 w-20">Order</th>
              <th className="p-3 w-32">Published</th>
              <th className="p-3 w-28">Created</th>
              <th className="p-3 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || isFetching ? (
              <tr>
                <td colSpan={7} className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-6">
                  No items found.
                </td>
              </tr>
            ) : (
              items.map((p: any) => {
                const Icon = ICONS[p.icon] || ICONS.Sparkles;
                return (
                  <tr key={p.id} className="border-t hover:bg-gray-50/60">
                    <td className="p-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primaryColor text-white">
                        <Icon size={16} />
                      </span>
                    </td>
                    <td className="p-3 font-medium">{p.title}</td>
                    <td className="p-3 text-gray-600 max-w-md truncate">
                      {p.description}
                    </td>
                    <td className="p-3 text-center">{p.order}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handlePublishToggle(p.id)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                          p.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {p.isPublished ? (
                          <>
                            <Eye size={12} /> Published
                          </>
                        ) : (
                          <>
                            <EyeOff size={12} /> Draft
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-3 text-gray-500">
                      {p.createdAt
                        ? moment(p.createdAt).format("DD MMM YYYY")
                        : "—"}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          className="text-blue-600"
                          onClick={() =>
                            navigate(`/admin/besides-program/${p.id}`)
                          }
                          title="Edit"
                        >
                          <MdEdit size={18} />
                        </button>
                        <button
                          className="text-red-600"
                          onClick={() => handleDelete(p.id)}
                          title="Delete"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
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

export default BesidesProgramList;
