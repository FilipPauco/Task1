import React from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Earnings',
        font: {
                size: 20, 
              },
      },
    },
}

export default function DoughnutGraph({sales,fromDate,toDate}) {
    let labels = ['Paper Cup', 'Carton Box', 'Paper Bag', 'Exercise book']
    let earningsData = {};

    // in cycle, I asign values from sales to suitable format for this graph
    for(let i in sales){
        for(let j in sales[i]){
            if(!earningsData[j]){
                earningsData[j] = sales[i][j].count * sales[i][j].price;
            }
            else{
                earningsData[j] += sales[i][j].count * sales[i][j].price;
            }
        }       
    }

    
    const data = {
        labels: ['Paper Cup', 'Carton Box', 'Paper Bag', 'Exercise Book'],
        datasets: [
            {
                label: 'Earnings in €',
                
                data: labels.map((label) => {
                    return earningsData[label]
                  }),

                backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(53, 162, 235, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                ],
                borderColor: [
                'rgb(255, 99, 132)',
                'rgb(53, 162, 235)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                ],
                borderWidth: 1,
            },
            ],
        };

  return <Doughnut options={options} data={data} />;
}