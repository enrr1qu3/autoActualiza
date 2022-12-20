import React from 'react'
import { Bar } from '@ant-design/charts';

function FuelBasicBarPlot(props) {

    const data = props.props;
    data.sort(((a, b) => a.value - b.value));
    const color1 = '#FF0000';
    const color2 = '#FD5959';
    const color3 = '#FFB502';
    const color4 = '#68E452';
    const color5 = '#1FCF00';
    const brandColor = '#5B8FF9';


    const config = {
        
        data: data,
        xField: 'value',
        yField: 'title',
        seriesField: 'value',
        scrollbar: {
          type: 'vertical',
          slidable: true,
        },
        // barStyle: {
        //   fill: 'l(0) 0:#FF0000 0.25:#FD5959 0.50:#FFB502 0.75:#68E452 1:#1FCF00',
        // },
        
        color: ({ value }) => {
            console.log(value);
            if (value === 0.10) {
              return color1;
            }
            if (value === 0.25) {
              return color2;
            }
            if (value === 0.50) {
              return color3;
            }
            if (value === 0.75) {
              return color4;
            }
            if (value === 1) {
              return color5;
            }
      
            return brandColor;
          },
        legend: {
          position: 'top',
          custom: true,
          
          
          items: [
            {
              value: '差',
              name: 'Reserva (10%)',
              marker: {
                symbol: 'square',
                style: {
                  fill: '#FF0000',
                  r: 5,
                },
              },
            },
            {
              value: '良',
              name: '1/4 Tanque (25%)',
              marker: {
                symbol: 'square',
                style: {
                  fill: '#FD5959',
                  r: 5,
                },
              },
            },
            {
              value: '优',
              name: '1/2 Tanque (50%)',
              marker: {
                symbol: 'square',
                style: {
                  fill: '#FFB502',
                  r: 5,
                },
              },
            },
            {
              value: '实际值',
              name: '3/4 Tanque (75%)',
              marker: {
                symbol: 'square',
                style: {
                  fill: '#68E452',
                  r: 5,
                },
              },
            },
            {
              value: '目标值',
              name: 'Tanque lleno (100%)',
              marker: {
                symbol: 'square',
                style: {
                  fill: '#1FCF00',
                  r: 5,
                },
              },
            },
          ],
        },
      };

      return <Bar {...config} />;
}


export default FuelBasicBarPlot