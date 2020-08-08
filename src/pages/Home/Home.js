import React from 'react';
import { Table, Tag, Space } from 'antd';

import withVendors from '../../components/FetchData';
import Loader from '../../components/Loader';

const Home = ({ config, invoices, vendors }) => {
  // console.log(config, invoices, vendors);
  console.log(invoices);

  if(!vendors.length || !invoices.length || !config)  {
    return <Loader />
  }

  const ColumnsDetails = config.tableConfig.columns.map(({ fieldName, displayName, sortingEnabled }) => ({
    title: displayName,
    dataIndex: fieldName,
    key: fieldName,
    sorter: sortingEnabled ? (a, b) => a[fieldName] - b[fieldName] : null,
    // sortOrder: sortedInfo.columnKey === fieldName && sortedInfo.order,
    ellipsis: true,
  }));

  console.log(ColumnsDetails);

  return (
    <Table columns={ColumnsDetails} dataSource={invoices} />
  )
}

export default withVendors(Home);