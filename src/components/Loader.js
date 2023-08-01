import {Spin} from 'antd';

const Loader = () => {
  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return <div style={styles.container}>
    <Spin size='large' />
  </div>;
};

export default Loader;
