import React from 'react'
import { useNavigate } from 'react-router-dom';

const Recommended = ({product}) => {
    
    const navigate = useNavigate();

    return (
        <div 
        onClick={()=>{
            navigate(`/detail/${product.slug}`)
            window.scrollTo(0, 0)
        }}
        className='recommended-card col-12 col-sm-6 col-lg-3'>
            <img className='img-fluid' alt={product.name} src={product.image}></img>
            {product.discount_price ? <h6>
                {product.name}: <i style={{textDecoration:"line-through"}}>{product.price} zł</i>
                <i style={{color:'red'}}> {product.discount_price} zł</i>
                </h6>
            : <h6>{product.name}: <i>{product.price}</i> zł</h6> }
            
        </div>
  );
};

export default Recommended;