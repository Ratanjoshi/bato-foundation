import DeleteModal from "@/components/DeleteModal";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Table from "@/components/Table";
import { SUBSCRIBERS_URL } from "@/constants/apiUrlConstants";
import usePagination from "@/hooks/usePagination";
import { useDeleteApiMutation, useGetApiQuery } from "@/redux/services/crudApi";
import { SUBSCRIBERS_LIST_ROUTE } from "@/routes/routeNames";
import { checkAccess } from "@/utils/accessHelper";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Subscribers() {
  const navigate = useNavigate();
  const accessList = checkAccess("Subscriber");

  const { query, handlePagination } = usePagination({ page: 1, limit: 10 });

  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeletedId] = useState<number | null>(null);

  const {
    data: allNewsletter,
    isSuccess: success,
    refetch,
  } = useGetApiQuery(`${SUBSCRIBERS_URL}list`);
  const [deleteBanner] = useDeleteApiMutation();

  const handleNewUser = (id: number | null) => {
    id === null
      ? navigate(SUBSCRIBERS_LIST_ROUTE)
      : navigate(`${SUBSCRIBERS_LIST_ROUTE}${id}`);
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
      const response = await deleteBanner(
        `${SUBSCRIBERS_URL}${deleteId}`,
      ).unwrap();
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
    page: allNewsletter?.data?.page,
    limit: allNewsletter?.data?.limit,
    total: allNewsletter?.data?.total,
    totalPages: allNewsletter?.data?.totalPages,
  };

  const tableHeaders = ["Email", accessList.includes("delete") && "Actions"];

  const tableData =
    success && allNewsletter?.data?.data
      ? allNewsletter?.data?.data.map(({ id, email }) => [
          email,
          <div
            key={id}
            className="flex items-center justify-center cursor-pointer gap-[0.5rem]"
          >
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
      <PageTitle title="News Letter" />
      <PageHeader
        hasAddButton={false}
        newButtonText="Add New Banner"
        handleNewButton={() => handleNewUser(null)}
        handleReloadButton={handleReload}
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
