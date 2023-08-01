import {message} from 'antd';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    localStorage.removeItem('accessToken');

    navigate('/login');
    navigate(0);

    message.success({content: 'Logout success...', key: 'logout'});
  }, []);

  return null;
};

export default LogoutPage;
