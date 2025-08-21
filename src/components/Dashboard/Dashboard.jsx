import React, { useEffect, useState } from 'react';
import { Button, Input, Layout, Menu, Popover, message, theme } from 'antd';
import {
  MdPieChart,
  MdMyLocation,
  MdGridOn,
  MdOutlineSubscriptions,
  MdEmojiEvents,
  MdSettings,
  MdLogout,
} from 'react-icons/md';
import { GiTicket } from 'react-icons/gi';
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import {
  useChangePasswordMutation,
  useGetAllVoucherQuery,
} from '../../redux/slices/apiSlice';
import Swal from 'sweetalert2';

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useGetAllVoucherQuery();
  const [visible, setVisible] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  // password state
  const [passwords, setPasswords] = useState({
    old_password: '',
    new_password: '',
  });

  useEffect(() => {
    if (
      location.pathname === '/dashboard' ||
      location.pathname === '/dashboard/'
    ) {
      navigate('/dashboard/overview', { replace: true });
    }
  }, [location.pathname, navigate]);

  const currentKey = location.pathname.split('/')[1];
  const [activeTab, setActiveTab] = useState('privacy');

  const handleLogOut = () => {
    localStorage.removeItem('token');
  };

  const handleClick = (key) => {
    setActiveTab(key);
    navigate(`/dashboard/settings/${key}`);
  };

  const pageTitles = {
    overview: 'Overview',
    'hunt-management': 'Hunt Management',
    'clue-management': 'Clue Management',
    'qr-management': 'QR Code',
    subscription: 'Subscription',
    prize: 'Prize Claim',
    settings: 'Settings',
  };

  // 🟢 Handle password update
const handlePasswordUpdate = async () => {
  try {
    if (!passwords.old_password || !passwords.new_password) {
      return Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please fill both fields',
      });
    }

    const res = await changePassword(passwords).unwrap();

    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: res.message || 'Password updated successfully ✅',
       background: "#1e1e2f",
      color: "#fff",
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });

    setPasswords({ old_password: '', new_password: '' });
    setVisible(false);
  } catch (err) {
    Swal.fire({
      icon: 'error',
       background: "#1e1e2f",
      color: "#fff",
      title: 'Error!',
      text: err?.data?.detail || 'Failed to update password ❌',
    });
  }
};
  // Password change popover
  const content = (
    <div className="p-4 w-[350px] bg-[#0d1117] rounded-xl shadow-lg border border-[#1f2937]">
      <h3 className="text-[#38bdf8] text-lg font-bold mb-3 tracking-wide">
        🔐 Change Password
      </h3>

      <label className="block text-sm text-gray-400 mb-1">Old Password</label>
      <Input.Password
        placeholder="Enter old password"
        value={passwords.old_password}
        onChange={(e) =>
          setPasswords((prev) => ({ ...prev, old_password: e.target.value }))
        }
        className="mb-3 bg-[#1e293b] border-none placeholder-red-500  rounded-lg"
      />

      <label className="block text-sm text-gray-400 mb-1">New Password</label>
      <Input.Password
        placeholder="Enter new password"
        value={passwords.new_password}
        onChange={(e) =>
          setPasswords((prev) => ({ ...prev, new_password: e.target.value }))
        }
        className="mb-4 bg-[#1e293b] border-none placeholder-gray-500 rounded-lg"
      />

      <Button
        type="primary"
        loading={isLoading}
        onClick={handlePasswordUpdate}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 border-none rounded-lg shadow-md hover:scale-105 transition-transform"
      >
        Update
      </Button>
    </div>
  );

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    { key: 'dashboard/overview', icon: <MdPieChart size={20} />, label: 'Overview' },
    { key: 'dashboard/hunt-management', icon: <MdMyLocation size={20} />, label: 'Hunt Management' },
    { key: 'dashboard/qr-management', icon: <MdGridOn size={20} />, label: 'QR Code' },
    { key: 'dashboard/subscription', icon: <MdOutlineSubscriptions size={20} />, label: 'Plans' },
    { key: 'dashboard/voucher', icon: <GiTicket size={20} />, label: 'Vouchers' },
    { key: 'dashboard/prize', icon: <MdEmojiEvents size={20} />, label: 'Prize Claim' },
    { key: 'dashboard/settings', icon: <MdSettings size={20} />, label: 'Settings' },
  ];

  const settings = [
    { key: 'privacy', label: 'Privacy Policy' },
    { key: 'terms', label: 'Terms & Conditions' },
    { key: 'notification', label: 'Notification' },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <Layout className="h-screen">
      {/* Sidebar */}
      <Sider
        breakpoint="lg"
        width={260}
        collapsedWidth="0"
        className="flex flex-col justify-between h-screen"
      >
        <div className="flex flex-col h-screen justify-around">
          <div className="flex-1 h-screen overflow-auto">
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[currentKey]}
              items={menuItems}
              className="mt-16"
              onClick={handleMenuClick}
            />
          </div>
          <Link
            to="/login"
            onClick={handleLogOut}
            className="text-red-600 mb-9 hover:text-green-400 flex justify-center items-center gap-2"
          >
            <MdLogout className="-mt-1" size={16} />
            <h3 className="popmed">Logout</h3>
          </Link>
        </div>
      </Sider>

      {/* Main layout */}
      <Layout className="bg-[#030717]">
        <Header className="h-[100px] px-6 bg-[#001529] flex items-center justify-between relative">
          {/* Page Title */}
          <div className="flex items-center text-white text-[24px] font-semibold">
            {pageTitles[currentKey] || 'Dashboard'}
          </div>

          {/* Right: Popover or Settings Tabs */}
          {!location.pathname.startsWith('/dashboard/settings') && (
            <Popover
              content={content}
              trigger="click"
              placement="bottomRight"
              open={visible}
              onOpenChange={setVisible}
            >
              <button className="text-[#38bdf8] font-semibold text-[14px] px-3 py-2 rounded-md border border-[#1f2937] hover:bg-[#0d1117] transition-colors">
                Change Admin Password
              </button>
            </Popover>
          )}

          {location.pathname.startsWith('/dashboard/settings') && (
            <div className="flex gap-6">
              {settings.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleClick(item.key)}
                  className={`text-white font-semibold transition-all duration-200 ${
                    activeTab === item.key ? 'text-[28px]' : 'text-[18px]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Blue Line */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#5D87A3]" />
        </Header>

        <Content
          className="bg-[#030717] h-[85vh] overflow-y-auto"
          style={{ margin: '24px 16px 0' }}
        >
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
