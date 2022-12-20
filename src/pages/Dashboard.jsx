import React, { useState, useEffect } from 'react';
import { Bullet } from '@ant-design/plots';
import { Col, Row, Divider, List, Typography } from 'antd';
import { getLastUsages } from '../services/VehicleUsageAPI';
import { getRegisteredCars } from '../services/RegisterCarsAPI';
import FuelcolumsChart from '../charts/FuelcolumsChart';
import FuelBasicBarPlot from '../charts/FuelBasicBarPlot';
import { TableDashboardReports } from '../components/TableDashboardReports';
import { UsageChartDate } from '../charts/UsageChartDate';

const style = {
  // background: '#0092ff',
  padding: '8px 0',
};

export const Dashboard = () => {

  const [vehicleFuelReport, setVehicleFuelReport] = useState([]);

  const [loading, setLoading] = useState(true);

  const [listIsClean, setlistIsClean] = useState([]);

  useEffect(() => {

    GetLastUsages();
  
  }, []);

  const GetLastUsages = async () => {

    let VehicleData = await getRegisteredCars();

    console.log(VehicleData);

    const ArrayIDVehicle = await VehicleData.data.map((item) => {
      return item.firebaseId;
    });

    const LastUsages = await getLastUsages(ArrayIDVehicle);

    console.log(LastUsages);

    let DataGraficaGasolina = [];
    DataGraficaGasolina = await LastUsages.data.map((item) => {

      if (item===null) {
        return;
      }

      if (item.fuel===1) {
        item.fuel = 25;
      };
      if (item.fuel===2) {
        item.fuel = 50;
      };
      if (item.fuel===3) {
        item.fuel = 75;
      };
      if (item.fuel===4) {
        item.fuel = 100;
      };
      if (item.fuel===5) {
        item.fuel = 0;
      };
      if (item.fuel===6) {
        item.fuel = 10;
      };

      let DataGraphic = {
          title: item.vehicleName,
          ranges: [10, 25, 50, 75, 100],
          Gasolina: [item.fuel],
          Objetivo: 99,
          value: item.fuel / 100,
          valuestring: String(item.fuel / 100),
          isClean: item.isClean,
          destination: item.destination
        };
      return DataGraphic;
    });
     
    DataGraficaGasolina = await DataGraficaGasolina.filter(element => {
      return element !== undefined;
    });

    console.log(DataGraficaGasolina);

    setVehicleFuelReport(DataGraficaGasolina);
    setLoading(false);

  }
  
  const config = {
    data: vehicleFuelReport,
    measureField: 'Gasolina',
    rangeField: 'ranges',
    targetField: 'Objetivo',
    xField: 'title',
    color: {
      range: [ '#FF0000', '#FD5959','#FFB502', '#68E452', '#1FCF00'],
      measure: '#0E92E8 ',
      target: '#39a3f4',
    },

    // bulletStyle: {
    //   measure: { 
    //     fillOpacity: 1.70 },
    //     style: {
    //       shadowBlur: 10,
    //     }  
    // },

    size: {
      measure: 12
    },

    label: {
      measure: {
        position: 'middle',
        style: {
          fill: '#727472 ',
        },
      },
    },
    xAxis: {
      line: null,
    },
    yAxis: false,
    // 自定义 legend
    legend: {
      custom: true,
      position: 'top',
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

  const dataString = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
if (!loading) return (
      <>

<Row>
    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 14, offset: 2 }}>
    <Divider orientation="center"> Carga de Gasolina </Divider>
      <FuelBasicBarPlot props={vehicleFuelReport} />
    </Col>
    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
    <Divider orientation="center">Vehiculos Sucios</Divider>
    <List
      size="small"
      // header={<div>Header</div>}
      // footer={<div>Footer</div>}
      bordered
      dataSource={vehicleFuelReport}
      // renderItem={(item) => <List.Item>{`${item.title} | Ultimo Destino: ${item.destination}`}</List.Item>}
      renderItem={(item) => (item.isClean) ? <List.Item>{`${item.title} || Ultimo Destino: ${item.destination}`}</List.Item>: null}
    />
    </Col>

  </Row>
  <br />
  {/* <Row>
    <Col xs={{ span: 20, offset: 4 }} lg={{ span: 20, offset: 4 }}>
    <Divider orientation="center"> Carga de Gasolina </Divider>
      <UsageChartDate />
    </Col>
    

  </Row> */}
  {/* <Row>
  <Col xs={{ span: 14, offset: 4 }} lg={{ span: 14, offset: 4 }}>
    <h1 style={{display: 'flex', justifyContent: 'center'}}>
        Ultimos Reportes
      </h1>
      <TableDashboardReports/>
    </Col>
  </Row> */}
      {/* <Divider orientation="center"> Carga de Gasolina </Divider> */}
    
    {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}> */}
      {/* <Col className="gutter-row" span={12}> */}
        {/* <div style={style}>
        <Bullet {...config} />
        </div> */}
      {/* <Divider orientation="center"> Carga de Gasolina </Divider>
      <FuelcolumsChart props={vehicleFuelReport}/> */}
      {/* <Divider orientation="center"> Carga de Gasolina </Divider>
      <FuelBasicBarPlot props={vehicleFuelReport} /> */}
      <br/> <br/> <br/>
      <h1 style={{display: 'flex', justifyContent: 'center'}}>
        Ultimos Reportes
      </h1>
      <TableDashboardReports/>
      {/* </Col> */}
{/*      
     <Col className="gutter-row" span={12}>
        <div style={style}>
        </div>
      </Col>
      
    </Row> */}
    </>
  );
  if (loading) return <h1> Cargando </h1>;
};
