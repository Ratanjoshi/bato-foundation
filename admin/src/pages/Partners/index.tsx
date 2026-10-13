import { useState, useEffect } from "react";
import Table from "@/components/Table";
import ToggleSwitch from "@/components/Switch";
import {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
  Partner,
} from "../../api/partners";

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Pagination State (required by the Table component)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const loadPartners = async () => {
    setIsLoading(true);
    try {
      const data = await getPartners();
      setPartners(data);
      setPagination((prev) => ({
        ...prev,
        total: data.length,
        totalPages: Math.ceil(data.length / prev.limit) || 1,
      }));
    } catch (error) {
      console.error("Failed to load partners", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const handleCreateOpen = () => {
    setEditingPartner(null);
    setName("");
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleEditOpen = (partner) => {
    setEditingPartner(partner);
    setName(partner.name);
    setIsActive(partner.isActive);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Partner name is required");

    try {
      if (editingPartner) {
        await updatePartner(editingPartner.id, { name, isActive });
      } else {
        await createPartner({ name, isActive });
      }
      setIsModalOpen(false);
      loadPartners();
    } catch (error) {
      console.error("Failed to save partner", error);
      alert("Error saving partner.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      try {
        await deletePartner(id);
        loadPartners();
      } catch (error) {
        console.error("Failed to delete partner", error);
      }
    }
  };

  const handlePagination = (newPagination) => {
    setPagination((prev) => ({ ...prev, ...newPagination }));
  };

  const currentPartners = partners.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit,
  );

  // Convert data to array of arrays for the Table component
  const tableData = currentPartners.map((partner) => [
    partner.id,
    partner.name,
    <span
      key={`status-${partner.id}`}
      className={`px-2 py-1 rounded text-xs font-medium ${
        partner.isActive
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {partner.isActive ? "Active" : "Inactive"}
    </span>,
    <div key={`actions-${partner.id}`} className="flex gap-2 justify-center">
      <button
        className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
        onClick={() => handleEditOpen(partner)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
        onClick={() => handleDelete(partner.id)}
      >
        Delete
      </button>
    </div>,
  ]);

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Partners</h1>
          <p className="text-gray-500 text-sm mt-1">
            Add, edit, or remove partner organizations.
          </p>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          onClick={handleCreateOpen}
        >
          Add New Partner
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white rounded-lg shadow">
        {isLoading ? (
          <div className="p-6 text-center text-gray-500">
            Loading partners...
          </div>
        ) : (
          <Table
            headers={["ID", "Partner Name", "Status", "Actions"]}
            data={tableData}
            pagination={pagination}
            handlePagination={handlePagination}
            isSN={false}
          />
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-lg font-bold mb-4">
              {editingPartner ? "Edit Partner" : "Add New Partner"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Partner Name
                </label>
                <input
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Global Health Initiative"
                />
              </div>

              <div className="flex items-center gap-2">
                <ToggleSwitch
                  isActive={isActive}
                  onToggle={(val) => setIsActive(val)}
                />
                <label className="text-sm font-medium text-gray-700">
                  Active
                </label>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={handleSubmit}
                >
                  Save Partner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
