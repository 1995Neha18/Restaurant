import React from "react";
import { getAllPrducts } from "../api";
import { useQuery } from "react-query";

const UpdatedComponent = (OriginalComponent) => {
  function NewComponent() {
    const { isLoading, data, isError, error } = useQuery(
      "categories",
      getAllPrducts
    );

    return (
      <OriginalComponent
        isLoading={isLoading}
        data={data}
        isError={isError}
        error={error}
      />
    );
  }
  return NewComponent;
};

export default UpdatedComponent;
