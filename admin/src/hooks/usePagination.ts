import { PaginationType } from "@/types/commonTypes";
import { useState } from "react";

export default function usePagination(initialState: {
  page: number;
  limit: number;
}) {
  const [query, setQuery] = useState(initialState);

  const handlePagination = (pagination: PaginationType) => {
    setQuery((prev) => ({
      ...prev,
      ...pagination,
    }));
  };

  return { query, handlePagination };
}
