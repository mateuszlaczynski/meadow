import React, { useState, useEffect } from 'react'
import Base from '../base/Base';
import { signin, authenticate, isAuthenticated } from './helper/userAPICalls';
import { useNavigate } from "react-router-dom"
import { loadCartContent } from '../core/helper/cartHelper';

const Signin = () => {
    //Forgot Password
    const [values, setValues] = useState({
        email:"",
        password:"",
    });
    const [error, setError] = useState('')

    const navigate = useNavigate();
    
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/');
        }
    }, []);

    const { email, password } = values;

    const handleChange = (field) =>
        (event) => {
            setValues({...values, [field]: event.target.value});
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (email.length === 0 || password.length === 0) {
            if (email.length === 0) {
                setError("Pole \"Email\" jest wymagane!")
            };
            if (password.length === 0) {
                setError("Pole \"Hasło\" jest wymagane!")
            };
            if (password.length === 0 && email.length === 0) {
                setError("Pola \"Email\" i \"Hasło\" są wymagane!")
            };
        } else {
            signin({email, password})
            .then((data) => {
                setError(data.error);
                if (data.token) {
                    localStorage.removeItem("cart");
                    authenticate(data, () => {
                        setValues({...values})
                        navigate("/")
                    });
                };
            })
            .catch((error) => console.log(error))
        };
    };

    const signInForm = () => {
        return (
            <div className="row justify-content-md-center my-3">
                <div className='card p-2 col-6'>
                    <h2>Zaloguj się</h2><hr/>
                    <form className="form-group">
                        <div>
                        <label>*Email:</label>
                        <input
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={handleChange("email")}
                            type="email"
                        />
                        </div>
                        <div style={{marginTop:10}}>
                        <label>*Hasło:</label>
                        <input
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={handleChange("password")}
                            type="password"
                        />
                        </div>
                        {error && <p className='error-text'>{error}</p>}
                        <button
                            className='checkout-button' 
                            style={{ marginTop:15 }}
                            onClick={onSubmit}
                        >
                        Zaloguj Się
                        </button>
                        <p>* pola wymagane</p>
                    </form>
                </div>
                <p style={{marginTop:15, textAlign:"center"}}>Nie posiadasz konta? 
                        <button onClick={() => navigate('/rejestracja')}
                         className="check-sizes-link-button">Zarejestruj się!</button>
                </p>
            </div>
            
        );
    };

  return <Base title="Meadow | Zaloguj się">
      {signInForm()}
  </Base>;
}
export default Signin;