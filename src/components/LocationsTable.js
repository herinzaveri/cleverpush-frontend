import {Table} from 'antd';

const LocationsTable = ({locations}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      key: 'longitude',
    },
  ];

  return <div>
    <Table
      rowKey={'_id'}
      columns={columns}
      dataSource={locations}
    />
  </div>;
};

export default LocationsTable;
