import { Table } from 'antd'
import moment from 'moment'
import {React, useEffect, useState} from 'react'
import { getRegisteredCars } from '../services/RegisterCarsAPI'
import { getReportsCars } from '../services/VehicleReport'


var dataTotal = [];

export const TableDashboardReports = () => {

    const [dataTable, setdataTable] = useState()

    useEffect(() => {
      const getdata= async () => {
        try{
        const dataReports = await getReportsCars();
        const dataCars = await getRegisteredCars(); 
        dataTotal=[];
        dataReports.data.forEach( dataReports => {
            dataCars.data.forEach( dataRegisteredCars => {
                if (dataRegisteredCars.firebaseId == dataReports.registeredVehicleId) {
                    console.log('funciona');
                  dataTotal.push({
                    // created: moment(reportsData.created).format('LL'),
                    created: dataReports.created,
                    name: dataRegisteredCars.name,
                    userFullName: dataReports.userFullName,
                    reportType: dataReports.reportType,
                    comment: dataReports.comment,
        
                  })
                }
            }) 
        });

        dataTotal.sort(function (left, right) {
            return moment.utc(left.created).diff(moment.utc(right.created))
          } );
      
          dataTotal.forEach( data => {
            dataTotal.created = (moment(data.created).format('LL'));
          })
    
          const reversed = dataTotal.reverse();
          setdataTable(reversed);
        
            console.log(dataTotal);

      }
     catch(error){
       console.log(error);
     }
    }
    getdata();

    

    }, [])
    

    const columnsReports = [
        {
            title: "Conductor",
            dataIndex: "userFullName",
            key:"userFullName",
          },
          {
            title: "Fecha del Reporte",
            dataIndex: "created",
            key:"created",
            render: fila => moment(fila).format('LL')
          },
          {
            title: "Tipo de Reporte",
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
            dataIndex: "comment",
            key:"comment",
          },
         
          
      ]
  return (
    <div>
            <Table 
          columns={columnsReports}
          dataSource={dataTable}
          size="small"
          />

    </div>
  )
}
