import {useEffect, useState} from 'react';
import actions from '../service';
import {Tabs} from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import LocationsTable from '../components/LocationsTable';
import LocationsMap from '../components/LocationsMap';

const DashboardPage = (props) => {
  const [locations, setLocations] = useState([]);
  const [activeTab, setActiveTab] = useState('table');

  useEffect(() => {
    async function fetchLocations() {
      const data = await actions.getLocations();
      setLocations(data);
    }

    fetchLocations();
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return <div>
    <Tabs activeKey={activeTab} onChange={handleTabChange}>
      <TabPane tab="Table" key="table">
        <LocationsTable locations={locations} />
      </TabPane>

      <TabPane tab="Map" key="map">
        <LocationsMap locations={locations} />
      </TabPane>
    </Tabs>
  </div>;
};

export default DashboardPage;
