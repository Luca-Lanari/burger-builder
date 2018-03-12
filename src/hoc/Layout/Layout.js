/* Questo component viene trasformato in uno stateful component, poichè avendo una connessione tra
Toolbar e SideDrawer e dovendo passare sia al SideDrawer che alla Toolbar un metodo per la chiusura
del backdrop, allora è consigliabile cambiare questo component in uno stateful, così da poter 
passare ai due component Toolbar e SideDrawer il metodo di chiusura backdrop */
/*IMPORTANTE: Questo component e il suo file css sono stato spostati nella cartella di hoc/ poichè
              alla fine il Layout è come se fosse un high order component. Infatti se si va in 
              App.ja si può notare che il tag <Layout></Layout> avvolge il tag <BurgerBuilder />, 
              proprio come fa di norma un hoc (vedi Aux).
              Non è comunque sbagliato inserire la cartella Layout dentro la cartella containers,
              perchè in fin dei conti è container di altri functional components.
*/
import React, {Component} from 'react';

import Aux from '../Aux/Aux'; /*I custom components iniziano sempre con la lettera maiuscola  */
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    /*Devo usare il prevState in questo caso poichè per la natura asincrona di state potrebbero sorgere problemi.
     IMPORTANTE: Questo è il miglior modo di aggiornare lo state quando esso dipende dal suo state precendente */
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }


    render () {
        return (
            <Aux>  {/*Uso il metodo dell'Aux.js per avvolgere il JSX altrimenti ho un errore.
                      N.B. Si possono usare altri metodi, come avvolgere tutto in un div oppure usare i
                      withClass o WithClass*/}
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/> {/*Qui uso il Toolbar perchè il Layout, come detto, gestisce l'intera disposizione
                     della pagina */}  
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>          
                <main className={classes.Content}> {/*inserisco un margin top di 16.px richiamando la classe di Layout.css .Content*/}
                    {this.props.children} {/*RICORDA: props.children serve a passare tutto quello che è racchiuso 
                                   tra i tag <Layout></Layout>*/}
                </main>
            </Aux>
        )
    }
} 

export default Layout;