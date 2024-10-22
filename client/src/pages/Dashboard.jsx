import React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppProvider } from "@toolpad/core";

import PageBox from "../components/styles/PageBox";
import ProtectedRoute from "../components/ProtectedRoute";

const NAVIGATION = [
  {
    segment: "dorms",
    title: "Bendrabučiai",
  },
  {
    segment: "users",
    title: "Vartotojai",
  },
  {
    segment: "notifications",
    title: "Pranešimai",
  },
  {
    segment: "logout",
    title: "Atsijungti",
  },
];
const BRANDING = {
  title: "BAVIS",
  logo: "",
};

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <AppProvider navigation={NAVIGATION} branding={BRANDING}>
        <PageBox>
          <DashboardLayout></DashboardLayout>
        </PageBox>
      </AppProvider>
    </ProtectedRoute>
  );
};

export default Dashboard;