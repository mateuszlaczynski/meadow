import React, {useState, useEffect} from 'react';
import Base from '../base/Base';
import { useNavigate } from 'react-router-dom';
import { loadCartContent, showCart,checkBackendCart,
    removeFromBackendCart, removeFromCart, minusOneFromCart,
    plusOneFromCart, decrementLocalCart,
    incrementLocalCart, checkCode } from './helper/cartHelper';
import { isAuthenticated } from '../user/helper/userAPICalls';
import { getAllProducts, getFullStock } from './helper/apiCallsHelper';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import Checkout from '../base/Checkout';

const Cart = () => {
    //Products
    const [cart, setCart] = useState([]);
    const [stockQuantity, setStockQuantity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [refresh, setRefresh] = useState(false);
    //Code
    const [codeLoading, setCodeLoading] = useState(false);
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState(false);
    const [codeDiscount, setCodeDiscount] = useState(0);
    //Checkout
    const [checkout, setCheckout] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) {
            checkUsersCart();
        } else {
            checkAnonymousCart();
        };
        setCode('');
        setCodeDiscount(0)
    }, [refresh]);

    useEffect(() => {
        getCodeDiscount(codeDiscount);
    },[codeDiscount])

    const navigate = useNavigate();

    const checkUsersCart = () => {
        const userID = isAuthenticated().user.id;
        checkBackendCart(userID)
        .then(() => {
            loadCartContent(userID)
            .then((data) => {
                setCart(data);
                if (data.length === 0) {
                    setError("Koszyk jest pusty.");
                }
                setLoading(false);
            })
            .catch((error) => console.log(error));
        })
    };

    
    const checkAnonymousCart = () => {
        var tempProducts = showCart();
        var cartView = [];
        getAllProducts()
        .then((productData) => {
            getFullStock()
            .then((stockData) => {
                for (let i = 0; i < tempProducts.length; i++) {
                    for (let y = 0; y < stockData.length; y++) {
                        if (tempProducts[i].id === stockData[y].id) {
                            if (tempProducts[i].amount > stockData[y].quantity) {
                                tempProducts[i].amount = stockData[y].quantity
                                break;
                            }      
                        } 
                    };
                    for (let z= 0; z< productData.length; z++) {
                        if (tempProducts[i].product === productData[z].id) {
                            
                            cartView.push({
                                id: tempProducts[i].id,
                                product: productData[z].id, 
                                name: productData[z].name,
                                thumbnail: productData[z].image,
                                price: productData[z].price,
                                discount_price: productData[z].discount_price,
                                size:tempProducts[i].size,
                                amount:tempProducts[i].amount,
                                slug: productData[z].slug,
                                stock: stockData[i].quantity
                            })
                        }
                    }
                };
                if (cartView.length === 0) {
                    setError("Koszyk jest pusty.");
                };
                setStockQuantity(stockData);
                setCart(cartView);
                setLoading(false);
                localStorage.setItem('cart',JSON.stringify(tempProducts));
            })
            .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error))
    };

    const deleteItem = (item) => {
        if (isAuthenticated()) {
            const user = isAuthenticated()
            removeFromBackendCart(user.user.id, user.token, item.id)
            .then(
                setRefresh(!refresh)
            )
            .catch((error) => console.log(error))
        } else {
            removeFromCart(item);
            setRefresh(!refresh);
        };
    };

    const incrementItem = (item) => {
        if (isAuthenticated()) {
            plusOneFromCart(isAuthenticated(), item.id);
            setRefresh(!refresh);
        } else {
            incrementLocalCart(item)
            setRefresh(!refresh);
        }
    };

    const decrementItem = (item) => {
        if (isAuthenticated()) {
            minusOneFromCart(isAuthenticated(),item.id);
            setRefresh(!refresh);
        } else {
            decrementLocalCart(item)
            setRefresh(!refresh);
        }
    };

    const countPrice = (array) => {
        var price = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i].discount_price) {
                price += array[i].discount_price * array[i].amount
            } else {
                price += array[i].price * array[i].amount
            }
            
        };
        return price;
    };

    const handleChange = (event) => {
        setCode(event.target.value);
    };

    const getCodeDiscount = (discount) => {
        let tempCart = cart;
        tempCart.map((item) => {
            if (!item.discount_price) {
                item.discount_price = Math.ceil(item.price * (100-discount)/100)
            };
        })
        setCart(tempCart);
    };

    const submitCode = (input) => {
        setCodeLoading(true);
        checkCode(input)
        .then((data) => {
            if (data.error) {
                setCodeError(true);
                setCodeLoading(false);
                console.log(data)
            } else if (data.success) {
                setCodeError(false);
                setCodeDiscount(data.success);
                setCodeLoading(false);
            }
        })
        .catch((error) => console.log(error))
        
    };

    const displayCartItems = () => {
        return (
        cart.map((item, index) => {
            return (
                    <tr key={index}>
                    <td className="pointer-hover w-25" onClick={() => navigate(`/detail/${item.slug}`)}>
                        <img src={item.thumbnail} className="img-fluid img-thumbnail"
                        style={{maxHeight:100}} alt={item.name}/>
                    </td>
                    <td className="pointer-hover" style={{maxWidth:300}}
                    onClick={() => navigate(`/detail/${item.slug}`)}>{item.name}</td>
                    <td>{item.size}</td>
                    <td style={{minWidth:8}}>
                        <button 
                            className='cart-plus-minus-buttons'
                            onClick={() => decrementItem(item)}>-</button>
                        {item.amount}
                        <button
                            className='cart-plus-minus-buttons'
                            onClick={() => incrementItem(item)}>+</button>
                        </td>
                    {item.discount_price ? <>
                        <td style={{minWidth:70}}>
                                <div style={{color:'red', textDecoration:"line-through"}}>{item.price * item.amount} zł</div>
                                {item.discount_price * item.amount} zł 
                        </td>
                    </> : <>
                        <td style={{minWidth:70}}>{item.price * item.amount} zł</td>
                    </>}
                    
                    <td><button className='delete-button'
                     onClick={() => deleteItem(item)}>
                         <FontAwesomeIcon icon={faCircleMinus} />
                    </button></td>
                    </tr>
            )
            })
        )
    };

    const renderCart = () => {
        return (            
        <div className="row">
            <div className="col-12 col-xl-8">
                {error && <h1>Koszyk jest pusty!</h1>}
                {!error && <>
                    <table className="table align-middle" style={{fontSize:20}}>
                    <tbody>
                        {displayCartItems()}
                    </tbody>
                    </table>  
                </>}

            </div>
            <div className='col-12 col-xl-4'>
                <div className="card my-2">
                    <div className="card-body">
                        <h1 className="card-title">Kod rabatowy:</h1>
                        <div style={{textAlign:'center'}}>
                            {codeDiscount === 0 ? <>
                                {codeLoading ? <>
                                    <div className='loading'></div>
                                </> : <>
                                    <input name="code"
                                        value={code}
                                        onChange={handleChange}
                                        type="text" className='form-control mx-1 my-1'>
                                    </input>
                                    {code.length > 0 ? <button onClick={() => submitCode(code)} 
                                    className='checkout-button'>Sprawdź</button> : <button disabled 
                                    className='checkout-button'>Sprawdź</button>}

                                </>}

                            </> : <>
                                <input name="code"
                                    value={code}
                                    readOnly
                                    type="text" className='form-control mx-1 my-1'>
                                </input>
                                <button disabled
                                className='checkout-button'>Sprawdź</button>
                            </>}
                                {codeError && <p style={{
                                    color:"red",
                                    textAlign:'center',
                                    marginTop:15,
                                    fontWeight: "bold"
                                }}>Błędny kod!</p>}
                        </div>
                    </div>
                </div>
                <div className="card my-2">
                    <div className="card-body">
                        <h1 className="card-title">Do zapłaty: {countPrice(cart)}zł</h1>
                        <div style={{textAlign:'center'}}>
                        <button onClick={() => navigate('/produkty')} 
                            className='checkout-button'>Kontynuuj zakupy</button>
                            {cart.length > 0 ? <button className='checkout-button'
                            onClick={() => setCheckout(true)}>
                                Dostawa i płatność
                            </button> : <button disabled className='checkout-button'>
                                Dostawa i płatność
                            </button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )};

    return <Base title="Meadow | Koszyk" container={true}>
        {loading && <div className='loading'></div>}
        {!loading && !checkout && renderCart()}
        {!loading && checkout && <>
            <Checkout 
                cart={cart}
                totalPrice={countPrice(cart)} 
                code={code}
            />
            </>}

    </Base>;
}

export default Cart;