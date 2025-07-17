import React, { useState } from 'react';
import { Layout, Menu, Tabs, theme } from 'antd';
import {
  MdOutlineDashboard,
  MdManageSearch,
  MdQrCode,
  MdSettings,
  MdEmojiEvents,
  MdPieChart,
  MdMyLocation,
  MdLink,
  MdGridOn,
} from 'react-icons/md';
import { GiTreasureMap } from 'react-icons/gi';
import { useNavigate, Outlet, data, useLocation } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
const currentKey = location.pathname.split('/')[1];

    const [activeTab, setActiveTab] = useState('privacy');

  const handleClick = (key) => {
    setActiveTab(key);
    navigate(`/settings/${key}`)
    console.log(`Clicked: ${key}`);
  };


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: 'overview',
      icon: <MdPieChart size={20} />,
      label: 'Overview',
    },
    {
      key: 'hunt-management',
      icon: <MdMyLocation size={20} />,
      label: 'Hunt Management',
    },
    {
      key: 'clue-management',
      icon:  <div><img src="/images/link.png" alt="" /></div>,
      label: 'Clue Management',
    },
    {
      key: 'qr-management',
      icon: <MdGridOn size={20} />,
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


  const settings = [
  {
    key: 'privacy',
    label: 'Privacy Policy',
    children: 'Content of Tab Pane 1',
  },
  {
    key: 'terms',
    label: 'Terms & Conditions',
    children: 'Content of Tab Pane 2',
  },

];

const onChange = key => {
  console.log(key);
};

  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <Layout className="h-screen">
<Sider
  breakpoint="lg"
  width={260}
  collapsedWidth="0"
  onBreakpoint={(broken) => console.log(broken)}
  onCollapse={(collapsed, type) => console.log(collapsed, type)}
  className="flex flex-col justify-between"
>
  <div>
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[currentKey]}
      items={menuItems}
      className="mt-16"
      onClick={handleMenuClick}
    />
  </div>

  {/* Logout Button */}
  <div className="p-4 mt-80">
    <button
      onClick={() => {
        // ✅ You can add your logout logic here (e.g., clear auth token, navigate to login)
        console.log("Logout clicked");
        navigate("/login"); // or replace with your logout route
      }}
      className="w-full bg-red-500 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded"
    >
      Logout
    </button>
  </div>
</Sider>


      <Layout className='bg-[#030717]'>
  <Header className="h-[100px] px-6 bg-[#001529] flex items-center justify-between relative">
      {/* Right: Tab-style Settings Buttons */}

{
    !location.pathname.startsWith('/settings') &&         <div>
    <h4 className="text-white text-[24px] font-semibold">Analytics & Reporting</h4>
  </div>
}

{
    location.pathname.startsWith('/settings') &&       <div className="flex gap-6">
        {settings.map((item) => (
          <button
            key={item.key}
            onClick={() => handleClick(item.key ?? 'privacy')}

            className={`text-white font-semibold transition-all duration-200 ${
              activeTab === item.key ? 'text-[28px]' : 'text-[18px]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
}

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
