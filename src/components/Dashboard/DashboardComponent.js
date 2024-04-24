import React from 'react';
import { WeeklySales, MonthlySales, YearlySales } from './TotalSalesReport';
import SevenDaysSalesChart from './SevenDaysSalesChart';

function DashboardComponent () {
  return (
    <>
      <div style={{position:'relative'}}>
      <>
      <h1 style={{ "textAlign": "center", "margin": "5vh", "color": "#ea9600" }}>Report Analysis</h1>
      <div className='Row d-flex'>
        <WeeklySales />
        <MonthlySales />
        <YearlySales />
      </div>
      <div>
        <SevenDaysSalesChart />
      </div>

    </>
    </div>
    </>
  );
};

export default DashboardComponent;