import React, { useState, useEffect } from "react";
import { useUserStore } from "../usersStore";
import Chart from "react-apexcharts";

interface City {
  value: number;
  name: string;
}
const CitiesChart = () => {
  const users = useUserStore((state) => state.users);
  const [options, setOptions] = useState({
    series: [1],
    labels: ["A"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  useEffect(() => {
    var tempCities: City[] = [];
    users.map((user) => {
      const city = tempCities.find((e) => e.name === user.address.city);
      if (city) {
        const result = tempCities.map((e) => {
          if (e.name === city.name) {
            return { name: city.name, value: city.value + 1 };
          } else {
            return e;
          }
        });
        tempCities = result;
      } else {
        tempCities.push({ value: 1, name: user.address.city });
      }
    });
    const tempSeries = tempCities.map((e) => e.value);
    const tempLabels = tempCities.map((e) => e.name);
    setOptions({ ...options, series: tempSeries, labels: tempLabels });
  }, [users]);

  return (
    <div>
      <Chart
        options={options}
        series={options.series}
        type="pie"
        width="100%"
        height="500"
      />
    </div>
  );
};

export default CitiesChart;
