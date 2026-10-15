// admin/src/pages/WhatWeDo/index.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

import {
  useListWhatWeDoQuery,
  useDeleteWhatWeDoMutation,
  useUpdateWhatWeDoMutation,
} from "@/redux/services/whatWeDo";

import { handleResponse, handleError } from "@/utils/responseHandler";
import { IMAGE_BASE_URL } from "@/constants";

import PageHeader from "@/components/PageHeader";
import Table from "@/components/Table";
import Model from "@/components/Model";
import Button from "@/components/Button";
import Loader from "@/components/Loader";

import type { WhatWeDoItem } from "./types";

export default function WhatWeDoList() {
  const navigate = useNavigate();

  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const {
    data: response,
    isLoading,
    refetch,
  } = useListWhatWeDoQuery({
    ...query,
    search: search || undefined,
  });

  const [deleteItem, { isLoading: isDeleting }] = useDeleteWhatWeDoMutation();
  const [updateItem] = useUpdateWhatWeDoMutation();

  const items = response?.data.items ?? [];
  const pagination = response?.data.pagination ?? {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  const handlePagination = (p: Partial<typeof pagination>) => {
    setQuery((prev) => ({
      page: p.page ?? prev.page,
      limit: p.limit ?? prev.limit,
    }));
  };

  const handleDelete = async () => {
    if (deleteId == null) return;
    try {
      const res = await deleteItem(deleteId).unwrap();
      handleResponse({ res, onSuccess: () => setDeleteId(null) });
    } catch (error) {
      handleError({ error });
    }
  };

  const handleToggleActive = async (item: WhatWeDoItem) => {
    try {
      const res = await updateItem({
        id: item.id,
        body: { isActive: !item.isActive },
      }).unwrap();
      handleResponse({ res, onSuccess: () => {} });
    } catch (error) {
      handleError({ error });
    }
  };

  const headers = [
    "S.N.",
    "Image",
    "Title",
    "Icon",
    "Points",
    "Order",
    "Active",
    "Actions",
  ];

  const tableData = items.map((item, idx) => [
    <span key={`n-${item.id}`}>{idx + 1}</span>,
    <img
      key={`i-${item.id}`}
      src={
        item.image
          ? item.image.startsWith("http")
            ? item.image
            : `${IMAGE_BASE_URL}${item.image}`
          : "/placeholder.png"
      }
      alt={item.title}
      className="w-[60px] h-[40px] object-cover rounded mx-auto"
    />,
    <div key={`t-${item.id}`} className="font-medium">
      {item.title}
      <div className="text-xs text-gray-400">/{item.slug}</div>
    </div>,
    <span key={`ic-${item.id}`} className="font-mono text-xs">
      {item.icon}
    </span>,
    <span key={`p-${item.id}`} className="text-xs">
      {item.points?.length ?? 0}
    </span>,
    <span key={`o-${item.id}`}>{item.order}</span>,
    <button
      key={`a-${item.id}`}
      onClick={() => handleToggleActive(item)}
      className={item.isActive ? "text-green-600" : "text-gray-400"}
      title={item.isActive ? "Active" : "Inactive"}
    >
      {item.isActive ? <FaEye /> : <FaEyeSlash />}
    </button>,
    <div
      key={`ac-${item.id}`}
      className="flex items-center justify-center gap-[10px]"
    >
      <FaEdit
        className="text-primaryColor cursor-pointer"
        onClick={() => navigate(`/admin/what-we-do/${item.id}`)}
      />
      <FaTrash
        className="text-red-500 cursor-pointer"
        onClick={() => setDeleteId(item.id)}
      />
    </div>,
  ]);

  return (
    <div className="p-[2rem]">
      <PageHeader
        hasAddButton
        newButtonText="Add What We Do"
        handleNewButton={() => navigate("/admin/what-we-do")}
        handleReloadButton={() => refetch()}
      />

      <div className="mb-[1rem] flex justify-end">
        <input
          type="text"
          placeholder="Search title or description..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setQuery((q) => ({ ...q, page: 1 }));
          }}
          className="border border-gray-300 rounded px-3 py-2 w-[20rem] bg-white"
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <Table
          isSN={false}
          headers={headers}
          data={tableData}
          pagination={pagination}
          handlePagination={handlePagination}
        />
      )}

      <Model
        title="Delete Item"
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
      >
        <div className="p-[1rem]">
          <p className="mb-[1.5rem]">
            Are you sure you want to delete this item? This cannot be undone.
          </p>
          <div className="flex justify-end gap-[1rem]">
            <Button
              className="bg-gray-300 text-black rounded"
              handleClick={() => setDeleteId(null)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-500 text-white rounded"
              isLoading={isDeleting}
              handleClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Model>
    </div>
  );
}
