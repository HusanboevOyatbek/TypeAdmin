import  { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

 

  return (
    <Layout>
      <Sider className='h-screen' trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
           

            {
              key: '1',
              icon: <UserOutlined />,
              label: <NavLink to={"/admin/actor"}>Aktiyorlar</NavLink>,
            }, {
              key: '2',
              icon: <UserOutlined />,
              label: <NavLink to={"/admin/movie"}>Kinolar</NavLink>,
            }, {
              key: '3',
              icon: <UserOutlined />,
              label: <NavLink to={"/admin/director"}>Derektorlar</NavLink>,
            }, {
              key: '4',
              icon: <UserOutlined />,
              label: <NavLink to={"/admin/genre"}>Janrlart</NavLink>,
            },


            {
              key: '5',
              icon: <UserOutlined />,
              label: <NavLink to={"/admin/category"}>Category</NavLink>,
            },

            
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;