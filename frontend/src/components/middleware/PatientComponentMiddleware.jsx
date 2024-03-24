import React, { useEffect , useState } from "react";
import { Outlet } from "react-router-dom";
import Aside from "../Aside";
import Header from "../Header";

function PatientComponentMiddleware() {
  return (
    <>
        <Aside />
        <Header />

        <div>
            <Outlet />
        </div>
    </>
  )
}

export default PatientComponentMiddleware