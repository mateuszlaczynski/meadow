import React from 'react'

const Success = ({orderId, price, shipmentFee}) => {
  return ( <>
    <h1 style={{textAlign:'center',}}>Zamówienie zostało wygenerowane!</h1>
    <h2><i>Aby dokończyć transakcję proszę wykonać przelew na poniższe dane:</i></h2><hr/>
    <p style={{fontSize:32}}>
        Odbiorca: Mateusz Łączyński <br/>
        Numer konta: 68 1020 1055 0000 9402 0358 9777 <br/>
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