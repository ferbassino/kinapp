import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  // fill: true,
  responsive: true,
  // scales: {
  //   y: {
  //     min: 0,
  //   },
  // },
  plugins: {
    legend: {
      display: true,
    },
  },
};

const Chart = (props) => {
  const data = useMemo(function () {
    let labels = props.time;

    return {
      datasets: [
        {
          label: "Datos en x",
          tension: 0.3,
          data: props.xData,
          borderColor: "blue",
          backgroundColor: "rgba(3, 11, 252, 0.3)",
          pointRadius: 1,
        },
        {
          label: "Datos en y",
          tension: 0.3,
          data: props.yData,
          borderColor: "red",
          backgroundColor: "rgba(247, 2, 2, 0.3)",
          pointRadius: 1,
        },
        {
          label: "Datos en z",
          tension: 0.3,
          data: props.zData,
          borderColor: "green",
          backgroundColor: "rgba(43, 247, 2, 0.3)",
          pointRadius: 1,
        },
        // {
        //   label: "Datos absolutos",
        //   tension: 0.3,
        //   data: props.absData,
        //   borderColor: "rgba(3, 252, 248 )",
        //   backgroundColor: "rgba(3, 252, 248 0.3)",
        //   pointRadius: 1,
        // },
      ],
      labels,
    };
  }, []);

  return <Line data={data} options={options} />;
};
export default Chart;
