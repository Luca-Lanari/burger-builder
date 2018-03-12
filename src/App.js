/*IMPORTANTE: QUESTO BURGER BUILDER È LA SECONDA COPIA DI QUELLO CHE HO FATTO SOLTANTO CHE QUI VIENE 
              RISTRUTTURATO TUTTO USANDO REDUX E REDUX AVANZATO PER LE CHIAMATE ASINCRONE COME AD ESEMPIO 
              LE HTTP REQUESTS.
*/
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
          <Layout> {/*Il layout conterrà la disposizione (layout) degli elementi del progetto.*/}
            <Switch> {/*Se uso Switch posso non usare exact (lo lascio per far vedere che si possono usare tutti e due), ma IMPORTANTE devo invertire l'ordine delle due route, (prima /checkout e poi /)*/} 
              <Route path="/checkout" component={Checkout} />       
              <Route path="/orders" component={Orders} />       
              <Route path="/" exact component={BurgerBuilder} /> 
            </Switch>

          </Layout>
          
      </div>
    );
  }
} 

export default App;
