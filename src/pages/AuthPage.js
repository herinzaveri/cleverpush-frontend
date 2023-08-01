import React, {useState} from 'react';
import {Tabs, Input, Button, Form} from 'antd';
import {useNavigate} from 'react-router-dom';
import actions from '../service';

const {TabPane} = Tabs;

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleLoginSubmit = async (values) => {
    const isSuccess = await actions.login(values);

    if (isSuccess) {
      navigate('/dashboard');
      navigate(0);
    }
  };

  const handleSignupSubmit = async (values) => {
    const isSuccess = await actions.signup(values);
    if (isSuccess) {
      navigate('/dashboard');
      navigate(0);
    }
  };

  return (
    <div style={{maxWidth: 400, margin: 'auto', paddingTop: 100}}>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Login" key="login">
          <Form onFinish={handleLoginSubmit}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{required: true, message: 'Please input your username!'}]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{required: true, message: 'Please input your password!'}]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Signup" key="signup">
          <Form onFinish={handleSignupSubmit}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{required: true, message: 'Please input your name!'}]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[{required: true, message: 'Please input your username!'}]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{required: true, message: 'Please input your password!'}]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Signup
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AuthPage;
