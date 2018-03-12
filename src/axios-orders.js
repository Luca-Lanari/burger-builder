/*Posso anche creare globalmente il baseURL nell'index.js, è la stessa cosa. Sono solo diversi
  stili di progettazione. Per vedere come si fa vedi "http-requests".
  In questo caso è molto adatto l'axios instance, poichè quando si avrà l'autenticazione si avrà
  un diverso URL, e crearlo globalmente potrebbe dare problemi.
*/
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-14ce7.firebaseio.com/'
});

export default instance;