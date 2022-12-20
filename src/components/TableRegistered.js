import { Button, Table, Modal, message, Popconfirm, Tag } from "antd";
import 'antd/dist/antd.css';
import React, { useState, useEffect, useReducer } from 'react';
import QRCode from "react-qr-code";
import { format } from 'date-fns';
import { deleteRegisteredCars, getRegisteredCars } from "../services/RegisterCarsAPI";
import { RegisterCar } from "./RegisterCar";
import { Link } from 'react-router-dom';
import moment from 'moment';
import QRcode from "qrcode.react";
import jsPDF from "jspdf";
import { DeleteFilled, EditTwoTone, PrinterFilled, QrcodeOutlined } from "@ant-design/icons";
import { UpdateCar } from "./UpdateCar";


function TableRegistered() {
  const [refresh, forcedrefresh] = useReducer(x => x + 1, 0)
  const [carId, setCarId] = useState();
  const [carData, setcarData] = useState([]);
  const [nameCar, setnameCar] = useState();

  useEffect(() => {
    const getCarData = async () => {
      const carList = await getRegisteredCars()
      console.log(carList);
      if (carList['error'] === false) {
        // setcarData(carList['data']);

        carList.data.sort(function (left, right) {
          return moment.utc(left.year).diff(moment.utc(right.year))
        });
        const reversed = carList['data'].reverse();
        setcarData(reversed);


        // carList.forEach( data => {
        //   data.year = (moment(data.year).format('LL'));
        // })
      }


    };

    getCarData();

  }, [refresh])

  const refreshNew = (New) => {
    console.log(New);
    forcedrefresh()
  }


  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (index) => {
    console.log('holi');
    console.log(index.firebaseId);
    setIsModalOpen(true);
    setCarId(index.firebaseId);
    setnameCar(index.name);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {

    setIsModalOpen(false);
  };

  const qrGenerate = (value) => {

    console.log(value);
  }

  function buscar(carId) {

    console.log(carId);
  }

  const jspdfGenerator = (nameCar) => {
    let pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
      // format: [45, 90]
    })
    console.log(document.getElementById('qrcode'));
    let base64Image = document.getElementById('qrcode').toDataURL()
    pdf.setFontSize(25);
    pdf.text(nameCar, 75, 30, 0, 0)
    pdf.addImage(base64Image, 'png', 60, 50, 80, 80)
    // pdf.addImage(base64Image, 'png', 90, 50, 40, 40)
    pdf.save('QR.pdf')

  }
  
  const columns = [
    {
      title: "Vehiculo",
      dataIndex: "name",
      key: "name",
      align: 'center',
      render: (fila, index) =>
        <Button type="default"  > <Link to='/PerfilAuto' state={index} bodyCar={index} > {fila} </Link>

        </Button>
    },
    {
      title: "Año",
      dataIndex: "year",
      key: "year",
      align: 'center',
      render: fila => moment(fila).format('LL')
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      align: 'center',
    },
    {
      title: "Dueño",
      dataIndex: "owner",
      key: "owner",
      align: 'center',
    },
    {
      title: "Tipo de Vehiculo",
      dataIndex: "isUtilitary",
      key: "isUtilitary",
      align: 'center',
      render: fila => (fila == true) ? <><Tag color="green"   >Utilitario</Tag> </> : <Tag color="red" >No Utilitario</Tag>
    },
    {
      title: "Fecha de Ultimo Servicio",
      dataIndex: "lastServiceDate",
      key: "lastServiceDate",
      align: 'center',
      render: fila => moment(fila).format('LL')

    },
    {
      title: "Acciones",
      dataIndex: "firebaseId",
      key: "firebaseId",
      align: 'center',
      // render: (fila, record, index) => <> {index} </>
      render: (fila, index) =>
        <>
          <Button type="primary" onClick={() => showModal(index)}  > <QrcodeOutlined /> </Button>

          <Button danger type="primary" >
            <Popconfirm
              title="¿Estas seguro de Elimar el Auto?"
              onConfirm={() => confirmDeleteCar(fila)}
              onCancel={() => cancel('areaImprimir')}
              okText="Si"
              cancelText="No"
            >
              <a href="#"> <DeleteFilled /> </a>
            </Popconfirm>
          </Button>

          {/* Actualizar botton */}

          <UpdateCar onSubmit={refreshNew} carId={fila}/>

         
          {/* Actualizar botton */}

          <Modal title="Codigo Qr" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
            <Button type="primary" onClick={() => jspdfGenerator(nameCar)}> <PrinterFilled /> </Button>
            <QRcode value={carId} style={{ marginLeft: '24%' }} id='qrcode' >
            </QRcode>
          </Modal>
        </>,
    },
  ]


  const confirmDeleteCar = async (id) => {
    const deletecarsbyid = await deleteRegisteredCars(id);
    if (!deletecarsbyid.error) {
      message.success('El auto se ha eliminado Satifactoriamente');
      forcedrefresh();
    }
  };
  const cancel = (e) => {
    // console.log(e);
    // message.error('');
  };

  return (
    <div>


      <RegisterCar onSubmit={refreshNew} />


      <div style={{ marginLeft: '5%', marginRight: '5%' }}>
        <h1 >Vehiculos Registrados</h1>
        <Table
          columns={columns}
          dataSource={carData}
          pagination
          size="small"
        />
        <h1>
          Presione el nombre del Vehículo para ver mas detalles.
        </h1>
      </div>
    </div>
  );
}

export default TableRegistered