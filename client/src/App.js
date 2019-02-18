import React, { Component } from "react";   // PureComponent?
import { Route, BrowserRouter } from "react-router-dom"

import Fundraiser from "./components/Fundraiser";
import InfoPage from "./components/InfoPage";
import InfoPageDefault from "./components/InfoPageDefault";

import Home from "./components/Home";

import "./App.css";

class App extends Component {

  render() {
    return (
   
      <BrowserRouter>
        
        <div>
          {/* <div>
            <SideNav
              currentLink={window.location.href}
            />        
          </div>  */}
          <div>
          <Route path="/home" component={Home}/>
          <Route path="/fundraiser" component={Fundraiser}/>
          <Route path="/viewInfo/:id" component={InfoPage}/>
          <Route exact path="/viewInfo" component={InfoPageDefault} /> 
          
          </div>
        </div>
      </BrowserRouter>   
    )
  }
}

export default App;
