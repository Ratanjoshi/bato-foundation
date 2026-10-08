import DeleteModal from "@/components/DeleteModal";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Table from "@/components/Table";
import { CAREER_URL } from "@/constants/apiUrlConstants";
import usePagination from "@/hooks/usePagination";
import { useDeleteApiMutation, useGetApiQuery } from "@/redux/services/crudApi";
import { CAREER_ADD_ROUTE } from "@/routes/routeNames";
import { checkAccess } from "@/utils/accessHelper";
import { handleError, handleResponse } from "@/utils/responseHandler";
import moment from "moment";
import { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Career() {
  const navigate = useNavigate();
  const accessList = checkAccess("Career");

  const { query, handlePagination } = usePagination({ page: 1, limit: 10 });

  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeletedId] = useState<number | null>(null);

  const {
    data: allCareers,
    isSuccess: success,
    refetch,
  } = useGetApiQuery(`${CAREER_URL}/admin-list`);
  const [deleteBanner] = useDeleteApiMutation();

  const handleNewUser = (id: number | null) => {
    id === null
      ? navigate(CAREER_ADD_ROUTE)
      : navigate(`${CAREER_ADD_ROUTE}${id}`);
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
      const response = await deleteBanner(`${CAREER_URL}${deleteId}`).unwrap();
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
    page: allCareers?.data?.page,
    limit: allCareers?.data?.limit,
    total: allCareers?.data?.total,
    totalPages: allCareers?.data?.totalPages,
  };

  const tableHeaders = [
    "Career Title",
    "No.of Openings",
    "Date Modified",
    (accessList.includes("edit") || accessList.includes("delete")) && "Actions",
  ];

  const tableData =
    success && allCareers?.data?.data
      ? allCareers?.data?.data.map(
          ({ id, title, no_of_opening, updatedAt }) => [
            title,
            no_of_opening,
            moment(updatedAt).format("MMM DD, YYYY"),
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
      <PageTitle title="Career" />
      <PageHeader
        hasAddButton={accessList.includes("add")}
        newButtonText="Add New Career"
        handleNewButton={() => handleNewUser(null)}
        handleReloadButton={handleReload}
        hasSubText
        subText="Add Comprehensive Career in Each Section"
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
