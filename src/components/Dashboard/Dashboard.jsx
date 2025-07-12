import React from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  MdOutlineDashboard,
  MdManageSearch,
  MdQrCode,
  MdSettings,
  MdEmojiEvents,
} from 'react-icons/md';
import { GiTreasureMap } from 'react-icons/gi';
import { useNavigate, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: 'overview',
      icon: <MdOutlineDashboard size={20} />,
      label: 'Overview',
    },
    {
      key: 'hunt-management',
      icon: <GiTreasureMap size={20} />,
      label: 'Hunt Management',
    },
    {
      key: 'clue-management',
      icon: <MdManageSearch size={20} />,
      label: 'Clue Management',
    },
    {
      key: 'qr-management',
      icon: <MdQrCode size={20} />,
      label: 'QR Code',
    },
    {
      key: 'prize',
      icon: <MdEmojiEvents size={20} />,
      label: 'Prize Claim',
    },
    {
      key: 'settings',
      icon: <MdSettings size={20} />,
      label: 'Settings',
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <Layout className="h-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => console.log(broken)}
        onCollapse={(collapsed, type) => console.log(collapsed, type)}
      >
    
        <Menu
          className="mt-16 space-y-4"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['overview']}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout className='bg-[#030717]'>
<Header className="h-[100px] p-0 relative bg-[#001529]">
  {/* Title */}
  <div>
    <h4 className="text-[28px] mt-6 pl-5 text-white">Analytics & Reporting</h4>
  </div>

  {/* Blue Line at Bottom */}
  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#5D87A3]" />
</Header>

        <Content className='bg-[#030717] h-[85vh] overflow-y-auto' style={{ margin: '24px 16px 0' }}>
          <div

          >
            <Outlet />
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};

export default Dashboard;
