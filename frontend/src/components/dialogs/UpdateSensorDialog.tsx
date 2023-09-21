import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { DialogContextType, ISensor } from "../tabs/Sensors";
import {
  Button,
  Checkbox,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { apiPath, fetchSensor, putData } from "../../api/api";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import { useValidation } from "../../hooks/useValidation";
import Joi from "joi";

interface IUpdateSensorFormFields {
  id: number;
  location: string;
  model: string;
  indoor: boolean;
  measurements: [];
}

const schema = Joi.object({
  id: Joi.number().required(),
  location: Joi.string().required(),
  model: Joi.string().required(),
  indoor: Joi.bool(),
  measurements: Joi.array().allow(),
});

const UpdateSensorDialog: React.FC = () => {
  const navigate = useNavigate();
  const { promiseInProgress } = usePromiseTracker();

  const { sensorId } = useParams();
  const { open, setOpen, callback } = useOutletContext<DialogContextType>();

  const [sensor, setSensor] = useState<ISensor>();

  const getSensor = () => {
    trackPromise(
      fetchSensor(Number(sensorId)).then((sensors) => setSensor(sensors)),
    );
  };

  React.useEffect(() => {
    getSensor();
  }, []);

  const defaultForm: IUpdateSensorFormFields = {
    id: Number(sensorId),
    location: "",
    model: "",
    indoor: false,
    measurements: [],
  };

  const [form, setForm] = useState<IUpdateSensorFormFields>(defaultForm);

  const { hasError, errorText, handleValidate } =
    useValidation<IUpdateSensorFormFields>(form, schema);

  React.useEffect(() => {
    setForm({
      ...form,
      location: sensor?.location || form.location,
      model: sensor?.model || form.model,
      indoor: sensor?.indoor || form.indoor,
    });
  }, [sensor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setForm({ ...form, [target.name]: target.value });
  };

  const handleToggleIndoor = () => {
    setForm({ ...form, indoor: !form.indoor });
  };

  const handleClickClose = () => {
    setOpen(false);
    setForm(defaultForm);
    navigate("/sensors");
  };

  const handleSubmit = () => {
    const error = handleValidate();

    if (error) {
      return;
    }

    putData(`${apiPath}/Sensor/UpdateSensor`, { ...form }).then(() => {
      callback();
    });

    handleClickClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Update sensor</DialogTitle>
      <DialogContent>
        {promiseInProgress ? (
          <CircularProgress />
        ) : (
          <>
            <Typography>ID</Typography>
            <TextField
              fullWidth
              variant="standard"
              disabled={true}
              id="sensorId"
              name="sensorId"
              label=""
              value={sensorId}
              sx={{ marginBottom: "5px" }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="location"
              name="location"
              label="Location"
              type="text"
              fullWidth
              variant="standard"
              value={form.location}
              onChange={handleChange}
              error={hasError("location")}
              helperText={errorText("location")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="model"
              name="model"
              label="Model"
              type="text"
              fullWidth
              variant="standard"
              value={form.model}
              onChange={handleChange}
              error={hasError("model")}
              helperText={errorText("model")}
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="indoor"
                  name="indoor"
                  checked={form.indoor}
                  value={form.indoor}
                  onChange={handleToggleIndoor}
                />
              }
              label="Indoor"
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClickClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={promiseInProgress}
          onClick={handleSubmit}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateSensorDialog;
