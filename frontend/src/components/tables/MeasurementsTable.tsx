import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { IMeasurement } from "../tabs/Measurements";

interface IProps {
  measurements: IMeasurement[] | undefined;
}

const MeasurementsTable: React.FC<IProps> = (props: IProps) => {
  const { measurements } = props;

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "temperature",
      headerName: "Temperature",
      width: 150,
    },
    {
      field: "timestamp",
      headerName: "Timestamp",
      width: 250,
    },
  ];

  return (
    <Box sx={{ marginBottom: "5px", height: 400, maxWidth: "100%" }}>
      <Typography
        variant="h6"
        sx={{ paddingTop: "16px", paddingBottom: "16px" }}
      >
        Measurements
      </Typography>
      <DataGrid
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
        rows={measurements || []}
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
    </Box>
  );
};

export default MeasurementsTable;
