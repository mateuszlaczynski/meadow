import React from 'react'

const Success = ({orderId, price, shipmentFee}) => {
  return ( <>
    <h1 style={{textAlign:'center',}}>Zamówienie zostało wygenerowane!</h1>
    <p>Aby dokończyć transakcję proszę wykonać przelew na podane dane:</p>
    <p>
        Imie: <br/>
        Nazwisko: <br/>
        Numer konta: <br/>
        Tytuł: {orderId} <br/>
        Kwota: {parseFloat(price) + parseFloat(shipmentFee)}zł 
        {shipmentFee > 0 
        ? 
        <> (w tym wliczone {shipmentFee}zł przesyłka)</> 
        :
        <> (w tym darmowa przesyłka)</>}<br/>
    </p>
    </>)
}
export default Success;