import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Toast from "@/components/Toast";
import { handleError } from "@/utils/responseHandler";
import {
  useListLeadershipsQuery,
  useDeleteLeadershipMutation,
  useUpdateLeadershipMutation,
} from "@/redux/services/api";
import { LEADERSHIP_ADD_ROUTE } from "@/routes/routeNames";
import moment from "moment";
import { IMAGE_BASE_URL } from "@/constants";

const LeadershipList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [published, setPublished] = useState<string>("");

  const { data, isLoading, isFetching } = useListLeadershipsQuery({
    page,
    limit,
    search,
    published: published === "" ? undefined : published,
  });

  const [deleteMember] = useDeleteLeadershipMutation();
  const [updateMember] = useUpdateLeadershipMutation();

  const members = data?.data?.rows ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this member?")) return;
    try {
      const res = await deleteMember(id).unwrap();
      Toast(res?.message || "Deleted successfully", "success");
    } catch (error) {
      handleError({ error });
    }
  };

  const handlePublishToggle = async (id: number, current: boolean) => {
    try {
      const res = await updateMember({
        id,
        body: { published: !current },
      }).unwrap();
      Toast(res?.message || "Status updated", "success");
    } catch (error) {
      handleError({ error });
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Leadership Team</h1>
        <Button
          className="bg-primaryColor text-white px-4 py-2 rounded flex items-center gap-2"
          leftSection={<MdAdd />}
          handleClick={() => navigate(LEADERSHIP_ADD_ROUTE)}
        >
          Add Member
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <Input
          placeholder="Search name, role..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="border rounded px-3 py-2"
          value={published}
          onChange={(e) => {
            setPublished(e.target.value);
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
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Portfolio</th>
              <th className="p-3">Published</th>
              <th className="p-3">Order</th>
              <th className="p-3">Created</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || isFetching ? (
              <tr>
                <td colSpan={8} className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-6">
                  No members found.
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m.id} className="border-t">
                  <td className="p-3">
                    {m.image ? (
                      <img
                        src={
                          m.image.startsWith("http")
                            ? m.image
                            : `${IMAGE_BASE_URL}${m.image}`
                        }
                        alt={m.name}
                        className="h-12 w-12 object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="p-3 font-medium">{m.name}</td>
                  <td className="p-3">{m.role}</td>
                  <td className="p-3">
                    {m.portfolio ? (
                      <a
                        href={m.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Link
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handlePublishToggle(m.id!, m.published)}
                      className={`px-2 py-1 rounded text-xs ${
                        m.published
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {m.published ? "Published" : "Unpublished"}
                    </button>
                  </td>
                  <td className="p-3">{m.order}</td>
                  <td className="p-3">
                    {m.createdAt
                      ? moment(m.createdAt).format("DD MMM YYYY")
                      : "—"}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600"
                        onClick={() =>
                          navigate(`/admin/about/leadership/${m.id}`)
                        }
                      >
                        <MdEdit size={18} />
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(m.id!)}
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

export default LeadershipList;
