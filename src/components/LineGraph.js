import React from 'react';
import { useEffect,useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  export const options = {
    maintainAspectRatio : false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales',
        font: {
            size: 20, 
          },
      },
    },
    scales: {
        x: {
          ticks: {
            font: {
              size: 10,
            },
          },
        },
        y: {
          ticks: {
            font: {
              size: 12, 
            },
          },
        },
      },
  };
  


export default function LineGraph({sales,fromDate,toDate}){

    let month1 = parseInt(fromDate.split("-")[1]);
    let year1 = parseInt(fromDate.split("-")[0]);

    const months = Math.floor((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24 * 30.44));

    const [labels, setLabels] = useState([]);

    // create dynamic graph labels based on user input
  useEffect(() => {
    let newLabels = [];
    for (let i = 1; i <= months; i++) {
      if (month1 % 12 === 0) {
        year1++;
      }
      if (month1 % 12 < 10) {
        newLabels.push(`0${month1 % 12  + 1 }/${year1}`);
      } else {
        newLabels.push(`${month1 % 12 === 0 ? 1 : month1 % 12 + 1 }/${year1}`);
      }
      month1++;
    }
    setLabels(newLabels);
  }, [fromDate,toDate]);
    
    

    const data = {
      labels,
      datasets: [
        {
          label: 'Paper Cup',
          // connecting label date with values for particular item, so they appear at propert spot/date in graph
          /* in condition inside, I check if value for label date exist in my data source and subsequently, if it  
             has particular item for the date
          */
          data: labels.map((label) => { 
            if(sales.hasOwnProperty(label) && sales[label].hasOwnProperty("Paper Cup")){
                return sales[label]["Paper Cup"]["count"]
            }
          }),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Carton Box',
          data: labels.map((label) => {
            if(sales.hasOwnProperty(label) && sales[label].hasOwnProperty("Carton Box")){
                return sales[label]["Carton Box"]["count"]
            }
          }),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Paper Bag',
            data: labels.map((label) => {
              if(sales.hasOwnProperty(label) && sales[label].hasOwnProperty("Paper Bag")){
                  return sales[label]["Paper Bag"]["count"]
              }
            }),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
          {
            label: 'Exercise Book',
            data: labels.map((label) => {
              if(sales.hasOwnProperty(label) && sales[label].hasOwnProperty("Exercise book")){
                  return sales[label]["Exercise book"]["count"]
              }
            }),
            borderColor: 'rgb(255, 205, 86)',
            backgroundColor: 'rgba(255, 205, 86, 0.5)',
          },
      ],
    };

    return <Line options={options} data={data} />;
}