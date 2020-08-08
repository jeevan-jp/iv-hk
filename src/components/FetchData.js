import React from 'react';
import Axios from 'axios';
import endPoint from '../utils/baseUrl';

const withData = WrappedComponent => {
  class withData extends React.Component {
    state = {
      invoices: [],
      vendors: [],
      config: null,
    }

    componentDidMount() {
      this.fetchData();
    }

    fetchData = () => {
      this.fetchConfig()
        .then(async result => {
          const { success, config } = result;
          if(success) {
            this.setState({ config });

            // parallel calls
            const { invoices } = await this.fetchInvoices();
            const { vendors } = await this.fetchVendors();

            this.setState({ invoices, vendors });
          } else {
            // request failed
          }
        })
        .catch(err => {
          console.log('something went wrong', err);
        })
    }

    fetchConfig = async () => {
      const { data: config } = await Axios.get(`${endPoint}/config`);
      return { success: true, config };
    }

    fetchInvoices = async () => {
      const { data } = await Axios.get(`${endPoint}/invoices`);
      return { invoices: data };
    }

    fetchVendors = async () => {
      const { data } = await Axios.get(`${endPoint}/vendors`);
      return { vendors: data };
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