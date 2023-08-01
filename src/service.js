import axios from 'axios';

import config from './config';
import {message} from 'antd';
const serviceEndpoint = config.serviceEndpoint;

async function signup({name, username, password}) {
  const hideLoading = message.loading('Please wait...', 0);

  try {
    const {data} = await axios.post(`${serviceEndpoint}/auth/signup`, {
      name,
      username,
      password,
    });

    if (data.statusCode === 200 && data.body.token) {
      hideLoading();

      message.success('Signup success...');

      // eslint-disable-next-line no-undef
      localStorage.setItem('accessToken', data.body.token);

      return true;
    } else {
      throw new Error(data.body.message);
    }
  } catch (e) {
    hideLoading();
    const errorMessage = e.message || 'Something went wrong...';

    message.error(errorMessage);

    // eslint-disable-next-line no-undef
    localStorage.removeItem('accessToken');
  }
}

async function login({username, password}) {
  const hideLoading = message.loading('Please wait...', 0);

  try {
    const {data} = await axios.post(`${serviceEndpoint}/auth/login`, {
      username,
      password,
    });

    if (data.statusCode === 200 && data.body.token) {
      hideLoading();

      message.success('Login success...');

      // eslint-disable-next-line no-undef
      localStorage.setItem('accessToken', data.body.token);

      return true;
    } else {
      throw new Error(data.body.message);
    }
  } catch (e) {
    hideLoading();
    const errorMessage = e.message || 'Something went wrong...';

    message.error(errorMessage);

    // eslint-disable-next-line no-undef
    localStorage.removeItem('accessToken');
  }
}

async function addLocation({name, description, latitude, longitude, username}) {
  // eslint-disable-next-line no-undef
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  try {
    const {data} = await axios.post(`${serviceEndpoint}/locations`, {
      name,
      description,
      latitude,
      longitude,
      username,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (data.statusCode === 200 && data.body.name) {
      return true;
    } else {
      throw new Error(data.body.message);
    }
  } catch (e) {
    const errorMessage = e.message || 'Something went wrong...';

    message.error(errorMessage);
  }
}

async function getLocations() {
  // eslint-disable-next-line no-undef
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  try {
    const {data} = await axios.get(`${serviceEndpoint}/locations`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (data.statusCode === 200) {
      return data.body;
    } else {
      throw new Error(data.body.message);
    }
  } catch (e) {
    const errorMessage = e.message || 'Something went wrong...';

    message.error(errorMessage);
  }
}

const actions = {
  signup,
  login,
  addLocation,
  getLocations,
};

export default actions;
