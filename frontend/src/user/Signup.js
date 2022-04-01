import React, { useState, useEffect } from 'react'
import Base from '../base/Base'
import { signup, isAuthenticated } from './helper/userAPICalls'
import { useNavigate } from 'react-router'

const Signup = () => {
    //Send mail when account created
    const [values, setValues] = useState({
        email:"",
        password2:"",
        password:"",
        newsletter: false
    });
    const [error, setError] = useState([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/');
        }
    }, [])

    const {email,password,password2, newsletter} = values

    const validateEmail = (email) => {
        return email.match(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        );
      };

    const onSubmit = (event) => {
        event.preventDefault();
        setError([]);
        if (password.length >= 8 && password === password2 && validateEmail(email)) {
            signup({email, password, newsletter})
            .then((data) => {
                if (data.email === email) {
                        setValues({
                            ...values,
                            name:"",
                            email:"",
                            password:"",
                        })
                        navigate("/login")
                    }
            })
            .catch((error) => console.log(error))  
        } else {
            if (email.length === 0) {
                setError(list => [...list,"Pole \"Email\" jest wymagane!"]);
            };
            if (email.length > 0 && !validateEmail(email)) {
                setError(list => [...list,"Nie poprawny format \"Email\"!"]);
            };
            if (password.length === 0) {
                setError(list => [...list,"Pole \"Hasło\" jest wymagane!"]);
            };
            if (password.length < 8 && password.length > 0) {
                setError(list => [...list,"Hasło musi mieć przynajmniej 8 znaków!"]);
            };
            if (password.length > 0 && password2.length > 0 && password !== password2) {
                setError(list => [...list,"Podane hasła nie są tożsame!"]);
            };
            if (password2.length === 0) {
                setError(list => [...list,"Pole \"Powtórz Hasło\" jest wymagane!"]);
            };
            console.log(error)
        };
    };

    const handleChange = (field) =>
        (event) => {
            setValues({...values, [field]: event.target.value})
    };

    const signUpForm = () => {
        return (
            <div className="row justify-content-md-center my-3">
                <div className='card p-2 col-6'>
                <h2>Zarejestruj się</h2><hr/>
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
                    <div style={{marginTop:10}}>
                    <label>*Powtórz Hasło:</label>
                    <input
                        className="form-control"
                        name="password2"
                        value={password2}
                        onChange={handleChange("password2")}
                        type="password"
                    />
                    </div>
                    <div style={{marginTop:15}}>
                    <input
                        className="form-check-input"
                        name="newsletter"
                        value={newsletter}
                        onClick={() => setValues({...values, newsletter:!newsletter})}
                        type="checkbox"
                    />
                    <label style={{marginLeft:5}}>Zapisz mnie do programu
                    Meadow Membership.</label>
                    </div>
                    {error && error.map((message, index) => {
                        return (
                            <p key={index}  className='error-text'>{message}</p>
                        )
                    })}
                    <button
                    className='checkout-button' 
                    style={{ marginTop:15 }}
                    onClick={onSubmit}
                    >
                    Zarejestruj Się
                    </button>
                    <p>* pola wymagane</p>
                </form>
            </div>
           </div>
           )
       }

    return <Base title="Meadow | Rejestracja">
        {signUpForm()}
    </Base>;
}
export default Signup;