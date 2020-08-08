import React from 'react';
import styled from 'styled-components';

import puffSvg from '../images/puffLoader.svg';

function Loader(props) {
  return (
    <Container>
      <img src={puffSvg} alt="loading..." />
    </Container>
  )
}

export default Loader;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;