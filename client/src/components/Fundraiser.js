import React, { Component } from "react";
import { Paper } from "@material-ui/core"

import SideNav from "./Sidenav";
import FormStart from "./FormStart";
import ProjectList from "./TableProjectList";

import Button from '@material-ui/core/Button';

import MoneyPen from "../images/moneyPen.png";

import FactoryContract from "../contracts/Factory.json";
import SimpleStorageContract from "../contracts/SimpleStorage.json";

import "./Fundraiser.css";
//import { contractAddressList } from "./Data.js";
import getWeb3 from "../utils/getWeb3";

import { dataArray, projectIDList, projectNames, hardCaps, dates, status, /*investors,*/ contractAddressList } from "./Data.js";


class Fundraiser extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      web3: null, 
      accounts: null, 
      contract: []
    }
  }

  componentDidMount = async () => {

    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the networkID & address of Factory contract
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FactoryContract.networks[networkId];      
      // get the Factory contract instance
      const instance = new web3.eth.Contract(
        FactoryContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      // Set web3, accounts, and contract to the state, get addresses and save them in array and interact with the contracts methods.
      this.setState({ web3, accounts, contract: [...this.state.contract, instance] });   
      console.log(contractAddressList);
      this.getContractAddresses()  
      .then( () => {
        // for all addresses in the address list, push an instance of the contract to the state array of contracts and get the Data for each
        for (var i=1; i <= contractAddressList.length; i++) {
          let tokenSale = new web3.eth.Contract(
            SimpleStorageContract.abi,
            deployedNetwork && contractAddressList[i-1],
          );
          
          // update state by pushing contract instance to the state array of contracts
          this.setState({ web3, accounts, contract: [...this.state.contract, tokenSale] })
          console.log("contract: " + this.state.contract);
          // get the Data and save it 
          this.getData(i);
        
        }      
      });
    
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  
  
  
  
  createContract = async () => {
    const { accounts, contract } = this.state;
    console.log(accounts[0]);
    console.log(accounts[1]);
    // creates instance of contract
    await contract[0].methods.createTokenSale("ABCDX", "ABCProject", 1234, "0x0e772277776caa6cd41b82c576a6f62650c8ddb2").send({ from: accounts[0] })
    .then(console.log(contractAddressList));
  
  };

  getData = async (counter) => {
    const { /*accounts,*/ contract } = this.state;
    projectIDList.length = 0;
    projectNames.length = 0;
    status.length = 0;
    hardCaps.length = 0;
    dates.length = 0;

    console.log("in getData " + counter);
    console.log("coontract: " + contract[counter]);
    // Get the value from the contract to prove it worked.
    const symbol = await contract[counter].methods.getSymbol().call();
    const name = await contract[counter].methods.getName().call();
    const ongoing = await contract[counter].methods.tokenSaleOngoing().call();
    const totalSupply = await contract[counter].methods.getSupply().call();
    const date = await contract[counter].methods.dateOfDeploy().call();
    let projectStatus;

    if (ongoing === true) {projectStatus = "Fundraiser is ongoing"}
    else {projectStatus = "Fundraiser is over"}

    // Update data arrays with the results
    projectIDList.push(symbol);
    projectNames.push(name);
    status.push(projectStatus);
    hardCaps.push(totalSupply);
    dates.push(new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(date*1000));
  };

  getContractAddresses = async () => {
    const { contract } = this.state;

    // save contract addresses in contractAddressList
    // TODO push data in array
    const counter= await contract[0].methods.counter().call();
    for (var i=1; i<counter; i++){
      console.log(await contract[0].methods.index(i).call())
      contractAddressList[i-1] = await contract[0].methods.index(i).call();
    }
  };

    render() {
      const headerTop = "Fundraising made easy!";
      const headerBottom = "Projects that have sucessfully raised funds:";
      
      return (       
        <div>
          <div>
            <div className="sidenav">
              <SideNav
                  currentLink={window.location.href}
              />        
            </div>      
            
            <header className="Main">
              <Paper style={{ width: "96%", height: "250px", marginTop: "2%", backgroundImage: `url(${MoneyPen})`}}>
                <div>
                  <h1 className="headerTop"> {headerTop} </h1>
                </div>
                <FormStart>FundraiserForm</FormStart>
              </Paper>
              <Paper className="bottomPaper">
                <div>
                  <h4 className="headerBottom"> {headerBottom} </h4>
                </div>
                <ProjectList/>
              </Paper>
              <Button onClick={this.createContract} style={{color: "white"}}>
                Deploy Contract
              </Button>
              <Button onClick={this.getContractAddresses} style={{color: "white"}}>
                Addresses
              </Button>
            </header>
          </div>
        </div>
      );
    }
  }


  export default Fundraiser;