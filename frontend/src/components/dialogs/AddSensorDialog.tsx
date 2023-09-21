import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { useNavigate, useOutletContext } from "react-router-dom";
import { DialogContextType } from "../tabs/Sensors";
import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { apiPath, postData } from "../../api/api";
import Joi from "joi";
import { useValidation } from "../../hooks/useValidation";

const schema = Joi.object({
  location: Joi.string().required(),
  model: Joi.string().required(),
  indoor: Joi.bool(),
});

interface IAddSensorFormFields {
  location: string;
  model: string;
  indoor: boolean;
}

const AddSensorDialog: React.FC = () => {
  const navigate = useNavigate();

  const { open, setOpen, callback } = useOutletContext<DialogContextType>();

  const defaultForm: IAddSensorFormFields = {
    location: "",
    model: "",
    indoor: false,
  };

  const [form, setForm] = useState<IAddSensorFormFields>(defaultForm);

  const { hasError, errorText, handleValidate } =
    useValidation<IAddSensorFormFields>(form, schema);

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

    postData(`${apiPath}/Sensor/AddSensor`, { ...form }).then(() => {
      callback();
    });

    handleClickClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add new sensor</DialogTitle>
      <DialogContent>
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
              name="indoor"
              value={form.indoor}
              onChange={handleToggleIndoor}
            />
          }
          label="Indoor"
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

export default AddSensorDialog;
