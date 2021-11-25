import React from 'react';
import Table from 'react-bootstrap/Table'
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';

export default function TableContact(props){
  function openMail(){
    window.location.href = "mailto:"+props.email+'?cc='+ "" +'&subject='+"Concerne : " + props.voiture.marque+ " "+ props.voiture.modele +" sur mikiscout"+'&body='+"Bonjour, votre offre m'interesse. Pouvez-vous me donner toutes les informations nécessaire concernant ce véhicule svp ?";
  }

  function openMaps(){
    window.open('http://maps.google.com/maps?saddr='+props.adresse, '_blank');
  }
  
  return(
        <Table size="s" style={{marginRight:"20%", width:"30%"}}>
          <thead>
            <tr>
              <th colSpan="5" style={{textAlign:"center"}}><h4>Contacter le vendeur</h4></th>
            </tr>
          </thead>
          <tbody style={{textAlign:"center",width:"50%"}}>
          <tr>
          <Button>
            <td style={{borderStyle: "none"}}>
              <PhoneIcon style={{ fontSize: 20 }} />
            </td>
            <td style={{borderStyle: "none"}}>
              {props.numero}
            </td>
            </Button>
          </tr>
          <tr>
          <Button onClick={()=>openMail()}>
          <td style={{borderStyle: "none"}}>
            <EmailIcon style={{ fontSize: 20 }} />  {props.email}
          </td>
          </Button>
          </tr>
          <tr>
          <Button onClick={()=>openMaps()}>
          <td style={{borderStyle: "none"}}>
            <HomeIcon style={{ fontSize: 20 }} />  {props.adresse}
          </td>
          </Button>
          </tr>
          </tbody>
        </Table>
  )
}
