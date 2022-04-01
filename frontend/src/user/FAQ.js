import React, {useState, useEffect} from 'react'
import Base from '../base/Base'
import { getQuestions } from './helper/userAPICalls';

const FAQ = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFAQ()
    }, []);
  
    const loadFAQ = () => {
        getQuestions()
        .then((data) => {
            setQuestions(data);
            setLoading(false);
        })
        .catch((error) => console.log(error))
    };
    console.log(questions)
    return (
        <Base title={"Meadow | Newsletter"} container={true}>
            {loading ? <div className='loading'>   
            
            </div> : <div className="row justify-content-md-center">
                {questions.map((data) => {
                    return (
                        <div className='col-12 col-xl-5 m-3'>
                            <h2>{data.question}</h2><hr/>
                            <p style={{textAlign:'justify', fontSize:26}}>
                                {data.answer}
                            </p>
                        </div>
                    )
                })}
            </div>}
        </Base>
  )
}

export default FAQ;