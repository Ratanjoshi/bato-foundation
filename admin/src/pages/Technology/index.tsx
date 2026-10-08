import PageHeader from "@/components/PageHeader";
import { checkAccess } from "@/utils/accessHelper";
import { useState } from "react";
import { ViewType } from "../Users";
import { MdEditSquare } from "react-icons/md";
import DeleteModal from "@/components/DeleteModal";
import { handleError, handleResponse } from "@/utils/responseHandler";
import Table from "@/components/Table";
import { PaginationType } from "@/types/commonTypes";
import { useNavigate } from "react-router-dom";
import {
  TECHNOLOGY_ADD_ROUTE,
  TECHNOLOGY_LIST_ROUTE,
} from "@/routes/routeNames";
import {
  useDeleteTechnologyMutation,
  useListAllTechnologiesQuery,
} from "@/redux/services/technologies";
import { IMAGE_BASE_URL } from "@/constants";
// import Card1 from "@/components/GridView/card1";

const tableHeaders = ["Name", "image", "Actions"];

export default function Technology() {
  const navigate = useNavigate();
  const accessList = checkAccess("Technology");

  // console.log(accessList);

  //   utils function and states
  const [editId, setEditId] = useState<number | null>(null);

  //   for query
  const [query, setQuery] = useState({ page: 1, limit: 10 });

  //   for delete operation
  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [viewType, setViewType] = useState<ViewType>("list");

  const [deleteTechnology] = useDeleteTechnologyMutation();

  //   api calls
  const {
    data: allTechnologies,
    isSuccess: success,
    refetch,
  } = useListAllTechnologiesQuery(query);

  // functions
  const handleDeleteTrigger = (id: number) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteTechnology(deleteId).unwrap();
      handleResponse({
        res: response,
        onSuccess: () => {
          navigate(`${TECHNOLOGY_LIST_ROUTE}`);
        },
      });
    } catch (error) {
      handleError({ error });
    } finally {
      setOpen(false);
    }
  };

  //   functions

  const handleNavigation = (id: number | null) => {
    if (id === null) {
      navigate(TECHNOLOGY_ADD_ROUTE);
    } else {
      navigate(`${TECHNOLOGY_ADD_ROUTE}${id}`);
    }
  };

  const handleReload = () => {
    refetch();
  };

  const toggleViewType = (type: ViewType) => {
    setViewType(type);
  };

  const pagination = {
    page: allTechnologies?.data?.page ?? 1,
    limit: allTechnologies?.data?.limit ?? 10,
    total: allTechnologies?.data?.total ?? 0,
    totalPages: allTechnologies?.data?.totalPages ?? 0,
  };

  const handlePagination = (pagination: PaginationType) => {
    setQuery((prev) => ({
      ...prev,
      ...pagination,
    }));
    refetch();
  };

  const tableData =
    success && allTechnologies?.data?.data
      ? allTechnologies.data?.data.map(({ id, name, image }) => [
          name,
          <img
            src={`${IMAGE_BASE_URL}${image}`}
            crossOrigin="anonymous"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "contain",
              margin: "0 auto",
            }}
          />,
          <div
            key={id}
            className="flex items-center justify-center cursor-pointer gap-[0.5rem]"
          >
            {accessList.includes("edit") && (
              <MdEditSquare
                size={18}
                className="text-primaryColor"
                onClick={() => handleNavigation(id)}
              />
            )}

            {accessList.includes("delete") && (
              <DeleteModal
                open={open}
                setOpen={setOpen}
                handleDeleteTrigger={() => handleDeleteTrigger(id)}
                handleConfirmDelete={handleDelete}
              />
            )}
          </div>,
        ])
      : [];

  return (
    <>
      <PageHeader
        hasAddButton={accessList.includes("add")}
        newButtonText={"Add New Technology"}
        handleNewButton={() => handleNavigation(null)}
        handleReloadButton={handleReload}
        toggleViewType={toggleViewType}
        hasSubText
        subText={"Add Comprehensive Service Information in Each Section"}
      />
      {console.log(success, "success")}
      {accessList.includes("view") && (
        <Table
          headers={tableHeaders}
          data={tableData}
          isSN
          pagination={pagination}
          handlePagination={handlePagination}
        />
      )}
      {/* <Drawer isOpen={isOpen} setIsOpen={setIsOpen} width="w-full lg:w-[50%]">
        <AddUserForm editId={editId} isOpen={isOpen} setIsOpen={setIsOpen} />
      </Drawer> */}
    </>
  );
}
