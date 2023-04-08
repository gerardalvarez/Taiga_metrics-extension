import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useState, useEffect } from "react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = (props) => {
  const datachart = {
    labels: [
      "Tasks" +
        "\n" +
        " (" +
        (props.values[0] ? props.values[0].toString().slice(0, 6) : "") +
        ")",
      "Closed Tasks" +
        "\n" +
        " (" +
        (props.values[1] ? props.values[1].toString().slice(0, 6) : "") +
        ")",
      "Commits" +
        "\n" +
        " (" +
        (props.values[2] ? props.values[2].toString().slice(0, 6) : "") +
        ")",
      "Modified lines" +
        "\n" +
        " (" +
        (props.values[3] ? props.values[3].toString().slice(0, 6) : "") +
        ")",
    ],
    datasets: [
      {
        label: props.student + " Metrics",
        data: props.values,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Radar data={datachart} />;
};

export default RadarChart;
