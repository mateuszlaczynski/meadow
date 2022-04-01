import React from 'react';
import './styles/BaseStyles.css'
import MyNavbar from './MyNavbar';
import Footer from './Footer';

const Base = ({title, children, container}) => {
  document.title = title
    return (<>
      <MyNavbar/>
      {container && <div className='container my-3'>{children}</div>}
      {!container && <div>{children}</div>}
      
      <Footer/>
      </>);
}
export default Base;