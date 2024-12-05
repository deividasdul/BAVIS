import React from "react";
import PageBox from "../components/styles/PageBox";
import { ProtectedRouteAdmin } from "../components/ProtectedRouteAdmin";

const Dashboard = () => {
  return (
    <ProtectedRouteAdmin>
      <PageBox></PageBox>
    </ProtectedRouteAdmin>
  );
};

export default Dashboard;
