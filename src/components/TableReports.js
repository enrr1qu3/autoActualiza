import { Table, Tag } from "antd";
import 'antd/dist/antd.css';
import React, {useState, useEffect} from 'react';
import { format } from 'date-fns';
import moment from 'moment';

var dataTotal = [];

const TableReports = ( ) =>{
    useEffect(() => {
        getCarData()
      }, [])

      
      const [dataTable, setDataTable] = useState();
      const getCarData = async () => {
      const urlReports = 'https://controlvehicularrcp.azurewebsites.net/api/Reports'
      const urlRegisteredCars = 'https://controlvehicularrcp.azurewebsites.net/api/RegisteredCars'
    
      
      try {
      const reportsresp = await fetch(urlReports);
      const  reportsData = await reportsresp.json();
      const carsresp = await fetch(urlRegisteredCars);
      const carsRegisterData = await carsresp.json();
      console.log(reportsData.data.$values);
      console.log(carsRegisterData.data.$values);
      dataTotal = [];
        carsRegisterData.data.$values.forEach(registerCar => {
          reportsData.data.$values.forEach(reportsData => {
            if (registerCar.firebaseId == reportsData.registeredVehicleId) {
                console.log('funciona');
              dataTotal.push({
                // created: moment(reportsData.created).format('LL'),
                created: reportsData.created,
                name: registerCar.name,
                userFullName: reportsData.userFullName,
                reportType: reportsData.reportType,
                comment: reportsData.comment,
    
              })
              console.log('datatotal');
              console.log(dataTotal);
            }
          });
        });
      setDataTable(dataTotal);

      dataTotal.sort(function (left, right) {
        return moment.utc(left.created).diff(moment.utc(right.created))
      } );
  
      dataTotal.forEach( data => {
        data.created = (moment(data.created).format('LL'));
      })

      const reversed = dataTotal.reverse();
      setDataTable(reversed);
    
        console.log(dataTotal);
      
      } catch (e) {
        console.log(e);
      }
      };
    
      const columns = [
          {
            title: "Vehiculo",
            dataIndex:"name",
            key:"name",
          },
          {
            title: "Fecha del reporte",
            dataIndex:"created",
            key:"created",
          },
            {
            title: "Quién lo usó",
            dataIndex:"userFullName",
            key:"userFullName",
            },
            {
              title: "Tipo de reporte",
              dataIndex:"reportType",
              key:"reportType",
              render: fila => 
              {
                if(fila === 1){return 'Limpieza'}
                if(fila === 2){return ' Infracción'}
                if(fila === 3){return ' Siniestro'}
                if(fila === 4){return 'Rayón'}
                if(fila === 5){return 'Ausencia de Gasolina'}
                if(fila === 6){return 'Llantas'}
                if(fila === 7){return 'Problema Electrico'}
                if(fila === 8){return 'Problema Fisico'}
                if(fila === 9){return 'Papeles en Regla'}
              }
              },
           {
            title: "Comentario",
            dataIndex:"comment",
            key:"comment",
           }, 
      ]

      return (
        <div className="App">
          <h1>Reportes</h1>
         <Table 
          columns={columns}
          dataSource={dataTable}
          size="small"
          pagination={{total: 0,
            pageSize: 4}}
         />
        </div>
      );

}

export default TableReports;