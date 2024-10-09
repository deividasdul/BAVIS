import React from "react";

import ProtectedRoute from "../components/ProtectedRoute";
import PageBox from "../components/styles/PageBox";

const Notifications = () => {
  return (
    <ProtectedRoute>
      <PageBox></PageBox>
    </ProtectedRoute>
  );
};

export default Notifications;
