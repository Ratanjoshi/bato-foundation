import { useUpdateQnaOrderMutation } from "@/redux/services/qna";
import { handleError, handleResponse } from "@/utils/responseHandler";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function DraggableTable({ tableData }) {
  const [updatedTableData, setUpdatedTableData] = useState(tableData);

  const [updateQnaOrder] = useUpdateQnaOrderMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setUpdatedTableData((prevData) => {
      const oldIndex = prevData.findIndex((row) => row[1] === active.id);
      const newIndex = prevData.findIndex((row) => row[1] === over.id);

      if (oldIndex === -1 || newIndex === -1) return prevData;

      const newData = [...prevData];
      const [movedItem] = newData.splice(oldIndex, 1);
      newData.splice(newIndex, 0, movedItem);

      const updatedData = newData.map((row, index) => [index, ...row.slice(1)]);

      updateOrder(updatedData);
      return updatedData;
    });
  };

  const updateOrder = async (updatedData) => {
    const body = updatedData.map((each) => {
      return { id: each[1], order: each[0] };
    });
    try {
      const response = await updateQnaOrder(body).unwrap();
      handleResponse({ res: response, onSuccess: () => {} });
    } catch (error) {
      handleError({ error });
    }
  };

  const pagination = {
    page: 1,
    limit: 10,
    total: 10,
    tableData: 10,
    totalPages: 1,
  };

  const handlePagination = (pagination) => {};

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <Table data={updatedTableData} />
      {/* Pagination */}
      <div className="mt-[6px] flex justify-between ">
        <div>
          <p className="font-[500] text-[0.875rem] text-[#2F2B3D] bg-white px-[0.75rem] py-[0.5rem]">
            Show:{" "}
            <select
              name="pagination"
              id="pagination"
              value={pagination.limit}
              className="bg-white"
              onChange={(e) =>
                handlePagination &&
                handlePagination({ limit: Number(e.target.value) })
              }
            >
              {[10, 25, 50, 100].map((each) => (
                <option key={each} value={each}>
                  {each}
                </option>
              ))}
            </select>{" "}
            entries
          </p>
        </div>
        <div className="flex gap-[1rem] ">
          <button
            className={
              pagination.page === 1 ? "text-gray-400 cursor-not-allowed" : ""
            }
            disabled={pagination.page === 1}
            onClick={() => handlePagination({ page: pagination.page - 1 })}
          >
            <FaAngleLeft size={24} />
          </button>
          <button
            className={
              pagination.page === pagination.totalPages
                ? "text-gray-400 cursor-not-allowed"
                : ""
            }
            disabled={pagination.page === pagination.totalPages}
            onClick={() => handlePagination({ page: pagination.page + 1 })}
          >
            <FaAngleRight size={24} />
          </button>
        </div>
        <div className="flex gap-[0.875rem]">
          <p className="font-[500] text-[0.875rem] text-[#2F2B3D] bg-white px-[0.75rem] py-[0.5rem]">
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <p className="font-[500] text-[0.875rem] text-[#2F2B3D] bg-white px-[0.75rem] py-[0.5rem]">
            Total Data: {pagination.total}
          </p>
        </div>
      </div>
    </DndContext>
  );
}

function Table({ data }) {
  const newData = data.sort((a, b) => a[0] - b[0]);
  return (
    <div>
      {/* Table Headers */}
      <div className="flex w-full justify-between bg-primaryColor px-4 py-2 text-center text-white font-[400] text-[1.125rem] whitespace-nowrap">
        <p className="w-[33%]">Title</p>
        <p className="w-[33%]">Page Name</p>
        <p className="w-[33%]">Action</p>
      </div>
      {/* Table Content */}
      <div className=" py-2 text-center font-[400] text-[1.125rem]">
        <SortableContext
          items={data.map((row) => row[1])} // Pass array of unique IDs
          strategy={verticalListSortingStrategy}
        >
          {data
            .sort((a, b) => a[0] - b[0])
            .map((each) => (
              <TableContent key={each[0]} id={each[1]} data={each} />
            ))}
        </SortableContext>
      </div>
    </div>
  );
}

function TableContent({ id, data }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="flex w-full justify-between py-[0.25rem]"
    >
      {data.slice(2).map((item, index) => (
        <p key={index} className="w-[33%]">
          {item}
        </p>
      ))}
    </div>
  );
}
