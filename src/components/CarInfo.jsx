import React from 'react'
import { Badge, Descriptions, Tag } from 'antd';
import moment from 'moment';


export const CarInfo = (props) => {

 const dataInfo = props.props;
 console.log(dataInfo);
  return (
    <>

<Descriptions style={{marginLeft: '2%', marginRight: '2%'}} title="Información del Vehículo" bordered>
    <Descriptions.Item label="Extintor">{( dataInfo.extinguisher == true) ?  <Tag color="green"   > Incluido </Tag> : <Tag color="red" >No incluido</Tag> }</Descriptions.Item>
    <Descriptions.Item label="Gato Hidráulico">{( dataInfo.hydraulicLift == true) ?  <Tag color="green"   > Incluido </Tag> : <Tag color="red" >No incluido</Tag> }</Descriptions.Item>
    <Descriptions.Item label="Llanta de Repuesto">{( dataInfo.spareWheel == true) ?  <Tag color="green"   > Incluido </Tag> : <Tag color="red" >No incluido</Tag> }</Descriptions.Item>
    <Descriptions.Item label="Poliza de Seguro">{dataInfo.insurancePolicy}</Descriptions.Item>
    <Descriptions.Item label="Numero de Serie" span={2}>{dataInfo.serie}</Descriptions.Item>
    <Descriptions.Item label="Servicio">{( dataInfo.serviced == true) ?  <Tag color="green"   > Servicio al dia </Tag> : <Tag color="red" > Falta Servicio</Tag> }</Descriptions.Item>
    <Descriptions.Item label="Fecha de Ultimo Servicio">{moment(dataInfo.lastServiceDate).format('LL')}</Descriptions.Item>
  </Descriptions>
    </>
  )
}
