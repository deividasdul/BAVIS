import React, { useState, useEffect } from "react";
import { ProtectedRouteAdmin } from "../components/ProtectedRouteAdmin";
import { styled } from "@mui/system";
import {
  Box,
  Typography,
  Stack,
  useTheme,
  Divider,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Grid2";

import { PieChart } from "@mui/x-charts/PieChart";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { BarChart } from "@mui/x-charts/BarChart";

// Aa1234567890!

const Dashboard = () => {
  const [topInterests, setTopInterests] = useState([]);
  const [topInterestsData, setTopInterestsData] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [groupGenders, setGroupGenders] = useState([]);

  const fetchActiveUsers = async () => {
    const result = await axios.get("http://localhost:3000/userData");

    setActiveUsers(result.data[0]);
  };

  const fetchTopInterests = async () => {
    const result = await axios.get(
      "http://localhost:3000/api/v1/interests/top"
    );

    const data = result.data.map((interest, index) => ({
      id: index,
      value: interest.count,
      label: interest.interest + " " + interest.count,
    }));

    setTopInterestsData(data);
    setTopInterests(result.data);
  };

  const fetchGroupGenders = async () => {
    const result = await axios.get("http://localhost:3000/userData/genders");
    setGroupGenders(result.data[0]);
  };

  useEffect(() => {
    fetchTopInterests();
    fetchActiveUsers();
    fetchGroupGenders();
  }, []);

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Change 'sm' to suit your needs

  const chartWidth = isSmallScreen ? 400 : 800; // Adjust width based on screen size

  return (
    <ProtectedRouteAdmin>
      <DashboardBox>
        <Typography gutterBottom align="center" sx={{ mt: 2 }} variant="h2">
          INFORMACINIS SKYDELIS
        </Typography>
        <Divider />
        <Grid spacing={10} container={true}>
          {/* Interesai */}
          <Grid direction={"column"} container spacing={3}>
            <Typography sx={{ ml: 5 }} gutterBottom variant="h4">
              Labiausiai išsirinkti interesai:
            </Typography>
            <PieChart
              series={[{ data: topInterestsData }]}
              width={chartWidth}
              height={400} // You can also make this responsive if needed
            />
          </Grid>

          {/* Naudotojai */}
          <Grid direction={"column"} container spacing={3}>
            <Typography sx={{ ml: 5 }} gutterBottom variant="h4">
              Aktyvūs naudotojai / visi naudotojai:
            </Typography>
            <Gauge
              value={parseInt(activeUsers.activecount)}
              startAngle={-110}
              endAngle={110}
              height={400}
              width={chartWidth}
              valueMax={parseInt(activeUsers.usercount)}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 40,
                  transform: "translate(0px, 0px)",
                },
              }}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          </Grid>

          {/* Lytis */}
          <Grid direction={"column"} container spacing={3}>
            <Typography sx={{ ml: 5 }} gutterBottom variant="h4">
              Lytis pagal grupę:
            </Typography>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["Studentai", "Dėstytojai", "Svečiai"],
                },
              ]}
              series={[
                {
                  data: [
                    groupGenders.malestudents,
                    groupGenders.maleteachers,
                    groupGenders.maleguests,
                  ],
                },
                {
                  data: [
                    groupGenders.femalestudents,
                    groupGenders.femaleteachers,
                    groupGenders.femaleguests,
                  ],
                },
              ]}
              width={chartWidth}
              height={400}
            />
            <Stack
              sx={{ ml: 2 }}
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: "rgb(2, 178, 175)",
                }}
              />
              <Typography>Vyrai</Typography>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: "rgb(46, 150, 255)",
                }}
              />
              <Typography>Moterys</Typography>
            </Stack>
          </Grid>
        </Grid>
      </DashboardBox>
    </ProtectedRouteAdmin>
  );
};

const DashboardBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default Dashboard;
