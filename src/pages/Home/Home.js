import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Tag, Space, Button, Checkbox } from 'antd';

import withVendors from '../../components/FetchData';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

const Home = ({ config, invoices, vendors }) => {
  // console.log(config, invoices, vendors);
  console.log(invoices);
  const [useCredit, setUseCredit] = useState(false);
  const [modalData, setModalData] = useState({
    isOpen: false,
    currentRecord: null,
    credits: null,
  });

  if(!vendors.length || !invoices.length || !config)  {
    return <Loader />
  }

  const basicColumns = config.tableConfig.columns.map(({ fieldName, displayName, sortingEnabled }) => ({
    title: displayName,
    dataIndex: fieldName,
    key: fieldName,
    sorter: sortingEnabled ? (a, b) => a[fieldName] - b[fieldName] : null,
  }));

  const payDues = record => {
    console.log(record);
    const vendorId = record.vendorId;
    const vendor = vendors.find(v => v.vendorId === vendorId);

    setModalData({
      ...modalData,
      isOpen: true,
      currentRecord: record,
      credits: vendor ? vendor.creditBal : 0
    });
  }

  const closeModal = () => {
    setModalData({
      ...modalData,
      isOpen: false,
      currentRecord: null,
      credits: null
    });
  }

  const paymentColumn = {
    title: 'Action',
    key: 'action',
    render: (text, record) => record.amountDue ? (
      <Space size="middle">
        <Button
          type="primary"
          onClick={() => payDues(record)}
          disabled={modalData.isOpen}
        >Pay Due</Button>
      </Space>
    ): null,
  }

  const onChange = () => {
    setUseCredit(!useCredit);
  }

  const allColumns = config.tableConfig.paymentEnabled ? [ ...basicColumns, paymentColumn ]: basicColumns;

  return (
    <React.Fragment>
      <Table columns={allColumns} dataSource={invoices} />
      <Modal isModalOpen={modalData.isOpen}>
        {/* { modalData.isOpen && <ModalContent
          data={modalData.currentRecord}
          closeModal={closeModal}
        /> } */}

        {
          modalData.isOpen && (
            <React.Fragment>
              <h1>Due Amount: ₹{modalData.currentRecord.amountDue}</h1>
              {
                config.tableConfig.adjustable && modalData.credits > 0 && (
                  <React.Fragment>
                    <div>Credits Avaiable:  ₹{modalData.credits}</div>
                    <Checkbox
                      checked={useCredit}
                      onChange={onChange}
                    >
                      {"Use Credits"}
                    </Checkbox>
                    {
                      useCredit && (
                        <div>
                          Net Payable Amount: ₹{
                            (modalData.currentRecord.amountDue - modalData.credits).toFixed()
                          }
                        </div>
                      )
                    }
                  </React.Fragment>
                )
              }

              <FlexContainer>
                <Button
                  style={{marginRight: '8px'}}
                  onClick={closeModal}
                >Cancel</Button>
                <Button type="primary">Pay Now</Button>
              </FlexContainer>
            </React.Fragment>
          )
        }
      </Modal>
    </React.Fragment>
  );
}

const FlexContainer = styled.div`
  display: flex;
  margin-top: 1.7rem;
  justify-content: flex-end;
`;

export default withVendors(Home);


// function ModalContent({ data, closeModal }) {
//   console.log(data);
//   const { amountDue } = data;
//   return (
//     <React.Fragment>
//       <div>Hello World! -  {amountDue}</div>
//       <FlexContainer>
//         <Button
//           style={{marginRight: '8px'}}
//           onClick={closeModal}
//         >Cancel</Button>
//         <Button type="primary">Pay Now</Button>
//       </FlexContainer>
//     </React.Fragment>
//   );
// }
