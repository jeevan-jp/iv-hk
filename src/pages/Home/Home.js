import React from 'react';
import withVendors from '../../components/FetchVendors';
import LocaleProvider from 'antd/lib/locale-provider';

const Home = ({ config, invoices, vendors }) => {
  console.log(config, invoices, vendors);

  if(!vendors.length || !invoices.length || !config)  {
    return <div>Loading...</div>
  }

  return (
    <div>Hey iVoyant!</div>
  )
}

export default withVendors(Home);