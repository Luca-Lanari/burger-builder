import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};


export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};


/*Le seguenti function sono per la gestione delle chiamate asincrone, quindi si usa l'action creator */
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        /*Qui abbiamo il checkout, quindi salviamo i dati in post in firebase.
        IMPORTANTE: in firebase si mette qualsiasi nome dopo lo slash finendo con .json.
        Questo verrà tradotto in firebase come un javascript object con nome orders: { key: value } con key e value passati in post*/
        axios.post('/orders.json', orderData) /*va passato orderData che è il javascript object che contiene i dati da passare in post a firebase */
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData)); //response.data.name .name può essere trovato facendo il console lof di response.data (in name il response data si salva l'id)
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            }); 
    };
};

/*purchaseInit verrà fatto il dispatch ogni volta che la pagina Checkout verrà caricata. */
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };  
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(res => {
            /*Poichè con la get i dati presi da firebase vengono restituiti sottoforma di javascript
              object, devo trasformarli da json ad array. Lo faccio nel seguente modo:  */
              const fetchedOrders = []; 
              for (let key in res.data) {
                fetchedOrders.push({ /*Creo un oggetto dentro l'array che contiene tutto quello passato prima con lo spread operator, 
                                    più l'aggiunta di un id che sarà la key (in questo caso la key è id che viene dato da firebase
                                    che identifica l'oggetto specifico dell'ordine )  */
                    ...res.data[key], 
                    id: key
                });
              }
              dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err => {
            dispatch(fetchOrdersFail(err));
        });
    };
};