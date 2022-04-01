import React, {useState, useEffect} from 'react'
import { newsletterSignUp } from './helper/userAPICalls'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from './helper/userAPICalls';
import Base from '../base/Base';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/panel-uzytkownika')
        }
    },[]);

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        newsletterSignUp(email)
        .then((data) => {
            console.log(data)
            if (data.error) {
                setError(data.error);
            };
            if (data.success) {
                setSuccess(data.success);
            }
        })
        .catch((error) => console.log(error));
    };

    return (
        <Base title={"Meadow | Newsletter"} container={true}>
            
            <div className="row justify-content-md-center my-3">
                <div className='col-12 col-lg-6'>
                    <h2>Meadow Membership</h2><hr/>
                    <p style={{textAlign:'justify', fontSize:26}}>
                        Program członkowski Meadow Membership udostępni Tobie dostęp do
                        najnowszych promocji, dzięki dowiesz się również o najnowszych
                        ofertach w pierwszej kolejności. Członkowstwo w programie jest
                        darmowe i w każdym momencie można z niego zrezygnować.
                    </p>
                    </div>
                    <div className='col-1'></div>
                <div className='card p-2 col-10 col-lg-4 my-5'>
                    <form className="form-group">
                        <div>
                        {!success && <>
                        <h2>Zapisz się:</h2><hr/>
                        <label>*Email:</label>
                        <input
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            type="email"
                        />
                        
                        </>}
                        {success &&<p style={{
                                color:"green",
                                textAlign:'center',
                                marginTop:15,
                                fontWeight: "bold"
                            }}>{success}</p>}
                        </div>
                        {error && <p style={{
                                color:"red",
                                textAlign:'center',
                                marginTop:15,
                                fontWeight: "bold"
                            }}>{error}</p>}
                        
                        {!success &&
                        <button
                            className='checkout-button' 
                            style={{ marginTop:15 }}
                            onClick={onSubmit}
                        >
                        Wyślij
                        </button>
                        }
                        {success &&
                        <button
                            disabled
                            className='checkout-button' 
                            style={{ marginTop:15 }}
                            onClick={onSubmit}
                        >
                        Zapsiz Się
                        </button>
                        }
                        <p>* pola wymagane</p>
                    </form>
                </div>
                </div>
        </Base>
    )
};
export default Newsletter;