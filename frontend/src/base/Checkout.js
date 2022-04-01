import React, {useState, useEffect} from 'react'
import { isAuthenticated } from '../user/helper/userAPICalls';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCreditCard} from "@fortawesome/free-solid-svg-icons"
import payU from './images/payu.png'
import { generateOrder, clearCart, clearUsersProducts } from './helper/checkoutHelper';
import Success from './Success';

const Checkout = ({cart, totalPrice, code}) => {
    const [values, setValues] = useState({
        email: '',
        city:'',
        adress:'',
        postalCode:'',
        phone:'',
        firstName:'',
        lastName:'',
        message:'',
        price: totalPrice,
        code: code,
        shipmentFee:0,
        shipmentMethod:'',
        lockerId:'',
        cart:'',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successValues, setSuccessValues] = useState({
        orderId:"",
        price:0,
        shipmentFee:0
    })

    const {email, city, adress, postalCode, phone,
            firstName, lastName, message,
            shipmentFee, shipmentMethod, lockerId} = values;

    useEffect(() => {
        if (isAuthenticated()) {
            let item_names = '';
            for (let i=0; i<cart.length; i++) {
                item_names = `${cart[i].name}: ${cart[i].size} x ${cart[i].amount}, ${item_names}`
            };
            setValues({...values, cart:item_names, email:isAuthenticated().user.email});
        } else {
            let item_names = '';
            for (let i=0; i<cart.length; i++) {
                item_names = `${cart[i].name}: ${cart[i].size} x ${cart[i].amount}, ${item_names}`
            };
            setValues({...values, cart:item_names});    
        }
    },[])

    const handleChange = (field) =>
    (event) => {
        setValues({...values, [field]: event.target.value})
    };

    const handleRadio = (event) => {
        setValues({
            ...values,
            shipmentFee:event.target.value,
            shipmentMethod: event.target.id
        });
    };

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const validatePhone = (phone) => {
        return String(phone)
          .toLowerCase()
          .match(
            /^\d{9}$/
        );
      };

    const submitWithBankTransfer = () => {
        if ((!isAuthenticated() && !email) || !city || !adress || !postalCode ||
        !phone || !firstName || !lastName || !shipmentMethod ||
         (shipmentMethod == "inPost" && lockerId.length<3)) {
            setError("Wszystkie wymagane pola muszą zostać uzupełnione!");
        } else if (!validateEmail(email)) {
            setError("Błędny format email!")
        } else if (!validatePhone(phone)){
            setError("Błędny format numeru telefonu!")
        } else {

            setLoading(true)

            generateOrder(values)
            .then((data) => {
                setSuccessValues({
                    orderId:data.id,
                    price:data.price,
                    shipmentFee:data.shipment_fee 
                });

                if(!isAuthenticated()) {
                    clearCart();
                } else {
                    clearUsersProducts(isAuthenticated().user.id);
                };

                setSuccess(true);
                setLoading(false);
            })
            .catch((error) => console.log(error))
        };
    };
    return ( <>
        {loading && <div className='loading'></div>}
        {!loading && !success && <>
                <h1>Dane do wysyłki:</h1>
        <hr/>
        <div className='row'>
            {!isAuthenticated() && 
            <div className='col-12'>
                <label>*Email</label>
                <input
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={handleChange("email")}
                    type="email"
                /> 
            </div>}
            <div className='col-12 col-lg-6'>
                <label>*Miejscowośc:</label>
                    <input
                        className="form-control"
                        name="city"
                        type="text"
                        value={city}
                        onChange={handleChange("city")}
                />
            </div>
            <div className='col-12 col-lg-6'>
                <label>*Adres:</label>
                    <input
                        className="form-control"
                        name="adress"
                        type="text"
                        value={adress}
                        onChange={handleChange("adress")}
                />
            </div>
            <div className='col-12 col-lg-6'>                            
                <label>*Kod Pocztowy:</label>
                    <input
                        className="form-control"
                        name="postalCode"
                        type="text"
                        value={postalCode}
                        onChange={handleChange("postalCode")}
                />
            </div>
            <div className='col-12 col-lg-6'>            
            <label>*Telefon:</label>
                    <input
                        className="form-control"
                        name="phone"
                        type="text"
                        value={phone}
                        onChange={handleChange("phone")}
                />
            </div>
            <div className='col-12 col-lg-6'>            
                <label>*Imię:</label>
                    <input
                        className="form-control"
                        name="firstName"
                        type="text"
                        value={firstName}
                        onChange={handleChange("firstName")}
                /> 
            </div>
            <div className='col-12 col-lg-6'>            
            <label>*Nazwisko:</label>
                    <input
                        className="form-control"
                        name="lastName"
                        type="text"
                        value={lastName}
                        onChange={handleChange("lastName")}
                />
            </div>
            <div className='col-12'>            
                <label>Uwagi do zamówienia:</label>
                    <textarea 
                        className="form-control"
                        name="message"
                        type="text"
                        value={message}
                        onChange={handleChange("message")}
                />
            </div>                                                   
        </div>
            <br/>
            <h3>*Sposób nadania</h3>
            <hr/>
        <div>
            {totalPrice >= 150 ? <>
                <p>Do zapłaty : {totalPrice} zł
                + darmowa przesyłka</p> 
                <div>
                    <input type="radio" onChange={handleRadio}
                        name="shipment" id="Poczta Polska" value={0}/>
                    <label style={{marginLeft:5}}>Poczta Polska (na powyższy adres)</label>
                </div>
        
                <div>
                    <input type="radio" onChange={handleRadio}
                        name="shipment" id="inPost" value={0}/>
                    <label style={{marginLeft:5}}>inPost</label>
                        
                    {shipmentMethod == "inPost" && <div style={{marginLeft:10}}>
                        <label>*Podaj numer paczkoamtu:</label>
                        <input maxLength="10" type="text" className='form-control'
                         onChange={handleChange("lockerId")} style={{width:"15%"}}/>
                    </div>}
        
                </div>  
            </> : <>
                <p>Do zapłaty : {totalPrice} zł
                + dostawa (brakuje {150-totalPrice} zł do darmowej wysyłki)</p>
                
                <div>
                    <input type="radio" onChange={handleRadio}
                    name="shipment" id="Poczta Polska" value={13}/>
                    <label style={{marginLeft:5}}>Poczta Polska - 13.00 zł (na powyższy adres)</label>
                </div>

                <div>
                    <input type="radio" onChange={handleRadio}
                    name="shipment" id="inPost" value={12.99}/>
                    <label style={{marginLeft:5}}>inPost - 12.99 zł</label>
                    
                    {shipmentMethod == "inPost" && <div style={{marginLeft:10}}>
                        <label>*Podaj numer paczkoamtu:</label>
                        <input maxLength="10" type="text" className='form-control'
                        onChange={handleChange("lockerId")} style={{width:"15%"}}/>
                    </div>}

                </div>
            </>}  
        </div>

        <br/>
        <h3>*Metoda Płatności (zostaniesz przekierowany dalej)</h3>
        <hr/>       

        <div className='row'>
            <div className='col-1'>
                    <button className='payment-button' onClick={submitWithBankTransfer}>
                        Przelew Bankowy<FontAwesomeIcon icon={faCreditCard}/>
                    </button>
            </div>
            <div className='col-1'>
                    <button disabled className='payment-button'>
                        Wkrótce...<img width={95} src={payU}></img>
                    </button>
            </div>
        </div>


        <div style={{clear:"both",height:20}}>
            {error &&
                <h3 style={{color:"red", textAlign:'center'}}>
                    {error}
                </h3>
            }

            <p style={{float:"right"}}>*pole wymagane</p>
        </div>

        </>}

        {!loading && success && <Success 
            orderId={successValues.orderId}
            price={successValues.price}
            shipmentFee={successValues.shipmentFee} />}
        </>)
  };

export default Checkout;