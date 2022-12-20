import {React, useEffect, useState} from "react";
import '../styles/ProfileCar.css';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { Table, Progress, Tag } from "antd";
import { getLastUsages, UsagesByCarId } from "../services/VehicleUsageAPI";
import { getRegisteredCarsById } from "../services/RegisterCarsAPI";
import { red } from '@ant-design/colors';
import { Gauge } from '@ant-design/plots';
import { ReportsByCarId } from "../services/VehicleReport";
import moment from 'moment';
import Nocar from '../img/Nocar.jpg'
import Nodata from '../img/Nodata.png'
import { CarInfo } from "./CarInfo";



const PerfilCar = () => {

    const location = useLocation();
    const bodyCar = location.state;
    const idCoche = bodyCar.firebaseId;
    console.log(idCoche);
    console.log(bodyCar);

    const [carUsageData, setcarUsageData] = useState();
    const [lastUsage, setlastUsage] = useState([]);
    const [carReportsData, setcarReportsData] = useState()
    const [UrlImage, setUrlImage] = useState('');
    const [image, setimage] = useState(false);
    const [dataGraph, setdataGraph] = useState(false);

    useEffect(() => {

      const  getUsageByCarId = async () =>  {
        const dataUsageByCarId =  await UsagesByCarId (idCoche)
        // setcarUsageData (dataUsageByCarId['data']);
        const reversed = dataUsageByCarId.data.reverse();
        setcarUsageData(reversed);
        console.log('holis');
        console.log(dataUsageByCarId);
        const dataRegisteredCarsById = await getRegisteredCarsById (idCoche)
        if (dataRegisteredCarsById.data.carImageUrl != null ) { 
          setUrlImage(dataRegisteredCarsById.data.carImageUrl)
          setimage(true)
        }
        console.log(dataRegisteredCarsById.data.carImageUrl);


        const lastUsage = await getLastUsages ([idCoche]); 
        console.log(lastUsage[0]);
        if (lastUsage['data'][0] == null){
          console.log('vacio');
          return;
        }
        
    console.log(lastUsage);
    setdataGraph(true);
    lastUsage.data.forEach(element => {
        if (element.fuel === 1)
        {
          element.fuel= 0.25
        }
        if (element.fuel === 2)
        {
            element.fuel= 0.50
        }
        if (element.fuel === 3)
        {
            element.fuel= 0.75
        }
        if (element.fuel === 4)
        {
            element.fuel= 1
        }
        if (element.fuel === 5)
        {
            element.fuel= 0
        }
        if (element.fuel === 6)
        {
            element.fuel= 0.10
        }
        
    });
      setlastUsage(lastUsage.data);

      lastUsage.data.sort(function (left, right) {
        return moment.utc(left.usageDate).diff(moment.utc(right.usageDate))
      } );
  
      lastUsage.data.forEach( data => {
        data.usageDate = (moment(data.usageDate).format('LL'));
      })
     console.log(lastUsage);
    //  setloading(true);
      }
      const getReportsByCarId = async () => {
        const dataReportsByCarId = await ReportsByCarId (idCoche)
        // setcarReportsData (dataReportsByCarId['data']);
        const reversed = dataReportsByCarId.data.reverse();
        setcarReportsData(reversed);
        console.log ('Reports aqui')
        console.log(dataReportsByCarId);
      } 

      getUsageByCarId();
      getReportsByCarId();    
    }, [])

    const DemoGauge = () => {
        const config = {
          percent: lastUsage[0].fuel,
          range: {
            ticks: [0, 0.10, 0.25, 0.50, 0.75, 1.00],
            color: ['#F4664A', '#FAAD14',  '#FAAD14', '#30BF78',  '#30BF78'  ],
          },
          indicator: {
            pointer: {
              style: {
                stroke: '#D0D0D0',
              },
            },
            pin: {
              style: {
                stroke: '#D0D0D0',
              },
            },
          },
          statistic: {
            content: {
              style: {
                fontSize: '36px',
                lineHeight: '36px',
              },
            },
          },
        };
        return <Gauge {...config} />;
      };
    

 
    
    const columnsUsage = [
        {
            title: "Conductor",
            dataIndex: "userFullName",
            key:"userFullName",
          },
        {
          title: "Destino",
          dataIndex:"destination",
          key:"destination",
        },
        {
            title: "Fecha de Uso",
            dataIndex: "usageDate",
            key:"usageDate",
            render: fila => moment(fila).format('LL')
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
             title: "Kilometraje Inicial",
             dataIndex:"startingKM",
             key:"startingKM",
            },
            {
            title: "Kilometraje Final",
            dataIndex:"endingKM",
            key:"endingKM",
             },
            {
            title: "Limpio",
            dataIndex: "isClean",
            key:"isClean",
            render: fila =>(fila == true) ? <><Tag color="green"   >Limpio</Tag> </> : <Tag color="red" >Sucio</Tag>
              },

    ]

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
       <div className="sell__car-wrapper"> 
    <h2 className="sell__car-title" style={{marginLeft: '1.5%'}}>Perfil del Vehiculo</h2>
      <div className="sell__car-top">
        <div className="sell__car-img">
          <h2>Foto del Vehiculo</h2>

           {image &&    <img  src={UrlImage}  /> }
           {image === false && <img  src={Nocar} /> }
        </div>

        <div className="tracking__history">
          <h3>Gasolina Actual</h3>  
          
          {dataGraph && <DemoGauge/>}
          {dataGraph === false && <img src={Nodata}/>}

        </div>
      </div>
      

      <div className="offer__wrapper">
       <CarInfo props={bodyCar}  />
       <br/>
      <div style={{marginLeft: '2%', marginRight: '2%'}}>
          <h1 >Uso del Vehiculo</h1>
         <Table 
          columns={columnsUsage}
          dataSource={carUsageData}
          size="small"
          />
      </div>

      <div style={{marginLeft: '2%', marginRight: '2%'}}>
        <h1> Reportes del Vehiculo</h1>
        <Table
        columns={columnsReports}
        dataSource={carReportsData}
        size='small'
        />
      </div>


      </div>
    </div>
      </div>

    );

}

export default PerfilCar