import React from 'react'
import Base from '../base/Base'
import onDemand1 from '../base/images/onDemand1.png'
import onDemand2 from '../base/images/onDemand2.png'

const OnDemand = () => {
  return (
    <Base title='Meadow | Więcej o nas' container={true}>
    <div style={{marginTop:"10px"}} className='row'>
        <div className='col-12 col-lg-5'>
            <img className='img-fluid' style={{maxHeight:600}}
            alt="Placeholder" src={onDemand1}></img>
        </div>
        <div className='col-12 col-lg-7 my-auto'>
           <p className='mx-4' style={{fontSize:28, textAlign:'justify'}}>
            Stroje koszykarskie: komplety koszykarskie i koszulki rozgrzewkowe
            Dzianina polyester 100%, gramatura 200g/m2, sublimacja najwyższej jakości.
            Cena: od 125,00 zł za komplet,
            od 65,00 zł za koszulkę. W sprawie zamówienia prosimy o kontakt telefonicznny lub mailem.
           </p>
        </div>
    </div>

  <div style={{marginTop:"50px"}} className='row'>
        <div className='col-12 col-lg-7 my-auto'>
           <p className='mx-4' style={{fontSize:28, textAlign:'justify'}}>
            Stroje koszykarskie: komplety koszykarskie i koszulki rozgrzewkowe
            Dzianina polyester 100%, gramatura 200g/m2, sublimacja najwyższej jakości.
            Cena: od 125,00 zł za komplet. W sprawie zamówienia prosimy o kontakt telefonicznny lub mailem.
           </p>
        </div>
        <div className='col-12 col-lg-5'>
            <img className='img-fluid' style={{maxHeight:600}}
            alt="Placeholder" src={onDemand2}></img>
        </div>
    </div>
    </Base>
  );
};

export default OnDemand;