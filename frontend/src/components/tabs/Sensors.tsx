import { Button, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { fetchSensors } from "../../api/api";
import SensorsTable from "../tables/SensorsTable";
import { trackPromise } from "react-promise-tracker";
import { IMeasurement } from "./Measurements";

export type DialogContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  callback: () => void;
  sensors: ISensor[];
  navigatePath: string;
};

export interface ISensor {
  id: number;
  location: string;
  model: string;
  indoor: boolean;
  measurements: IMeasurement[];
}

const Sensors: React.FC = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [sensors, setSensors] = useState<ISensor[]>([]);

  const handleClickAddSensor = () => {
    navigate("add-sensor");
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
            Sensors
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={handleClickAddSensor}>
            Add sensor
          </Button>
        </Grid>
      </Grid>
      <SensorsTable sensors={sensors} setOpen={setOpen} />
      <Outlet
        context={{
          open,
          setOpen,
          callback: getSensors,
          sensors,
          navigatePath: "/sensors",
        }}
      />
    </Paper>
  );
};

export default Sensors;
