import React, { PureComponent } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import FactoryContract from "../contracts/Factory.json";
import getWeb3 from "../utils/getWeb3";
import Button from '@material-ui/core/Button';

import SideNav from "./Sidenav";

import { Grid, Paper } from "@material-ui/core"
import { withRouter } from "react-router-dom";

import LeftGrid from "./LeftGrid";
import ProjectDropdown from "./ProjectDropdown";
import Chart from "./Chart"

import "./InfoPage.css";
import { dataArray, projectIDList, projectNames, hardCaps, dates, status, /*investors,*/ contractAddressList } from "./Data.js";


class InfoPage extends PureComponent {

  constructor(props){
    super(props);

    this.state = {
        username : '',
        projectID : this.props.match.params.id,
        web3: null, 
        accounts: null, 
        //contract: null,
        contract: []
    }
    
    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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


  
  getContractAddresses = async () => {
    const { contract } = this.state;

    // save contract addresses in contractAddressList
    // TODO push data in array
    const counter= await contract[0].methods.counter().call();
    for (var i=1; i<counter; i++){
      console.log("counter: " + counter)
      console.log(await contract[0].methods.index(i).call())
      contractAddressList[i-1] = await contract[0].methods.index(i).call();
    }
  };

  getData = async (counter) => {
    const { /*accounts,*/ contract } = this.state;

    console.log("in getData " + counter);
    console.log("coontract: " + contract[counter]);
    // Get the value from the contract to prove it worked.
    //const symbol = contract[counter].methods.getSymbol().call();
    const name = await contract[counter].methods.getName().call();
    const ongoing = await contract[counter].methods.tokenSaleOngoing().call();
    const totalSupply = await contract[counter].methods.getSupply().call();
    const date = await contract[counter].methods.dateOfDeploy().call();
    let projectStatus;

    if (ongoing === true) {projectStatus = "Fundraiser is ongoing"}
    else {projectStatus = "Fundraiser is over"}

    // Update data arrays with the results
    //projectIDList[counter-1] = "test";
    projectNames[counter-1] = name;
    console.log("PJNAME: " + projectNames[counter-1]);
    status[counter-1] = projectStatus;
    hardCaps[counter-1] = totalSupply;
    dates[counter-1] = new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(date*1000);
  };

  addressListTest(){
    console.log(this.state.contract)
  }

  updateInput(event){
    this.setState({username : event.target.value})
  } 

  //TODO: dynamic length, depended on dataArray[index] instead dataArray[0]
  returnROI(){
      return (dataArray[projectIDList.indexOf(this.state.projectID)][dataArray[0].length-1].earnings - hardCaps[projectIDList.indexOf(this.state.projectID)]) / hardCaps[projectIDList.indexOf(this.state.projectID)] * 100; // + " %";
  }
  //for dropdown
  handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
      this.setState({ projectID: event.target.value });
      this.props.history.push("/viewInfo/" + event.target.value);
      console.log('P ID: ' + this.state.projectID);
  };

  //to test

  handleSubmit(){
      console.log('Your input value is: ' + this.state.username);
      //Send state to the server code
  }

  render() {
    console.log(this.state.web3);
    const header = "Select Project to view Info";


    // if (!this.state.web3) {
    //   //console.log(this.state.web3);
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    
    return (
      <div>
        <div className="App">
          <div >
            <SideNav
              currentLink={window.location.href}
            />         
          </div>   
          <div className="Main">
            <div>
                <h1> {header} </h1>
                <ProjectDropdown
                    pID={this.state.projectID}
                    handleChange={this.handleChange}
                />     
            </div>


            <Grid className="grid" container spacing={24}>
              <LeftGrid
                pName={projectNames[projectIDList.indexOf(this.state.projectID)]} 
                pStatus={status[projectIDList.indexOf(this.state.projectID)]}
                pDate={dates[projectIDList.indexOf(this.state.projectID)]}
                pHardCap={hardCaps[projectIDList.indexOf(this.state.projectID)] + " ETH"}
                pInvestors="n.a"
                pContract={contractAddressList[projectIDList.indexOf(this.state.projectID)]}
              />
              
              <Button onClick={this.getData} style={{color: "white"}}>
                Update
              </Button>
              
              <Button onClick={this.getContractAddresses} style={{color: "white"}}>
              Update Addresses
              </Button>

              <Button onClick={this.addressListTest()} style={{color: "white"}}>
              Address List
              </Button>

              <Grid item xs={6} style={{margin: "0 auto"}}>
                <Paper className="topPaper">
                  <div className="item">
                    {console.log(this.state.projectID)}
                          {/* <p style={{fontSize: "17", margin: "0 auto", marginTop: "5%"}}> {this.state.projectID === undefined ? "nothing selected" : "Total Revenue in the first " + dataArray[projectIDList.indexOf(this.state.projectID)].length + " months"} </p> */}
                  </div>
                  <div style= {{padding: "10px", marginLeft: "7%"}}> 
                    
                  {/* {this.state.projectID === undefined ? "nothing selected" : */}
                    
                     {/* <Chart */}
                    {/* //     chartData={dataArray[projectIDList.indexOf(this.state.projectID)]}
                    // />
                  // } */}
                    <div className="item" style={{marginLeft: "5%"}}>
                      <p className= "ROI"> ROI: </p>
                      {/* <p className={this.returnROI() > 0 ? "positiveROI" : "ROI"} style={{marginRight: "5%"}} > 
                          {this.returnROI()} %
                      </p> */}
                    </div>
                  </div>
                </Paper>
              </Grid>        
            </Grid>
            {
              this.state.web3 && 
              <div className="App">

              </div>
            }
            {
              !this.state.web3 &&
              <div>Loading Web3, accounts, and contract...</div>
            }
          </div> 
        </div>
      </div>
    );
  }
}


export default withRouter(InfoPage);