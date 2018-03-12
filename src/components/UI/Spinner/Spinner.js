/*Questo component crea uno spinner, cioè un loader con css dedicato, serve solo a far vedere come
  creare un messaggio di attesa mentre invio i dati in post al database. Sto creando lo spinner
  poichè firebase è troppo veloce e non da possibilità di visualizzare nessun loader.
*/
import React from 'react';

import classes from './Spinner.css'
const spinner = () => (
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;