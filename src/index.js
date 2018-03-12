import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; //importo qui il BrowserRouter per il routing. Potevo farlo anche in App.js è lo stesso
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //Il settaggio del redux devtools è preso dalla pagina github, vede lì come va settato sia quando si usano i middleware (come in questo caso) che quando non si usano

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
)); 

/*Quando devo passare il Provider ad App che è già annidato nel BrowserRoute (o in un altro component) si fa così*/
const app = (
    <Provider store={store}> 
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
