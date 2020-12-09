import React from 'react';
import './index.css';
import Products from './containers/Products';
import Checkout from './containers/Checkout';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Products} />
            <Route path="/checkout" component={Checkout} />
        </Switch>
    </ BrowserRouter>
);

registerServiceWorker();

export default Routes;