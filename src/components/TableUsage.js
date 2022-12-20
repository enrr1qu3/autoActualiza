import { Table, Tag } from "antd";
import 'antd/dist/antd.css';
import React, {useState, useEffect} from 'react';
import { format } from 'date-fns';
import moment from 'moment';
import { Progress } from 'antd';
import { red, green } from '@ant-design/colors';
import { getRegisteredCars } from "../services/RegisterCarsAPI";

var dataTotal = [];

const TableUsage = () => {

  useEffect(() => {
    getCarData()
  }, [])

  const [dataTable, setDataTable] = useState();
  const getCarData = async () => {
  console.log('funciono');
  const urlUsage = 'https://controlvehicularrcp.azurewebsites.net/api/Usage'
  const urlRegisteredCars = 'https://controlvehicularrcp.azurewebsites.net/api/RegisteredCars'

  try {
  const usageresp = await fetch(urlUsage);
  const  usageData = await usageresp.json();
  const carsresp = await fetch(urlRegisteredCars);
  const carsRegisterData = await carsresp.json();
  console.log(usageData.data.$values);
  console.log(carsRegisterData.data.$values);
  dataTotal = [];
  
    carsRegisterData.data.$values.forEach(registerCar => {
      usageData.data.$values.forEach(usageData => {
        if (registerCar.firebaseId == usageData.vehicleId) {
          dataTotal.push({
            color: registerCar.color,
            extinguisher: registerCar.extinguisher,
            name: registerCar.name,
            destination: usageData.destination,
            fuel: usageData.fuel,
            isClean: usageData.isClean,
            // usageDate: moment(usageData.usageDate).format('LL'),
            usageDate: usageData.usageDate,
            observations: usageData.observations,
            km: usageData.startingKM,
            endingKM: usageData.endingKM,
            userFullName: usageData.userFullName,
            hasPolicy: usageData.hasPolicy,
            isUtilitary: usageData.isUtilitary

          })
          console.log('yes');
        }
      });
    });
    console.log(dataTotal)
    // await setDataTable(dataTotal);

    // // dataTable.sort(((a,b)=> {a.usageDate - b.usageDate}));
    // dataTable.sort(((a, b) => a.usageDate - b.usageDate));
    // setDataTable(dataTotal);
    
    dataTotal.sort(function (left, right) {
      return moment.utc(left.usageDate).diff(moment.utc(right.usageDate))
    } );

    dataTotal.forEach( data => {
      data.usageDate = (moment(data.usageDate).format('LL'));
    })

    const reversed = dataTotal.reverse();
    setDataTable(reversed);

    console.log(dataTotal[0].color);
  
  } catch (e) {
    console.log(e);
  }
  };
  
  const columns = [
    {
        title: "Fecha de uso",
        dataIndex:"usageDate",
        key:"usageDate",
       },
      {
        title: "Vehiculo",
        dataIndex:"name",
        key:"name",
        // render: fila => <i> {fila} </i>
      },
      {
        title: "Destino",
        dataIndex:"destination",
        key:"destination",
        // render: fila => <i> {fila} </i>
      },
        {
        title: "KM",
        dataIndex:"km",
        key:"km",
        // render: fila => 
        // {if(fila === 'UN_CUARTO_1_4'){return <Progress percent={30} steps={5} />}}
      },
        {
        title: "KM Final",
        dataIndex:"endingKM",
        key:"endingKM",
        // render: fila => 
        // {if(fila === 'COMPLETO_4_4'){return <Progress percent={100} steps={5} />}}
        },
        {
          title: "Gasolina",
          dataIndex:"fuel",
          key:"fuel",
          render: fila => 
          {
            if(fila === 5){return <Progress percent={0} steps={5}  />}
            if(fila === 6){return <Progress percent={10} steps={5} strokeColor={[red[5]]} />}
            if(fila === 1){return <Progress percent={25} steps={5} />}
            if(fila === 2){return <Progress percent={50} steps={5} />}
            if(fila === 3){return <Progress percent={75} steps={5} />}
            if(fila === 4){return <Progress percent={100} steps={5} />}
          }
        },
        {
          title: "Usuario",
          dataIndex:"userFullName",
          key:"userFullName",
          // render: fila => <i> {fila} </i>
          },
       {
        title: "Observaciones",
        dataIndex:"observations",
        key:"observations",
        // render: fila => <i> {fila} </i>
       },
       {
        title: 'Unidad Limpia',
        dataIndex: 'isClean',
        key: 'isClean',
        render: fila =>(fila == true) ? <><Tag color="green"   >Limpio</Tag> </> : <Tag color="red" >Sucio</Tag>

       },
       {
        title: 'Tiene Poliza',
        dataIndex: 'hasPolicy',
        key: 'hasPolicy',
        render: fila => (fila === true) ? <> <Tag color="green">Si tiene</Tag> </> : <> <Tag color="red"> No tiene</Tag>  </>

       },
       {
        title: 'Utilitario',
        dataIndex: 'isUtilitary',
        key: 'isUtilitary',
        render: fila => (fila === true) ? <> <Tag color="green">Utilitario</Tag> </> : <> <Tag color="red"> No Utilitario </Tag>  </>

       },
       
  ]


  //4 - Mostramos la data en DataTable
  return (
    <div className="App">
      <h1>Informes de Uso de Vehículos</h1>
     <Table 
      columns={columns}
      dataSource={dataTable}
      // pagination={{total: 0,
      //              pageSize: 4}}
      size="small"
     />
    </div>
  );
}

export default TableUsage;