import React from "react";
import PageBox from "../components/styles/PageBox";
import ProtectedRoute from "../components/ProtectedRoute";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <PageBox></PageBox>
    </ProtectedRoute>
  );
};

export default Dashboard;
