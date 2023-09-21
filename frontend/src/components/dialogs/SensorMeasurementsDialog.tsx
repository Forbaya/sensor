import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { DialogContextType, ISensor } from "../tabs/Sensors";
import { useState } from "react";
import React from "react";
import MeasurementsTable from "../tables/MeasurementsTable";
import SensorGraph from "../SensorGraph";

const SensorMeasurementsDialog: React.FC = () => {
  const navigate = useNavigate();
  const { sensorId } = useParams();
  const { open, setOpen, sensors } = useOutletContext<DialogContextType>();

  const [sensor, setSensor] = useState<ISensor>();

  React.useEffect(() => {
    setSensor(sensors.find((x) => x.id == Number(sensorId)));
  }, []);

  // Hack. Sorting the measurements by id. Need to look into why Entity Framework doesn't have them sorted already (or why sorting manually didn't work).
  React.useEffect(() => {
    if (!!sensor)
      sensor.measurements =
        sensor.measurements.slice().sort((a, b) => a.id - b.id) || [];
  }, [sensor]);

  const handleClickClose = () => {
    setOpen(false);
    navigate("/sensors");
  };

  return (
    <Dialog open={open} fullWidth PaperProps={{ sx: { height: 1000 } }}>
      <DialogTitle>Sensor</DialogTitle>
      <DialogContent>
        <SensorGraph sensor={sensor} />
        <MeasurementsTable measurements={sensor?.measurements} />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClickClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SensorMeasurementsDialog;
