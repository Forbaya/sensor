import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Navigate, Route, Routes } from "react-router-dom";
import Sensors from "./components/tabs/Sensors";
import Measurements from "./components/tabs/Measurements";
import Layout from "./components/Layout";
import AddSensorDialog from "./components/dialogs/AddSensorDialog";
import AddMeasurementDialog from "./components/dialogs/AddMeasurementDialog";
import SensorMeasurementsDialog from "./components/dialogs/SensorMeasurementsDialog";
import UpdateSensorDialog from "./components/dialogs/UpdateSensorDialog";
import DeleteSensorDialog from "./components/dialogs/DeleteSensorDialog";

const App: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Layout />
      <Box margin={5} sx={{ marginTop: 10 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/sensors" replace />} />
          <Route path="/sensors" element={<Sensors />}>
            <Route path="add-sensor" element={<AddSensorDialog />} />
            <Route
              path=":sensorId/add-measurement"
              element={<AddMeasurementDialog />}
            />
            <Route
              path=":sensorId/measurements"
              element={<SensorMeasurementsDialog />}
            />
            <Route path=":sensorId/update" element={<UpdateSensorDialog />} />
            <Route path=":sensorId/delete" element={<DeleteSensorDialog />} />
          </Route>
          <Route path="/measurements" element={<Measurements />}>
            <Route path="add-measurement" element={<AddMeasurementDialog />} />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
