import React from 'react';
import Base from '../base/Base';
const About = () => {
  return <Base title='Meadow | Więcej o nas' container={true}>
        <div style={{marginTop:"10px"}} className='row'>
            <div className='col-12 col-lg-5'>
                <img className='img-fluid' style={{maxHeight:600}}
                alt="Placeholder" src="https://via.placeholder.com/500"></img>
            </div>
            <div className='col-12 col-lg-7 my-auto'>
               <p className='mx-4' style={{fontSize:28, textAlign:'justify'}}>
               Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
               Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
               natoque penatibus et magnis dis parturient montes, nascetur 
               ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. 
               Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate 
               </p>
            </div>
        </div>

      <div style={{marginTop:"50px"}} className='row'>
            <div className='col-12 col-lg-7 my-auto'>
               <p className='mx-4' style={{fontSize:28, textAlign:'justify'}}>
               Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
               Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
               natoque penatibus et magnis dis parturient montes, nascetur 
               ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. 
               Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate 
               </p>
            </div>
            <div className='col-12 col-lg-5'>
                <img className='img-fluid' style={{maxHeight:600}}
                alt="Placeholder" src="https://via.placeholder.com/500"></img>
            </div>
        </div>
  </Base>;
};

export default About;