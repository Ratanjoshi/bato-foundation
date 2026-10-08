import DeleteModal from "@/components/DeleteModal";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Table from "@/components/Table";
import { PAGES_URL } from "@/constants/apiUrlConstants";
import usePagination from "@/hooks/usePagination";
import { useDeleteApiMutation, useGetApiQuery } from "@/redux/services/crudApi";
import { PAGES_ADD_ROUTE } from "@/routes/routeNames";
import { checkAccess } from "@/utils/accessHelper";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Pages() {
  const navigate = useNavigate();
  const accessList = checkAccess("Pages");

  const { query, handlePagination } = usePagination({ page: 1, limit: 10 });

  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeletedId] = useState<number | null>(null);

  const {
    data: allPages,
    isSuccess: success,
    refetch,
  } = useGetApiQuery(`${PAGES_URL}list`);
  const [deletePages] = useDeleteApiMutation();

  const handleNewUser = (id: number | null) => {
    id === null
      ? navigate(PAGES_ADD_ROUTE)
      : navigate(`${PAGES_ADD_ROUTE}${id}`);
  };

  const handleReload = () => {
    refetch();
  };

  const handleDeleteTrigger = (id: number) => {
    setDeletedId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deletePages(`${PAGES_URL}${deleteId}`).unwrap();
      handleResponse({
        res: response,
        onSuccess: () => {},
      });
    } catch (error) {
      handleError({ error });
    } finally {
      setOpen(false);
    }
  };

  const pagination = {
    page: allPages?.data?.page,
    limit: allPages?.data?.limit,
    total: allPages?.data?.total,
    totalPages: allPages?.data?.totalPages,
  };

  const tableHeaders = [
    "Title",
    "Page Title",
    "OG Title",
    "Meta Title",
    (accessList.includes("edit") || accessList.includes("delete")) && "Actions",
  ];

  const tableData =
    success && allPages?.data?.data
      ? allPages?.data?.data.map(
          ({ id, title, pageTitle, og_title, meta_title }) => [
            title,
            pageTitle,
            og_title,
            meta_title,
            <div
              key={id}
              className="flex items-center justify-center cursor-pointer gap-[0.5rem]"
            >
              {accessList.includes("edit") && (
                <MdEditSquare
                  size={18}
                  className="text-primaryColor"
                  onClick={() => handleNewUser(id)}
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
          ],
        )
      : [];

  return (
    <>
      <PageTitle title="Pages" />
      <PageHeader
        hasAddButton={accessList.includes("add")}
        newButtonText="Add New Pages"
        handleNewButton={() => handleNewUser(null)}
        handleReloadButton={handleReload}
        hasSubText
        subText="Add Comprehensive Page Information in Each Section"
      />
      {accessList.includes("view") ? (
        <Table
          isSN
          headers={tableHeaders}
          data={tableData}
          pagination={pagination}
          handlePagination={handlePagination}
        />
      ) : (
        <p>You don't have Permission to view this table</p>
      )}
    </>
  );
}
