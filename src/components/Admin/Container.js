import React from 'react';
import styled from '@emotion/styled';

const Container = (props) => {
  return (
    <StyledContainer>
        {props.children}
    </StyledContainer>
  )
}

export default Container;

const StyledContainer = styled.main`
    margin-top: 60px;

    > h1 {
        margin: 0 0 18px;
        font-weight: 600;
        font-size: 34px;
    }
`

