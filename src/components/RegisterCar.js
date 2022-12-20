
import 'antd/dist/antd.css';
import { Form, Input, Button, Modal, DatePicker, Switch, Upload, Cascader } from 'antd';
import { useState } from 'react';
import 'moment/locale/es'
import locale from 'antd/lib/date-picker/locale/es_ES';
import { PlusOutlined } from '@ant-design/icons';
import { postRegisteredCar } from '../services/RegisterCarsAPI';



const {Item} = Form;

export const RegisterCar = (props) => {



  const [modal, setModal] = useState(false);

  const [autoNuevo, setAutoNuevo] = useState({
    Name: '',
    Year: '',
    Serie: '',
    Color: '',
    KM: '',
    Owner: '',
    InsurancePolicy: '',
    IsUtilitary: true,
    CarImageFile: '',
    HydraulicLift: true,
    SpareWheel: true,
    Extinguisher: true,
    Serviced: true,
    LastServiceDate: '',
    InitialFuel: ''
  });

  const abrirModal=() => {
    setModal(true);
  } 
  const cerrarModal=() => {
    setModal(false);
  }

  const accion= async () => {
  
    console.log(autoNuevo);

    const SendCarData = await postRegisteredCar(autoNuevo)
    if (!SendCarData.error) 
    {
      cerrarModal(); 
      props.onSubmit(true)
    }
    console.log(SendCarData);

    
  }

  const layout={
    labelCol:{
      span: 5,
    },
    wrapperCol: {
      span: 16,
    }
  }

  const handleChange=e=>{
    const {name, value} = e.target;
    setAutoNuevo({...autoNuevo, [name]: value});
  };

  const Utileria = (resultado) => {

    setAutoNuevo({...autoNuevo, 'IsUtilitary': resultado })
  };

  const Servicio = (resultado) => {
    setAutoNuevo({...autoNuevo, 'Serviced': resultado })
  };
  
  const Hidraulico = (resultado) => {
    setAutoNuevo({...autoNuevo, 'HydraulicLift': resultado })

  };
  
  const LlantaRef = (resultado) => {
    setAutoNuevo({ ...autoNuevo, 'SpareWheel': resultado})
  };
  
  const Extinguidor = (resultado) => {
    setAutoNuevo({ ...autoNuevo, 'Extinguisher': resultado})
  };

  const date = (resultado) => {
    if (resultado === null) {
      return console.log('Fallo');
    } else {
      setAutoNuevo({ ...autoNuevo, 'LastServiceDate': resultado._d.toUTCString()})
    }
  };
  
  const Año = (resultado) => {
    if (resultado === null) {
      return console.log('Fallo2');
    }else {
      setAutoNuevo({ ...autoNuevo, 'Year': resultado._d.toUTCString()})
    }
  }

  const foto = (resultado) => {
  console.log(resultado);
  setAutoNuevo({ ...autoNuevo, 'CarImageFile': resultado})
  }

  const GasolinaInicial = (resultado) => {
    console.log(resultado[0]);
    setAutoNuevo({ ...autoNuevo, 'InitialFuel': resultado[0]})

  };

  const Gasolinaoptions = [
    {
      value: '1',
      label:'Un Cuarto 1/4'
    },
    {
      value: '2',
      label:'Medio 1/2'
    },   {
      value: '3',
      label:'Tres Cuartos 3/4'
    },   {
      value: '4',
      label:'Tanque Lleno'
    },
    {
      value: '5',
      label:'Tanque Vacio'
    },   {
      value: '6',
      label:'Reserva'
    },

  ]

  

  return (
    <div className='text-center mb-2'>

      <br />
    
      <Button type='primary'onClick={abrirModal}> Agregar Auto Nuevo </Button>

      <Modal 
      className='font-bold '
      title='Agregar Auto Nuevo'
      open={modal}
      onCancel={cerrarModal}
      onOk={accion}
      centered
      footer={[
        <Button type='primary' onClick={accion} > Guardar </Button>,
        <Button onClick={cerrarModal}> Cancelar </Button>
      ]}>

        <Form {...layout} >

          <Item label='Nombre'>
            <Input name='Name' onChange={handleChange} />
          </Item>

          <Item label='Año'>
          <DatePicker name='Year' onChange={Año} picker="year" format={'YYYY'} />
          </Item>

          <Item label='Serie'>
            <Input name='Serie' onChange={handleChange} />
          </Item>

          <Item label='Color'>
            <Input name='Color' onChange={handleChange} />
          </Item>

          <Item label='KM'>
            <Input name='KM' onChange={handleChange} />
          </Item>

          <Item label='Dueño'>
            <Input name='Owner' onChange={handleChange} />
          </Item>

          <Item label='Poliza'>
            <Input name='InsurancePolicy' onChange={handleChange} />
          </Item>

          <Item label='Gas Inicial:' >
            <Cascader  options={Gasolinaoptions} onChange={GasolinaInicial} />
          </Item>


          <div className="text-center">
            <Item label='Utilitaria'>
                <Switch name='IsUtilitary' checkedChildren="Si" unCheckedChildren="No" defaultChecked onChange={Utileria} />
            </Item>
           
            <Item label='Servicio' rules={[{ required: true, message: 'Ingresa algo' }]}>
              <Switch name='Extinguisher' checkedChildren="Si" unCheckedChildren="No" defaultChecked onChange={Servicio} />
            </Item>
    
          <Item label='Fecha Servicio'>
            <DatePicker name='LastServiceDate' style={{width: '100%'}} locale={locale} onChange={date}/>
          </Item>

          <h1 className='text-center text-xl mb-4'> CheckList </h1>

          <Item label='Gato Hidraulico' name='HydraulicLift' rules={[{ required: true, message: 'Ingresa algo' }]}>
            <Switch checkedChildren="Si" unCheckedChildren="No" defaultChecked onChange={Hidraulico} />
          </Item>

          <Item label='Llanta Refaccion' name='SpareWheel' rules={[{ required: true, message: 'Ingresa algo' }]}>
            <Switch checkedChildren="Si" unCheckedChildren="No" defaultChecked onChange={LlantaRef} />
          </Item>

          <Item label='Extinguidor' name='Extinguisher' rules={[{ required: true, message: 'Ingresa algo' }]}>
            <Switch checkedChildren="Si" unCheckedChildren="No" defaultChecked onChange={Extinguidor} />
          </Item>
 
          <Item label="Agregar foto" valuePropName="fileList">
            <Upload listType="picture-card" onChange={(e)=> foto(e.file.originFileObj)} maxCount='1'>
              <div>
                <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Item>
          </div>

        </Form>
      </Modal>

    </div>
  )
}

