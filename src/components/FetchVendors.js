import React from 'react';
import Axios from 'axios';
import serverUrl from '../utils/baseUrl';

const withData = WrappedComponent => {
  class withData extends React.Component {
    state = {
      invoices: [],
      vendors: [],
      config: null,
    }

    componentDidMount() {
      this.fetchInvoices();
      this.fetchVendors();
      this.fetchConfig();
    }

    fetchInvoices = async () => {
      const { data } = await Axios.get('http://localhost:3010/invoices');
      this.setState({invoices: data})
    }

    fetchVendors = async () => {
      const { data } = await Axios.get('http://localhost:3010/vendors');
      this.setState({vendors: data})
    }

    fetchConfig = async () => {
      const { data } = await Axios.get('http://localhost:3010/config');
      this.setState({config: data})
    }

    render() {
      return (
        <WrappedComponent
          invoices={this.state.invoices}
          vendors={this.state.vendors}
          config={this.state.config}
          {...this.props}
        />
      )
    }
  }

  console.log(`withData${WrappedComponent.name}`);
  withData.displayName = `withData${WrappedComponent.name}`;
  return withData;
}

export default withData;