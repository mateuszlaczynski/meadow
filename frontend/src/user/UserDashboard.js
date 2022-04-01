import React, {useState, useEffect} from 'react'
import { isAuthenticated, changeNewsletter, signout,
  terminateAccount } from './helper/userAPICalls'
import Base from '../base/Base'
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const navigate = useNavigate();

  const {id, newsletter} = user;

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(isAuthenticated().user);
      setLoading(false);
    } else {
      navigate('/login')
    };
  }, [newsletter]);

  const signoutSubmit = () => {
    signout()
    .then(
        navigate("/")
    )
    .catch((error) => console.log(error))
  };

  const submitDelete = (user_id, token) => {
    terminateAccount(user_id,token)
    .then((data) => {
      navigate('/')
    })
    .catch((error) => console.log(error))
  };

  const handleNewsletter = (user_id, token) => {
    changeNewsletter(user_id, token)
    .then((data) => {
      let tempUser = JSON.parse(localStorage.getItem('jwt'));
      tempUser.user.newsletter = data.data;
      setUser({...user, newsletter:data.data})
      localStorage.setItem("jwt", JSON.stringify(tempUser))
    })
    .catch((error) => console.log(error))
  };

  return (
    <Base title="Meadow | Panel użytkownika" container={true}>
      {loading && !deleteAccount && <div className='loading'></div>}
      {!loading && !deleteAccount && <>
        <div className="card my-4">
          <h2 className="card-header">Meadow Membership</h2>
          <div className="card-body text-center">
          {newsletter ? <>
              <h4>Jesteś zapisany do programu Meadow Membership, w każdej chwili możesz zrezygnować z subskrypcji.</h4>
              <button style={{maxWidth:500}} className='checkout-button'
              onClick={()=> handleNewsletter(id, isAuthenticated().token)}>
                Wypisz Się
                </button>
            </> : <>
              <h4>Zapisz się do programu Meadow Membership aby nie przegapić nowych ofert i promocji!</h4>
              <button style={{maxWidth:500}} className='green-button'
              onClick={()=> handleNewsletter(id, isAuthenticated().token)}>
                Zapisz Się
                </button>
            </>}
          </div>
        </div>

        <div className="card my-4">
          <h2 className="card-header">Wyloguj Się</h2>
          <div className="card-body text-center">
          <button className='checkout-button'
            style={{maxWidth:500}}
            onClick={() => signoutSubmit()}>
              Wyloguj Się
            </button>
          </div>
        </div>

        <div className="card my-4">
          <h2 className="card-header">Usuń Konto</h2>
          <div className="card-body text-center">
            <p>
              <button type="button"
               onClick={() => setDeleteAccount(true)}
               className="btn btn-outline-danger">Usuń</button> Uwaga,
              tej akcji nie będzie można cofnąć!
            </p>
          </div>
        </div>
        </>}

      {deleteAccount && !loading && <>
              <div className="card">
                <h2 className="card-header">Usuń Konto</h2>
                <div className="card-body text-center">
                  <h3>Czy jesteś pewny, że chcesz usunąć konto?</h3>
                    <div className='row text-center py-2 px-3'>
                      <div className='col'>
                        <button className='gray-button'
                        onClick={() => setDeleteAccount(false)}>
                          Anuluj
                        </button>
                      </div>
                      <div className='col'>
                        <button className='checkout-button'
                          onClick={() => submitDelete(id, isAuthenticated().token)}>
                          Usuń
                        </button>
                      </div>
                </div>
                </div>
              </div>
            </>}
    </Base>
  )
};
export default UserDashboard;