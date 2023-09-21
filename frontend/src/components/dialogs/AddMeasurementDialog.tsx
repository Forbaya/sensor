import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { DialogContextType, ISensor } from "../tabs/Sensors";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { apiPath, fetchSensor, postData } from "../../api/api";
import dayjs from "dayjs";

interface IAddMeasurementFormFields {
  sensorId: number | undefined;
  timestamp: string;
  temperature: number;
}

const AddMeasurementDialog: React.FC = () => {
  const navigate = useNavigate();
  const { sensorId } = useParams();
  const { open, setOpen, callback, navigatePath } =
    useOutletContext<DialogContextType>();

  const defaultForm: IAddMeasurementFormFields = {
    sensorId: !!sensorId ? Number(sensorId) : undefined,
    timestamp: dayjs().format("YYYY-MM-DDTHH:mm"),
    temperature: 0,
  };

  const [form, setForm] = useState<IAddMeasurementFormFields>(defaultForm);
  const [sensor, setSensor] = useState<ISensor>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setForm({ ...form, [target.name]: target.value });
  };

  const handleClickClose = () => {
    setOpen(false);
    setForm(defaultForm);
    navigate(navigatePath);
  };

  const getSensor = () => {
    fetchSensor(Number(sensorId)).then((sensors) => setSensor(sensors));
  };

  React.useEffect(() => {
    getSensor();
  }, []);

  const handleSubmit = () => {
    postData(`${apiPath}/Measurement/AddMeasurement`, { ...form, sensor }).then(
      () => {
        callback();
      },
    );

    handleClickClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add new measurement</DialogTitle>
      <DialogContent>
        {!!sensorId ? (
          <></>
        ) : (
          <TextField
            autoFocus
            margin="dense"
            id="sensorId"
            name="sensorId"
            label="Sensor ID"
            type="text"
            fullWidth
            variant="standard"
            value={form.sensorId}
            onChange={handleChange}
          />
        )}
        <TextField
          autoFocus
          contentEditable={false}
          margin="dense"
          id="timestamp"
          name="timestamp"
          label="Timestamp"
          type="datetime-local"
          fullWidth
          variant="standard"
          value={form.timestamp}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="temperature"
          name="temperature"
          label="Temperature"
          type="number"
          fullWidth
          variant="standard"
          value={form.temperature}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClickClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMeasurementDialog;
