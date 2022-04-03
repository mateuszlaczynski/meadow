import React, {useEffect, useState} from 'react'
import { sendMail } from './helper/apiCallsHelper'
import { isAuthenticated } from '../user/helper/userAPICalls'
import { useNavigate } from 'react-router-dom'
import Base from '../base/Base'
import "./styles/CoreStyles.css"

const Contact = () => {
    const [values, setValues] = useState({
      email:"",
      message:"",
    });
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isAuthenticated()) {
            setValues({...values, email:isAuthenticated().user.email})   
        }
    }, [success, loading]);

    const navigate = useNavigate();

    const { email, message } = values;

    const handleChange = (field) =>
    (event) => {
        setValues({...values, [field]: event.target.value})
    };

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const onSubmit = (event) => {
        event.preventDefault();
        if (validateEmail(email)) {
            setLoading(true);
            const body = `${email}: ${message}`;
            sendMail(body)
            .then((data) => {
                console.log(data)
                setSuccess(true);
                setLoading(false);
            })
            .catch((error) => console.log(error));
        } else {
            setError("Błędny format email, spróbuj ponownie!")
            console.log(error)
        }

    };

    return (
    <Base title="Meadow | Kontakt" container={true}>
        <div className="row">
            <div className='col-12 col-xl-8'>
                {loading && <div className='loading'></div>}
                {!success && !loading && <>
                <h1>Masz pytanie? Może już mamy odpowiedź!
                    sprawdź <button onClick={() => navigate('/faq')}
                        className="check-sizes-link-button">tutaj
                    </button>.
                </h1>
                <hr/>
                <h2>Formularz kontaktowy:</h2>
                <form className="form-group">
                    {!isAuthenticated() &&
                    <div>
                    <label>*Email:</label>
                    <input
                        className="form-control"
                        onChange={handleChange("email")}
                        value={email}
                        name="email"
                        type="email"
                    />
                    </div>
                    }
                    <div style={{marginTop:10}}>
                    <label>*Wiadomość:</label>
                    <textarea 
                        className="form-control"
                        onChange={handleChange("message")}
                        value={message}
                        name="text"
                        type="text"
                        style={{height:250}}
                    />
                    </div>
                    {email && message ? <>
                        <button
                        className='checkout-button' 
                        style={{ marginTop:15 }}
                        onClick={onSubmit}
                        >
                        Wyślij
                        </button>                    
                    </> : <>
                        <button
                            disabled
                            className='checkout-button' 
                            style={{ marginTop:15 }}
                            onClick={onSubmit}
                        >
                        Wyślij
                        </button>
                    </>}
                    {error && <p className='error-text'>{error}</p>}
                    <p>* pola wymagane</p>
                </form>
                </>}
                {success && !loading &&
                <h1>Dziękujemy za Twoją wiadomość, skontaktujemy się z tobą!</h1>
                }               
            </div>
            <div className='col-12 col-xl-4 my-5' style={{textAlign:'center'}}>
              <h2>tel: +48 730 786 586</h2>
              <h3>email: mateusz.laczynski20@gmail.com</h3>
              <br/>
            </div>
        </div>
    </Base>
  )
}

export default Contact;