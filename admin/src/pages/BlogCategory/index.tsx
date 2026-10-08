import DeleteModal from "@/components/DeleteModal";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Table from "@/components/Table";
import { BLOG_CATEGORY_URL } from "@/constants/apiUrlConstants";
import usePagination from "@/hooks/usePagination";
import { useDeleteApiMutation, useGetApiQuery } from "@/redux/services/crudApi";
import { BLOG_CATEGORY_ADD_ROUTE } from "@/routes/routeNames";
import { checkAccess } from "@/utils/accessHelper";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function BlogCategory() {
  const navigate = useNavigate();
  const accessList = checkAccess("Blog Category");

  const { query, handlePagination } = usePagination({ page: 1, limit: 10 });

  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeletedId] = useState<number | null>(null);

  const {
    data: allBlogs,
    isSuccess: success,
    refetch,
  } = useGetApiQuery(`${BLOG_CATEGORY_URL}list`);
  const [deleteBanner] = useDeleteApiMutation();

  const handleNewUser = (id: number | null) => {
    id === null
      ? navigate(BLOG_CATEGORY_ADD_ROUTE)
      : navigate(`${BLOG_CATEGORY_ADD_ROUTE}${id}`);
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
        `${BLOG_CATEGORY_URL}${deleteId}`,
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
    page: allBlogs?.data?.page,
    limit: allBlogs?.data?.limit,
    total: allBlogs?.data?.total,
    totalPages: allBlogs?.data?.totalPages,
  };

  const tableHeaders = [
    "Name",
    (accessList.includes("edit") || accessList.includes("delete")) && "Actions",
  ];

  const tableData =
    success && allBlogs?.data?.data
      ? allBlogs?.data?.data.map(({ id, name }) => [
          name,
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
        ])
      : [];

  return (
    <>
      <PageTitle title="Blog Category" />
      <PageHeader
        hasAddButton={accessList.includes("add")}
        newButtonText="Add New Blog Category"
        handleNewButton={() => handleNewUser(null)}
        handleReloadButton={handleReload}
        hasSubText
        subText="Add Comprehensive Blog Category in Each Section"
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
