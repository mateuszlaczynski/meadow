import React, {useState, useEffect} from 'react'
import Base from '../base/Base'
import Card from '../base/Card';
import { getAllProducts } from './helper/apiCallsHelper';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sliderValue, setSliderValue] = useState(100);
    const [topPrice, setTopPrice] = useState(0)

    useEffect(() => {
      loadProducts();
    }, []); 

    const loadProducts = () => {
      getAllProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    };

  return (
    <Base title="Meadow | Produkty" container={true}>
        {loading && <div className='loading'></div>}
        {!loading && <>
              <div className='row'>
              {products.map((product, index) =>{
                      return (
                        <Card product={product} key={index}/>
                      )
                    })}
            </div>
          
        </>}
    </Base>
  )
}

export default Products;