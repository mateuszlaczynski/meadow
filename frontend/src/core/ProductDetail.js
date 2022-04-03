import React, {useState, useEffect} from 'react';
import Base from '../base/Base';
import { getProductDetail, getProductStock,
getProductImages, getRecommendedProducts } from './helper/apiCallsHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from './helper/cartHelper';
import { isAuthenticated } from '../user/helper/userAPICalls';
import '../base/styles/Buttons.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Error from '../base/Error';
import Recommended from '../base/Recommended';

const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const [productImages, setProductImages] = useState([]);
    const [stock, setStock] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [chosenSize, setChosenSize] = useState({});
    const [amount, setAmount] = useState(1);
    const [outOfStock, setOutOfStock] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const { slug } = useParams()

    useEffect(() => {
        loadProduct(slug)
    }, [slug]);

    const loadProduct = (slug) => {
        getProductDetail(slug)
        .then((productData) => {
            if (productData.length < 1) {
                setError(true);
                setLoading(false);
            } else {
                setProduct(productData);
                getProductStock(productData.id)
                .then((stockData) => {
                    if (stockData.length < 1) {
                        setOutOfStock(true);
                        setLoading(false);
                    } else {
                        setStock(stockData);
                        setLoading(false);
                        setChosenSize(stockData[0]);
                    }
                })
                .catch((error) => console.log(error))
                
                getProductImages(productData.id)
                .then((imagesData) => {
                setProductImages(imagesData)
                 })
                .catch((error) => console.log(error))

                getRecommendedProducts(productData.id)
                .then((recommendedData) => {
                    setRecommendedProducts(recommendedData)
                })
                .catch((error) => console.log(error))
            }
        })
        .catch((error) => console.log(error))
    };

    const handleChange = (event) => {
        const size = event.target.value;
        const filteredSize = stock.filter((object) => object.size === size);
        setChosenSize(filteredSize[0]);
        setAmount(1);
    }

    //AKA "Wybierz rozmiar" function
    const choseSize = (array) => {
        return (<>
             <form style={{marignBottom:"10px"}}>
                <label style={{marginRight: "10px", fontSize:22, color:"black"}}>
                    Wybierz rozmiar:
                </label>
                <select style={{width:150}} className='select-product' onChange={handleChange}>
                    {array.map((object) => {
                    return (
                        <option className='select-product-option' key={object.size} 
                        value={object.size}>{object.size}</option>
                    )
                    })}
                </select>
            </form>
            <br/>
        </>)
    };
    
    //Może być dodatnia i ujemna
    const amountButtons = (value) => {
        const tempAmount = parseInt(amount,10) + value;
        if (tempAmount >= 1 && tempAmount <= chosenSize.quantity) {
                setAmount(tempAmount);
        }
    };

    const amountInput = (event) => {
        if (!isNaN(event.target.value)) {
            let tempAmount = parseInt(event.target.value);
            if (tempAmount < 1) {
                tempAmount = 1
            }
            if ( tempAmount > chosenSize.quantity) {
                tempAmount = chosenSize.quantity
            }
            setAmount(tempAmount);
        }
        
    };

    const addToCartPanel = () => {
        return (
            <div className='add-to-cart-panel'>
                {product.discount_price ? <>
                    <h1 style={{fontStyle:"italic"}}>{product.name}: <br/><i style={{textDecoration:"line-through"}}>
                        {product.price} zł</i> <i style={{color:'darkRed'}}>{product.discount_price} zł <br/>
                        - {Math.round(((product.price - product.discount_price)/product.price)*100)}% OFF</i>
        </h1>
                </> : <>
                    <h1 style={{fontStyle:"italic"}}>{product.name}: <br/>{product.price} zł</h1>
                </>}

                {outOfStock ? <>
                    <h2>Obecnie brak na stanie.</h2>
                </> : <>
                    {choseSize(stock)}
                    {amount === 1 ? 
                    <button className='plus-minus-buttons' 
                    disabled onClick={() => amountButtons(-1)}>-</button> 
                        :
                    <button className='plus-minus-buttons' 
                    onClick={() => amountButtons(-1)}>-</button>
                    }
                                
                    <input className="amount-input" 
                    onChange={amountInput} name="amount" value={amount}></input>
                    {amount === chosenSize.quantity ? 
                    <button className='plus-minus-buttons' 
                    disabled onClick={() => amountButtons(1)}>+</button>
                        :
                    <button className='plus-minus-buttons' 
                    onClick={() => amountButtons(1)}>+</button>
                    }
                    <br/>

                    {isAuthenticated() ? <>
                    <button className='add-to-cart-button' onClick={() => {
                        addToCart(amount, chosenSize, isAuthenticated(), () => navigate('/koszyk'))
                        .then(() => navigate('/koszyk'))
                    }}>
                        Dodaj do koszyka
                    </button>
                    </> : <>
                    <button className='add-to-cart-button' onClick={() => {
                        addToCart(amount, chosenSize, isAuthenticated(), () => navigate('/koszyk'))
                        }}>
                        Dodaj do koszyka
                    </button>
                    </>}

                </>}
               
            </div>
        )
 
    }

    const carousel = (images) => {
        return (
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                stopOnHover={false}
                showArrows={false}
                showIndicators={false}
                interval={8000}
                showStatus={false}
            >
              {images.map(image => <div key={image.id}>
                  <img className='img-fluid'
                  alt={image.reference_name} src={image.image}></img>
                  </div>)}
            </Carousel>
          )     
    }

    return <Base title={`Meadow | ${product.name}`} container={true}>
        {loading && <div className='loading'></div>}
        {error && <Error errorMessage="Błąd ładowania strony, spróbuj ponownie!"/>}
        {!loading && <>
        <div className='row'>
            <div className='col-12 col-lg-7'>
                <div className='datail-thumbnail-container'>
                    <img className='img-fluid' style={{maxHeight:700}}
                     alt={product.name} src={product.image}></img>
                </div>
                
            </div>
            <div className='col-12 col-lg-5 my-auto' style={{height:450}}>
                {addToCartPanel()}
            </div>
        </div>
        <div style={{marginTop:"10px"}} className='row'>
            <div className='col-12 col-lg-7 my-auto'>
               <p className='mx-4' style={{fontSize:23, textAlign:'justify'}}>{product.description}</p>
            </div>
            <div className='col-12 col-lg-5'>
                <img className='img-fluid' style={{maxHeight:600}}
                alt={product.name} src={product.image}></img>
            </div>
        </div>
        {productImages.length > 0 && carousel(productImages)}
        <br/>
        <h2>Zobacz Również:</h2>
        <div className='row'>
            {recommendedProducts.map((product) => {
                return (
                    <Recommended product={product} key={product.id}/>
                )
            })}

        </div>
        </>}
    </Base>;
}
export default ProductDetail;