import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import CloseIcon from "@material-ui/icons/Close";

import FactoryContract from "../contracts/Factory.json";
import { contractAddressList } from "./Data.js";


import getWeb3 from "../utils/getWeb3";

import "./FormStart.css";


export default class FormStart extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            open: false,
            web3: null, 
            accounts: null, 
            contract: [],
            symbol: '', 
            name: '',
            hardcap: '',
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        console.log("handleClose");
        this.setState({ open: false });
    };

    handleSubmit = () => {
        console.log("Sumbit");
       
    };
    
    saveSymbol = (e) => {
        this.setState({
            symbol: e.target.value
        });
    }

    saveName = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    saveHardcap = (e) => {
        this.setState({
            hardcap: e.target.value
        });
    }


    componentDidMount = async () => {

        ValidatorForm.addValidationRule('isNotEmpty', (value) => {
            if (value.length === 0) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('isFiveDigits', (value) => {
            if (value.length !== 5) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('isPositive', (value) => {
            if (value <= 0) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('isNumber', (value) => {
            if (isNaN(value)) {
                return false;
            }
            return true;
        });
        ValidatorForm.addValidationRule('isUpperCase', (value) => {
            if (value !== value.toUpperCase()) {
                return false;
            }
            return true;
        });

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
            //console.log(contractAddressList);
        

        } catch (error) {
        // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };


    //TODO: make owner the one who creates the contract
    createContract = async () => {
        const { accounts, contract } = this.state;
        console.log(accounts[0]);
        console.log(accounts[1]);
        // creates instance of contract
        console.log(this.state.symbol + " " + this.state.name + " " + this.state.hardcap);
        await contract[0].methods.createTokenSale(this.state.symbol, this.state.name, this.state.hardcap, "0x0e772277776caa6cd41b82c576a6f62650c8ddb2").send({ from: accounts[0] })
        .then(console.log(contractAddressList));
    };

    render() {
        return(
            <div>
                <Button className="formButton" onClick={this.handleClickOpen} >Set up Fundraiser</Button>
                

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <div style={{alignSelf: "flex-end"}}>
                        <Button onClick={this.handleClose} style={{padding: "20px 20px 20px 20px"}}>
                            <CloseIcon/>
                        </Button>
                    </div>
                    <DialogTitle style={{paddingTop: "0px"}} id="form-dialog-title">Set up Fundraiser</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To set up a fundraiser, please enter your details here.
                    </DialogContentText>
                    <br/>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.createContract}
                        onError={errors => console.log(errors)}
                    >
                        <TextValidator
                            autoFocus
                            errorMessages={['this field is required', 'only positive numbers allowed', 'only positive numbers allowed']}
                            fullWidth
                            helperText="How much do you want to raise? (in ETH)"
                            label="Hardcap"
                            margin="dense"
                            name="email"
                            onChange={this.saveHardcap}
                            placeholder="e.g. 100"
                            validators={['isNotEmpty', 'isNumber', 'isPositive']}
                            value={this.state.hardcap}
                        />
                        <br/><br/>
                        <TextValidator
                            errorMessages={['this field is required']}
                            fullWidth
                            helperText="What is the name of your Project?"
                            label="Project Name"
                            margin="dense"
                            name="email"
                            onChange={this.saveName}
                            placeholder="e.g. Project1"
                            validators={['isNotEmpty']}
                            value={this.state.name}
                        />
                        <br/><br/>
                        <TextValidator
                            errorMessages={['this field is required', 'only uppercase letters and numbers are allowed', 'please enter a five character Project ID']}
                            fullWidth
                            helperText="Enter five character Project ID here"
                            label="Project ID"
                            margin="dense"
                            name="email"
                            onChange={this.saveSymbol}
                            placeholder="e.g. PROJ1"
                            validators={['required', 'isUpperCase', 'isFiveDigits']}
                            value={this.state.symbol}
                        />
                        <br/><br/>
                        <div style={{display: "grid"}}>
                            <Button type="submit">Submit</Button>
                        </div>
                    </ValidatorForm>
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions> */}
                </Dialog>
            </div>
        );
    }
    
}