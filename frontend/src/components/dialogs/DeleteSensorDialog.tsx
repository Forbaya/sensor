import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DialogContextType, ISensor } from "../tabs/Sensors";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { apiPath, deleteData, fetchSensor } from "../../api/api";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";

const DeleteSensorDialog: React.FC = () => {
  const navigate = useNavigate();
  const { promiseInProgress } = usePromiseTracker();

  const { sensorId } = useParams();
  const { open, setOpen, callback } = useOutletContext<DialogContextType>();

  const [sensor, setSensor] = useState<ISensor>();

  const handleClickClose = () => {
    setOpen(false);
    navigate("/sensors");
  };

  const getSensor = () => {
    trackPromise(
      fetchSensor(Number(sensorId)).then((sensors) => setSensor(sensors)),
    );
  };

  React.useEffect(() => {
    getSensor();
  }, []);

  const handleSubmit = () => {
    deleteData(`${apiPath}/Sensor/DeleteSensor?sensorId=${sensorId}`).then(
      () => {
        callback();
      },
    );

    handleClickClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Delete Sensor</DialogTitle>
      <DialogContent>
        {promiseInProgress ? (
          <CircularProgress />
        ) : (
          <>
            <Typography paragraph>
              Are you sure you want to delete the following sensor?
            </Typography>
            <Table sx={{ marginTop: "5px" }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Model</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell>{sensor?.id}</TableCell>
                <TableCell>{sensor?.location}</TableCell>
                <TableCell>{sensor?.model}</TableCell>
              </TableBody>
            </Table>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickClose}>Cancel</Button>
        <Button
          color="error"
          variant="contained"
          disabled={promiseInProgress}
          onClick={handleSubmit}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteSensorDialog;
