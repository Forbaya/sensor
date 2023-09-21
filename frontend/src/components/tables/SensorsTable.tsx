import { Box, Button, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import React from "react";
import { ISensor } from "../tabs/Sensors";
import { useNavigate } from "react-router-dom";
import { usePromiseTracker } from "react-promise-tracker";

interface IProps {
  sensors: ISensor[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SensorsTable: React.FC<IProps> = (props: IProps) => {
  const { sensors, setOpen } = props;

  const navigate = useNavigate();
  const { promiseInProgress } = usePromiseTracker();

  const handleClickAddMeasurement = (sensorId: GridRowId) => {
    navigate(`${sensorId}/add-measurement`);
    setOpen(true);
  };

  const handleClickMeasurements = (sensorId: GridRowId) => {
    navigate(`${sensorId}/measurements`);
    setOpen(true);
  };

  const handleClickUpdate = (sensorId: GridRowId) => {
    navigate(`${sensorId}/update`);
    setOpen(true);
  };

  const handleClickDelete = (sensorId: GridRowId) => {
    navigate(`${sensorId}/delete`);
    setOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "location",
      headerName: "Location",
      width: 450,
    },
    {
      field: "model",
      headerName: "Model",
      width: 250,
    },
    {
      field: "indoor",
      headerName: "Indoor",
      width: 65,
    },
    {
      field: "sensorMeasurements",
      headerName: "",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          handleClickMeasurements(params.id);
        };

        return (
          <Button variant="outlined" onClick={onClick}>
            Measurements
          </Button>
        );
      },
    },
    {
      field: "addMeasurement",
      headerName: "",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          handleClickAddMeasurement(params.id);
        };

        return (
          <Button variant="contained" onClick={onClick}>
            Add measurement
          </Button>
        );
      },
    },
    {
      field: "update",
      headerName: "",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          handleClickUpdate(params.id);
        };

        return (
          <Button variant="contained" onClick={onClick}>
            Update
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          handleClickDelete(params.id);
        };

        return (
          <Button color="error" variant="contained" onClick={onClick}>
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Box sx={{ marginTop: 5, height: 700 }}>
      {promiseInProgress ? (
        <CircularProgress />
      ) : (
        <DataGrid
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
          rows={sensors}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 100]}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default SensorsTable;
