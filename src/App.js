import {BrowserRouter, Route, Routes} from 'react-router-dom';

import classes from './App.module.css';
import Header from './components/Header';
import {useEffect, useState} from 'react';
import config from './config';
import axios from 'axios';
import Loader from './components/Loader';
import AuthPage from './pages/AuthPage';
import LogoutPage from './pages/LogoutPage';
import DashboardPage from './pages/DashboardPage';
import CreateNewPage from './pages/CreateNewPage';
import 'mapbox-gl/dist/mapbox-gl.css';
// import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import 'react-map-gl/dist/mapbox-gl.css';


const App = () => {
  // eslint-disable-next-line no-undef
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function verifyUser() {
      try {
        if (!accessToken) {
          throw new Error();
        }

        const {data} = await axios.post(`${config.serviceEndpoint}/auth/verify-user`, {accessToken});

        setUser({isAuthorised: true, data: data.body});
      } catch (e) {
        // eslint-disable-next-line no-undef
        localStorage.removeItem('accessToken');
        setUser({isAuthorised: false});
      }
    }

    verifyUser();
  }, [accessToken]);

  if (!user) {
    return <Loader />;
  }

  if (!user.isAuthorised) {
    return (
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <div className={classes.main}>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-new" element={<CreateNewPage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
