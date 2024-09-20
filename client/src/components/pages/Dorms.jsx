import React, { useEffect, useState } from "react";
import {
  Card,
  CssBaseline,
  CardContent,
  Typography,
  CardActionArea,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";

const Dorms = () => {
  const [dorms, setDorms] = useState([]);

  useEffect(() => {
    fetchDorms();
  }, []);

  const fetchDorms = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/v1/dorms");
      setDorms(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          flexWrap: "wrap",
        }}
      >
        {dorms.map((dorm) => {
          return (
            <Card key={dorm.id} sx={{ width: "35%", m: 2 }} raised={true}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6">{dorm.address}</Typography>
                </CardContent>
              </CardActionArea>
              <Button
                href={"/rooms/" + dorm.id}
                size="large"
                sx={{ p: 1, m: 2 }}
                variant="contained"
              >
                View rooms
              </Button>
            </Card>
          );
        })}
      </Box>
    </>
  );
};

export default Dorms;
