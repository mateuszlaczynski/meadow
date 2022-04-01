import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/CardStyles.css'

const Card = ({product}) => {
  
    const navigate = useNavigate();

    return (
    <div className='custom-card col-12 col-md-6 col-xl-4' onClick={() => navigate(`/detail/${product.slug}`)}>
        <img 
          src={product.image}
          className="img-fluid"
          alt={product.name}
          style={{borderBottom:"2px solid black", borderRadius:"5px"}}/>
          
        <p className='custom-card-text'>{product.name}</p>

        {product.discount_price ? <>
        <p className='custom-card-text-crossed'>{product.price} zł </p>
        <p className='custom-card-text' style={{color:'darkRed'}}>{product.discount_price} zł
        - {Math.round(((product.price - product.discount_price)/product.price)*100)}% OFF</p>
        </> : <p className='custom-card-text'>{product.price} zł</p>}  
        
    </div>
  )
}
export default Card;