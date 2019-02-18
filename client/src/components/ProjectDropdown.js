import React from "react";
import { FormControl, MenuItem, Select, FormHelperText } from "@material-ui/core";

import "./ProjectDropdown.css";

const dropdownItem = {
    color: 'white',
    backgroundColor: "rgb(2, 10, 75)",
};

const ProjectDropdown = ({
    pID, 
    handleChange,
}) => (
    <form className="root" autoComplete="off">
        <FormControl className="formControl" style={{width: "200px"}}>
                
            <Select
                value={pID}
                onChange={handleChange}
                inputProps={{
                name: 'project',
                id: 'project-simple',
                }}
                style={{color: "white"}}
                >      
                <MenuItem style={dropdownItem} value={"PROJ1"} >Project #1 </MenuItem>
                <MenuItem style={dropdownItem} value={"COOLP"} >Cool Project</MenuItem>
                <MenuItem style={dropdownItem} value={"LAMEP"} >Lame Project</MenuItem>
            </Select>
            <FormHelperText className="helpertext" >Select Project</FormHelperText>
        </FormControl>
    </form>      
)

export default ProjectDropdown