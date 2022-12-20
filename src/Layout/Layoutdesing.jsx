import React, {useState} from 'react'
import { CameraOutlined, CarOutlined, FileOutlined, PieChartOutlined } from '@ant-design/icons';
  import { Breadcrumb, Layout, Menu } from 'antd';
import Logo from '../img/Logo.jpeg'
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from "../context/authContext"

  
  const { Header, Content, Footer, Sider } = Layout;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
  const items = [
    getItem(<Link to='/Dashboard'> Dashboard </Link>, '1', <PieChartOutlined />),
    getItem(<Link to='/Informe'> Informe de Uso </Link>, '2', <FileOutlined />  ),
    getItem(<Link to='/Reportes'> Reportes </Link>, '3', <FileOutlined />),
    getItem(<Link to='/VehiculosRegis'> Vehiculos Registrados </Link>, '4', <CarOutlined />),
    // getItem(<Link to = '/PerfilAuto'> Perfil del Vehiculo </Link>, '5', <CameraOutlined /> )
  //   getItem('User', 'sub1', <UserOutlined />, [
  //     getItem('Tom', '3'),
  //     getItem('Bill', '4'),
  //     getItem('Alex', '5'),
  //   ]),
  //   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  //   getItem('Files', '9', <FileOutlined />),
  ];
  

 

  const Layoutdesing = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { logout } = useAuth();

    const handleLogout = async () => {
      try {
        await logout();
      } catch (error) {
      }
  
    };

    return (

      <Layout
        style={{
          minHeight: '100vh',
        }}
      >

        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="Logo">
          <img src={Logo} alt="Logo empresarial" />
          </div>
          
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
          
          <div className='text-white font-bold text-xl text-center' style={{top: "60%", position: "relative", overflow: "hidden"}}>
          <button onClick={handleLogout} > Salir </button>

          </div>

        </Sider>

        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          />

          <Content
            style={{
              margin: '0 16px',
            }}
          >
            {/* <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb> */}
            <div
              className="site-layout-background"
              style={{
                padding: 34,
                minHeight: 360,
              }}
            >
              <>
              {/* <Row> */}
              {/* <TableUsage/>
              <Divider />
              <TableReports /> */}
              <Outlet />
      
              </>
            </div>
          </Content>

          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©2022 Created by RCPG GROUP
          </Footer>
        </Layout>
      </Layout>
    );
  };
export default Layoutdesing