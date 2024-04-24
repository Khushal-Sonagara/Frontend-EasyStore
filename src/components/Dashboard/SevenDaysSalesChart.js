import React, { useEffect, useState } from 'react';
import {Chart as chartjs,BarElement,CategoryScale,LinearScale,Tooltip,Legend} from 'chart.js'
import { Bar } from 'react-chartjs-2';
chartjs.register(BarElement,CategoryScale,LinearScale,Tooltip,Legend)

function SevenDaysSalesChart() {
  const [data,setData]=useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/seven-days-sales")
        .then((res) => res.json())
        .then((res) => {
          setData(res)
        //   setData([
        //     {
        //         "dayOfWeek": "Mon",
        //         "totalAmount": 3561,
        //         "date": "2024-03-04"
        //     },
        //     {
        //         "dayOfWeek": "Tue",
        //         "totalAmount": 4567,
        //         "date": "2024-03-05"
        //     },
        //     {
        //         "dayOfWeek": "Wed",
        //         "totalAmount": 9871,
        //         "date": "2024-03-06"
        //     },
        //     {
        //         "dayOfWeek": "Thu",
        //         "totalAmount": 5187,
        //         "date": "2024-03-07"
        //     },
        //     {
        //         "dayOfWeek": "Fri",
        //         "totalAmount": 2345,
        //         "date": "2024-03-08"
        //     },
        //     {
        //         "dayOfWeek": "Sat",
        //         "totalAmount": 3456,
        //         "date": "2024-03-09"
        //     },
        //     {
        //         "dayOfWeek": "Sun",
        //         "totalAmount": 5555,
        //         "date": "2024-03-10"
        //     }
        
        // ])
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });;
},[]);


const salesData = {
  labels: data.map((item) => item.dayOfWeek),
  datasets: [
    {
      label: 'Sales',
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75,192,192,0.4)',
      hoverBorderColor: 'rgba(75,192,192,1)',
      data: data.map((item) => item.totalAmount),
    },
  ],
};

const options = {};


  return (
    <div>
      <h2>Seven Days Sales Chart</h2>
      <Bar data={salesData} options={options} />
    </div>
  );
};

export default SevenDaysSalesChart;
