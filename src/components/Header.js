import {DashboardOutlined, LogoutOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Header = (props) => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState('dashboard');
  const onClick = (e) => {
    navigate(e.key);
    setCurrent(e.key);
  };

  const items = [
    {
      label: 'Dashboard',
      title: 'Dashboard',
      key: 'dashboard',
      icon: <DashboardOutlined />,
    },
    {
      label: 'Create New',
      title: 'Create New',
      key: 'create-new',
      icon: <PlusCircleOutlined />,
    },
    {
      label: 'Logout',
      title: 'Logout',
      key: 'logout',
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
