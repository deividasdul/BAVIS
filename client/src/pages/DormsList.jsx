import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardHeader,
  Button,
  Box,
  CardActions,
  CardContent,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import PlaceIcon from "@mui/icons-material/Place";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { styled } from "@mui/system";

import ProtectedRoute from "../components/ProtectedRoute";
import { DormsContext } from "../context/DormsContext";
import Map from "../components/Map";

const DormsList = () => {
  const { dorms } = useContext(DormsContext);

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      const existingScript = document.getElementById("google-maps-script");

      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "google-maps-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          setScriptLoaded(true);
        };

        document.body.appendChild(script);
      } else {
        setScriptLoaded(true);
      }
    };

    loadGoogleMapsAPI();
  }, []);

  return (
    <ProtectedRoute>
      <DormsBox>
        <Grid container spacing={2}>
          {dorms.map((dorm) => {
            return (
              <Grid key={dorm.id} size={{ lg: 4, md: 6, sm: 12, xs: 12 }}>
                <Card key={dorm.id} sx={{ m: 2 }} raised={true}>
                  <CardActionArea>
                    <CardHeader
                      avatar={<PlaceIcon fontSize="large" />}
                      title={dorm.address}
                      sx={{
                        "& .MuiCardHeader-avatar": {
                          color: "red",
                        },
                        "& .MuiCardHeader-title": {
                          fontSize: 20,
                        },
                      }}
                    />
                    {scriptLoaded ? (
                      <Map address={dorm.address} />
                    ) : (
                      <p>Kraunama...</p>
                    )}
                  </CardActionArea>
                  <Divider />
                  <CardContent>
                    Kambarių skaičius: {dorm.room_count}
                  </CardContent>
                  <CardActions>
                    <Button
                      href={"/rooms-list/" + dorm.id}
                      size="large"
                      sx={{ p: 1, m: 2 }}
                      variant="contained"
                      startIcon={<RemoveRedEyeIcon />}
                    >
                      peržiūrėti kambarius
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            size={3}
          ></Grid>
        </Grid>
      </DormsBox>
    </ProtectedRoute>
  );
};

const DormsBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default DormsList;
