import React from 'react';

import classes from './Button.css';

const button = (props) => (
    /*Con la sintassi in className, sto passando un ARRAY DI STRINGHE. Nel primo caso sto passando 
      ['Button'] che è la classe del css, nel secondo caso passo la stringa in modo tale che sia o 
      Success o Danger (le altre due classi del Button.css). Con join(' ') creo infine un array di stringe
      separate dallo spazio. Sarà una cosa del genere: 'Button' 'Success/Danger'
    */
    <button className={[classes.Button, classes[props.btnType]].join(' ')} 
        onClick={props.clicked}
        disabled={props.disabled}>{props.children}</button> /*Qui il disabled è una proprietà di HTML (disabilita il button se false), a differenza di ContactData.js dove Button è il component e non il tag di html (che sono due cose diverse)*/
    );

export default button;