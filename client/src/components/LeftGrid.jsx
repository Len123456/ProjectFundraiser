import React from "react";
import { Grid, Paper, Button } from "@material-ui/core"

import "./InfoPage.css";
import "./LeftGrid.css";
import EtherscanLogo from "../images/etherscan-logo-big.png";

function openContractOnEtherscan(contractAddress) {
    var link = "https://etherscan.io/address/" + contractAddress;
    window.open(link, '_blank');
}


const LeftGrid = ({
    pName,
    pStatus,
    pDate,
    pHardCap,
    pInvestors,
    pContract,
}) => (
    <Grid item xs={6} style={{marginLeft: "0%"}}>
        <Paper className="leftPaper">
            
            <div className="leftGridItem">
                <p style={{fontSize: "17", margin: "0 auto", marginTop: "5%", marginBottom: "5%"}}> Project Info </p>
            </div>

            <div className="box">

            <div className="leftGridItem" style={{marginLeft: "5%"}}>
                <p style={{fontSize: 17, marginTop: "5%"}}> Project Name:</p>
                <p style={{marginTop: "5%", fontSize: 17, marginRight: "5%"}}> {pName} </p>
            </div>
            <div className="leftGridItem" style={{marginLeft: "5%"}}>
                <p style={{fontSize: 17}}> Status:</p>
                <p style={{fontSize: 17, marginRight: "5%"}}> {pStatus} </p>
            </div>
            <div className="leftGridItem" style={{marginLeft: "5%"}}>
                <p style={{fontSize: 17}}> Date of Fundraising:</p>
                <p style={{fontSize: 17, marginRight: "5%"}}> {pDate} </p>
            </div>
            <div className="leftGridItem" style={{marginLeft: "5%"}}>
                <p style={{fontSize: 17}}> Raised Amount:</p>
                <p style={{fontSize: 17, marginRight: "5%"}}> {pHardCap} </p>
            </div>
            <div className="leftGridItem" style={{ marginLeft: "5%"}}>
                <p style={{fontSize: 17}}> Number of Investors:</p>
                <p style={{fontSize: 17, marginRight: "5%"}}> {pInvestors} </p>
            </div>
            </div>
            <Button variant="outlined" style={{border: 'solid 1px rgb(11, 15, 32)'}} className="buttonEtherscan" onClick={() => openContractOnEtherscan(pContract)}>
                Look up Transaction History!
                <img src={EtherscanLogo} alt="cant display logo" style={{width: "100px", marginLeft: "5%"}}/>
            </Button>
        </Paper>
    </Grid>
)


export default LeftGrid;