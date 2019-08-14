import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Link, Route } from "react-router-dom";
import MWLayout from "./components/MWLayout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Mine from "./pages/Mine";
class App extends Component {
    render() {
        return (
            <Fragment>
                <div>
                    <Router>
                         <Route path="/" render={(props)=><MWLayout {...props}><Home/></MWLayout>} exact />
                         <Route path="/Cart" render={(props)=><MWLayout {...props}><Cart/></MWLayout>} exact />
                         <Route path="/Mine" render={(props)=><MWLayout {...props}><Mine/></MWLayout>} exact />
                    </Router>
                </div>
            </Fragment>
        );
    }
}
export default App;