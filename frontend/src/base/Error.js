import React from 'react';
import Base from './Base';
import './styles/BaseStyles.css'

const Error = ({errorMessage}) => {
  return <Base container={true}>
    <h1>{errorMessage}</h1>
  </Base>;
}
export default Error;