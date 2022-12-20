import React from 'react'
import { Column } from '@ant-design/plots';

function FuelcolumsChart(props) {



    console.log(props);
    
    const data = props.props;
      const paletteSemanticRed = '#FF0000';
      const color1 = '#FF0000';
      const color2 = '#FD5959';
      const color3 = '#FFB502';
      const color4 = '#68E452';
      const color5 = '#1FCF00';
    //   const color6 = '#FF0000'
  const brandColor = '#5B8FF9';
  const config = {
    data,
    xField: 'title',
    yField: 'value',
    seriesField: 'value',
    color: ({ value }) => {
      console.log(value);
      if (value === 0.5) {
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
    label: {
      content: (originData) => {
        const val = parseFloat(originData.value);

        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };



      return <Column {...config} />;
}

export default FuelcolumsChart