import React from 'react'
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Home from './core/Home';
import About from './core/About';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Error from './base/Error';
import ProductDetail from './core/ProductDetail';
import Cart from './core/Cart';
import Contact from './core/Contact';
import Products from './core/Products';
import Dimensions from './core/Dimensions';
import FAQ from './user/FAQ';
import UserDashboard from './user/UserDashboard';
import Newsletter from './user/Newsletter';
import OnDemand from './core/OnDemand';

const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/produkty" element={<Products/>}/>
          <Route exact path="/oferty-na-zamowienie" element={<OnDemand/>}/>
          <Route exact path="/koszyk" element={<Cart/>}/>
          <Route exact path="/detail/:slug" element={<ProductDetail/>}/>
          <Route exact path="/wymiary" element={<Dimensions/>}/>
          <Route exact path="/o-nas" element={<About/>}/>
          <Route exact path="/kontakt" element={<Contact/>}/>
          <Route exact path="/faq" element={<FAQ/>}/>
          <Route exact path="/membership" element={<Newsletter/>}/>
          <Route exact path="/panel-uzytkownika" element={<UserDashboard/>}/>
          <Route exact path="/rejestracja" element={<Signup/>}/>
          <Route exact path="/login" element={<Signin/>}/>
          <Route path="*" element={<Error errorMessage="404 Nie znaleziono strony!"/>}/>
        </Switch>
      </BrowserRouter>
    )
}

export default Routes;