import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { ISensor } from "./tabs/Sensors";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

interface IProps {
  sensor?: ISensor;
}

const SensorGraph: React.FC<IProps> = (props: IProps) => {
  const { sensor } = props;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
  );

  const options = {
    responsive: true,
  };

  const labels = sensor?.measurements.map((x) => x.id);

  const data = {
    labels,
    datasets: [
      {
        data: sensor?.measurements.map((x) => x.temperature),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  console.log(sensor?.indoor);

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Indoor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell key={`${sensor?.id}-id`}>{sensor?.id}</TableCell>
            <TableCell key={`${sensor?.id}-location`}>
              {sensor?.location}
            </TableCell>
            <TableCell key={`${sensor?.id}-model`}>{sensor?.model}</TableCell>
            <TableCell key={`${sensor?.id}-indoor`}>
              {sensor?.indoor.toString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box sx={{ marginTop: "30px" }}>
        <Line options={options} data={data} />
      </Box>
    </>
  );
};

export default SensorGraph;
