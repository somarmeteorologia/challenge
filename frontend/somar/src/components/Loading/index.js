import React from "react";
import { ScaleLoader } from "react-spinners";

export default function Loading({ show }) {
  return (
    <>
      <ScaleLoader
        sizeUnit={"150px"}
        size={250}
        color={"orange"}
        loading={show}
        height={150}
        margin={"4px"}
      />
    </>
  );
}
