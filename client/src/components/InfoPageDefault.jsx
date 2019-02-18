import React, { PureComponent} from "react";
import { Grid, Paper } from "@material-ui/core"
import { withRouter } from "react-router-dom";

import ProjectDropdown from "./ProjectDropdown";
import SideNav from "./Sidenav";

import "./InfoPageDefault.css";

import ImageBusiness from "../images/business-project.png";


class InfoPage extends PureComponent {

    constructor(props){
        super(props);

        this.state = {
            username : '',
            projectID : ""
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
        this.props.history.push("/viewInfo/" + event.target.value);
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
        const header = "Select Project to view Info";

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
                            <Paper style={{ width: "92%", height: "450px", marginLeft: "2%", marginTop: "2%", backgroundImage: `url(${ImageBusiness})`}}>
                                <div>
                                    {/* <h1 className="headerTop" style={{ color: "white", fontSize: 30, marginTop: "10%"}}> Please select a project in the Dropdown above </h1> */}
                                </div>
                            </Paper>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}


//export default InfoPage;
export default withRouter(InfoPage);