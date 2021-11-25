import React from 'react';
import Table from 'react-bootstrap/Table'
import SpeedIcon from '@material-ui/icons/Speed';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

export default function TableCaracteristique(props){

return(
  <>
  <Table hover size="s" style={{margin:"auto", width:"80%"}}>
  <thead>
    <tr>
      <th colSpan="5" style={{textAlign:"center"}}><h4>Données du véhicule</h4></th>
    </tr>
  </thead>
  <tbody style={{textAlign:"center"}}>
    <tr>
      <td><SpeedIcon/></td>
      <td>{props.cheveaux}</td>
      <td></td>
      <td>Expetisée</td>
      <td>{props.expertise}</td>
    </tr>
    <tr>
      <td><CalendarTodayIcon/></td>
      <td>{props.annee}</td>
      <td></td>
      <td>Porte</td>
      <td>{props.porte}</td>
    </tr>
    <tr>
      <td><LocalGasStationIcon /> </td>
      <td>{props.carburant}</td>
      <td></td>
      <td>Cylindrée</td>
      <td>{props.cylindree}</td>
    </tr>
    <tr>
      <td><DriveEtaIcon /> </td>
      <td>{props.moteur}</td>
      <td></td>
      <td>Place</td>
      <td>{props.place}</td>
    </tr>
  </tbody>
</Table>
</>
)}
