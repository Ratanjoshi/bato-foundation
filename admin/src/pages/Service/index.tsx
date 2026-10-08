import PageHeader from "@/components/PageHeader";
import {
  useDeleteServiceMutation,
  useListAllServiceQuery,
} from "@/redux/services/service";
import { checkAccess } from "@/utils/accessHelper";
import { useState } from "react";
import { ViewType } from "../Users";
import { MdEditSquare } from "react-icons/md";
import DeleteModal from "@/components/DeleteModal";
import { handleError, handleResponse } from "@/utils/responseHandler";
import Table from "@/components/Table";
import { PaginationType } from "@/types/commonTypes";
import { useNavigate } from "react-router-dom";
import { SERVICE_ADD_ROUTE, SERVICE_LIST_ROUTE } from "@/routes/routeNames";

const tableHeaders = ["Name", "Title", "Description", "Actions"];

export default function Service() {
  const navigate = useNavigate();
  const accessList = checkAccess("Service");
  console.log(accessList);

  //   utils function and states
  const [editId, setEditId] = useState<number | null>(null);

  //   for query
  const [query, setQuery] = useState({ page: 1, limit: 10 });

  //   for delete operation
  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [deleteService] = useDeleteServiceMutation();

  const [viewType, setViewType] = useState<ViewType>("list");
  //   api calls
  const {
    data: allServices,
    isSuccess: success,
    refetch,
  } = useListAllServiceQuery(query);

  // functions
  const handleDeleteTrigger = (id: number) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteService(deleteId).unwrap();
      handleResponse({
        res: response,
        onSuccess: () => {
          // navigate
          navigate(`${SERVICE_LIST_ROUTE}`);
        },
      });
    } catch (error) {
      handleError({ error });
    } finally {
      setOpen(false);
    }
  };

  console.log("asldkjlasdkfjfskfjsdf", allServices?.data?.data);

  //   functions

  const handleNavigation = (id: number | null) => {
    if (id === null) {
      navigate(SERVICE_ADD_ROUTE);
    } else {
      navigate(`${SERVICE_ADD_ROUTE}${id}`);
    }
  };

  const handleReload = () => {
    refetch();
  };

  const toggleViewType = (type: ViewType) => {
    setViewType(type);
  };

  const pagination = {
    page: allServices?.data?.page ?? 1,
    limit: allServices?.data?.limit ?? 10,
    total: allServices?.data?.total ?? 0,
    totalPages: allServices?.data?.totalPages ?? 0,
  };

  const handlePagination = (pagination: PaginationType) => {
    setQuery((prev) => ({
      ...prev,
      ...pagination,
    }));
    refetch();
  };

  const tableData =
    success && allServices?.data?.data
      ? allServices.data?.data.map(({ id, title, name, description, slug }) => [
          name,
          title,
          description,
          <div
            key={id}
            className="flex items-center justify-center cursor-pointer gap-[0.5rem]"
          >
            {accessList.includes("edit") && (
              <MdEditSquare
                size={18}
                className="text-primaryColor"
                onClick={() => handleNavigation(slug)}
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
  console.log(tableData);

  return (
    <>
      <PageHeader
        hasAddButton={accessList.includes("add")}
        newButtonText={"Add New Service"}
        handleNewButton={() => handleNavigation(null)}
        handleReloadButton={handleReload}
        toggleViewType={toggleViewType}
        hasSubText
        subText={"Add Comprehensive Service Information in Each Section"}
      />
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
