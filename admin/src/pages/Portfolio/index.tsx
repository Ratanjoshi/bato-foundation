import {
  useDeletePortfolioMutation,
  useListAllPortfolioQuery,
} from "@/redux/services/portfolio";
import { PORTFOLIO_ADD_ROUTE, PORTFOLIO_LIST_ROUTE } from "@/routes/routeNames";
import { checkAccess } from "@/utils/accessHelper";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewType } from "../Users";
import { PaginationType } from "@/types/commonTypes";
import { MdEditSquare } from "react-icons/md";
import DeleteModal from "@/components/DeleteModal";
import PageHeader from "@/components/PageHeader";
import Table from "@/components/Table";

const tableHeaders = ["Name", "Description", "Actions"];

export default function Portfolio() {
  const navigate = useNavigate();
  const accessList = checkAccess("Service");

  //   utils function and states
  const [editId, setEditId] = useState<number | null>(null);

  //   for query
  const [query, setQuery] = useState({ page: 1, limit: 10 });

  //   for delete operation
  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deletePortfolio] = useDeletePortfolioMutation();

  const [viewType, setViewType] = useState<ViewType>("list");
  //   api calls
  const {
    data: allPortfolio,
    isSuccess: success,
    refetch,
  } = useListAllPortfolioQuery(query);

  // functions
  const handleDeleteTrigger = (id: number) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deletePortfolio(deleteId).unwrap();
      handleResponse({
        res: response,
        onSuccess: () => {
          // navigate
          navigate(`${PORTFOLIO_LIST_ROUTE}`);
        },
      });
    } catch (error) {
      handleError({ error });
    } finally {
      setOpen(false);
    }
  };

  console.log("asldkjlasdkfjfskfjsdf", allPortfolio?.data?.data);

  //   functions

  const handleNavigation = (id: number | null | string) => {
    if (id === null) {
      navigate(PORTFOLIO_ADD_ROUTE);
    } else {
      navigate(`${PORTFOLIO_ADD_ROUTE}${id}`);
    }
  };

  const handleReload = () => {
    refetch();
  };

  const toggleViewType = (type: ViewType) => {
    setViewType(type);
  };

  const pagination = {
    page: allPortfolio?.data?.page ?? 1,
    limit: allPortfolio?.data?.limit ?? 10,
    total: allPortfolio?.data?.total ?? 0,
    totalPages: allPortfolio?.data?.totalPages ?? 0,
  };

  const handlePagination = (pagination: PaginationType) => {
    setQuery((prev) => ({
      ...prev,
      ...pagination,
    }));
    refetch();
  };

  console.log(allPortfolio?.data?.data);

  const tableData =
    success && allPortfolio?.data?.data
      ? allPortfolio.data?.data.map(
          ({ id, title, name, product_description, slug }) => [
            title,
            product_description,
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
          ],
        )
      : [];
  console.log(tableData);

  return (
    <>
      <PageHeader
        hasAddButton={accessList.includes("add")}
        newButtonText={"Add New Portfolio"}
        handleNewButton={() => handleNavigation(null)}
        handleReloadButton={handleReload}
        toggleViewType={toggleViewType}
        hasSubText
        subText={"Add Comprehensive Portfolio Information in Each Section"}
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
