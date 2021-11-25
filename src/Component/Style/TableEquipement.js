import React from 'react';
import Table from 'react-bootstrap/Table'
import CheckBoxIcon from '@material-ui/icons/CheckBox';


export default function TableCaracteristique(props){
  return(
    <Table hover size="s" style={{marginLeft:"20%",marginRight:"2%", width:"30%"}}>
    <thead>
      <tr>
        <th colSpan="5" style={{textAlign:"center"}}><h4>Equipement</h4></th>
      </tr>
    </thead>
    <tbody style={{textAlign:"center",width:"50%"}}>
    {props.options.map(e =>
      <tr>
        <td><CheckBoxIcon /> </td>
        <td>{e}</td>
      </tr>
    )}
    </tbody>
    </Table>
  )
}
