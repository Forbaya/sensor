import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchSensors } from "../../api/api";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { ISensor } from "./Sensors";
import SensorGraph from "../SensorGraph";

export interface IMeasurement {
  id: number;
  sensorId: number;
  timestamp: string;
  temperature: number;
}

const Measurements: React.FC = () => {
  const navigate = useNavigate();

  const { promiseInProgress } = usePromiseTracker();

  const [open, setOpen] = useState(false);
  const [sensors, setSensors] = useState<ISensor[]>([]);

  const handleClickAddMeasurement = () => {
    navigate("add-measurement");
    setOpen(true);
  };

  const getSensors = () => {
    trackPromise(fetchSensors().then((sensors) => setSensors(sensors)));
  };

  React.useEffect(() => {
    getSensors();
  }, []);

  return (
    <Paper elevation={3} sx={{ minWidth: "90vw", padding: 3 }}>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            Measurements
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            disabled={!sensors || sensors.length < 1}
            onClick={handleClickAddMeasurement}
          >
            Add measurement
          </Button>
        </Grid>
      </Grid>
      <Grid
        sx={{
          justifyContent: "center",
          display: "flex",
          flexWrap: "wrap",
          marginTop: "10px",
        }}
      >
        {promiseInProgress ? (
          <CircularProgress />
        ) : (
          sensors.map((sensor) => (
            <Grid key={`${sensor.id}-grid`} sx={{ margin: "15px 30px" }}>
              <Card elevation={3} sx={{ padding: "10px", width: "500px" }}>
                <SensorGraph sensor={sensor} />
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <Outlet
        context={{
          open,
          setOpen,
          callback: getSensors,
          sensors,
          navigatePath: "/measurements",
        }}
      />
    </Paper>
  );
};

export default Measurements;
