import React, { PureComponent } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";

import SideNav from "./Sidenav";


import "./InfoPage.css";
import { dataArray, projectIDList, hardCaps } from "./Data.js";



class Home extends PureComponent {

  constructor(props){
    super(props);



    this.state = {
        username : '',
        projectID : this.props.match.params.id,
        web3: null, 
        accounts: null, 
        contract: null
    }
    
    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


updateInput(event){
    this.setState({username : event.target.value})
} 

//for dropdown
handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ projectID: event.target.value });
    this.props.history.push("/home/" + event.target.value);
};

openLink(){
    console.log(this.state.username);
    var link = "https://etherscan.io/address/" + this.state.username;
    window.open(link, '_blank');
    console.log(this.props.match.params.id);
}

//to test
clicked() {
    console.log('The link was clicked.');
};

handleSubmit(){
    console.log('Your input value is: ' + this.state.username);
    //Send state to the server code
}

  render() {
    console.log(this.state.web3);
    const header = "Coming soon...";


    // if (!this.state.web3) {
    //   //console.log(this.state.web3);
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    
    return (
      <div>
        <div className="App">
            <SideNav
              currentLink={window.location.href}
            />         
          <div className="Main">
            <div>
                <h1> {header} </h1>
                    
            </div>


        
              <div className="App">

              </div>
         
          
          
          </div> 
        </div>
      </div>
    );
  }
}


  export default Home;