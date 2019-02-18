import React from "react";
import Media from "react-media";
import { Button} from "@material-ui/core"
import { Link } from "react-router-dom"
import EqualizerIcon from '@material-ui/icons/Equalizer';
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import HomeIcon from "@material-ui/icons/Home";

import Logo from "../images/LogoV1.png";

import "./Sidenav.css";

const SideNav = ({  
    currentLink,
}) => (
    <div >
           
        <Media query="(max-width: 1000px)">
          {matches =>
            matches ? (
                <div className="sidenavSmall">
                    {/* <div>
                        <img src={Logo} alt="description of logo" style={{width: "70%", marginBottom: "5%"}}/>   
                    </div>  */}
                    <Button className={currentLink.includes("/home") ? "sideNavButton" : "sideNavButtonInactive" } component={Link} to="/home">
                        <HomeIcon style={{marginLeft: "15px"}} /> 
                    </Button>                        
                    <Button className={currentLink.includes("/fundraiser") ? "sideNavButton" : "sideNavButtonInactive" } component={Link} to="/fundraiser">
                        <LocalAtmIcon style={{marginLeft: "15px"}}/>
                    </Button>
                    <Button className={currentLink.includes("/viewInfo") ? "sideNavButton" : "sideNavButtonInactive" } component={Link} to="/viewInfo">
                        <EqualizerIcon style={{marginLeft: "15px"}}/>
                    </Button>  
                </div>
            ) : (
                <div className="sidenav">
                    <Button className={currentLink.includes("/home") ? "sideNavButton" : "sideNavButtonInactive" } component={Link} to="/home">
                        <HomeIcon style={{marginLeft: "15px"}} /> 
                        <div style={{textAlign: "right", marginLeft: "25px", marginRight: "15px", width: "100%"}}> Home {console.log(window.innerWidth)} </div>
                    </Button>                        
                    <Button className={currentLink.includes("/fundraiser") ? "sideNavButton" : "sideNavButtonInactive" } component={Link} to="/fundraiser">
                        <LocalAtmIcon style={{marginLeft: "15px"}}/>
                        <div style={{textAlign: "right", marginRight: "15px", width: "100%"}}> Fundraiser </div>
                    </Button>
                    <Button className={currentLink.includes("/viewInfo") ? "sideNavButton" : "sideNavButtonInactive" } component={Link} to="/viewInfo">
                        <EqualizerIcon style={{marginLeft: "15px"}}/>
                        <div style={{textAlign: "right", marginRight: "15px", width: "100%"}}> View Info </div>
                    </Button>  
                </div>
            )
          }
        </Media>                              
        {/* <Button className={currentLink.includes("/home") ? "sideNavButton" : "sideNavButtonInactive" } component={Link} to="/home">
            <HomeIcon style={{marginLeft: "15px"}} /> 
            <div style={{textAlign: "right", marginLeft: "25px", marginRight: "15px", width: "100%"}}> Home {console.log(window.innerWidth)} </div>
        </Button>                        
        <Button className={currentLink.includes("/fundraiser") ? "sideNavButton" : "sideNavButtonInactive" } component={Link} to="/fundraiser">
            <LocalAtmIcon style={{marginLeft: "15px"}}/>
            <div style={{textAlign: "right", marginRight: "15px", width: "100%"}}> Fundraiser </div>
        </Button>
        <Button className={currentLink.includes("/viewInfo") ? "sideNavButton" : "sideNavButtonInactive" } component={Link} to="/viewInfo">
            <EqualizerIcon style={{marginLeft: "15px"}}/>
            <div style={{textAlign: "right", marginRight: "15px", width: "100%"}}> View Info </div>
        </Button>                    */}
    </div>
)

export default SideNav