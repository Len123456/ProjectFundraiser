import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { /* dataArray, */ projectIDList, projectNames, hardCaps, dates, status /* , investors, contractAddressList */ } from "./Data.js";

import "./TableProjectList.css";


//let id = 0;
function createData(i) {
    let id = i;
    let projectID = projectIDList[i];
    let projectName = projectNames[i];
    let projectRaised = hardCaps[i];
    let projectInvestors = dates[i];
    let projectStatus = status[i];


    return { id, projectID, projectName, projectRaised, projectInvestors };
}

function openProjectLink(row){
    //alert('Click event on row ' + row);
    var link = "http://localhost:3000/viewInfo/" + row;
    window.open(link, '_self');
}

const rows = [
];


function ProjectList () {

    // TODO: make function depended on if project is over or not 
    for(var i=0; i<projectNames.length; i++){
        rows[i] = createData(i);
    }


    return (
        <Grid item xs={10} style={{margin: "0 auto"}}>
            <Paper style={{width: "100%", overflowX: 'auto', marginTop: "auto"}}>
                <Table style={{width: "100%", background: "rgb(2, 10, 75)", color: "white",  minWidth: "700"}}>              
                    <TableHead className="tableHead">                          
                        <TableRow>                             
                            <TableCell className="tableHead" >Project ID</TableCell>
                            <TableCell align="center" className="tableHead"> Project List </TableCell>
                            <TableCell align="center" className="tableHead"> raised funds (ETH)</TableCell>
                            <TableCell align="center" className="tableHead"> Number of Investors</TableCell>                                
                        </TableRow>                                
                    </TableHead>                        
                    <TableBody >
                        {rows.map(row => {
                        return (                                
                            <TableRow className="tableRow" key={row.id} onClick={()=> openProjectLink(row.projectID) }>
                            <TableCell style={{color: "white"}} component="th" scope="row">
                                {row.projectID}
                            </TableCell>
                            <TableCell align="center" style={{color: "white"}} >{row.projectName}</TableCell>
                            <TableCell align="center" style={{color: "white"}} >{row.projectRaised}</TableCell>
                            <TableCell align="center" style={{color: "white"}} >{row.projectInvestors}</TableCell>
                            </TableRow>
                        );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </Grid>
    );
}


export default ProjectList;