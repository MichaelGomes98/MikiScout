import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PicCarousel from './Style/Carousel'
import ButtonDetail from './Style/ButtonDetail'
import TableCaracteristique from './Style/TableCaracteristique'
import TableEquipement from './Style/TableEquipement'
import TableContact from './Style/TableContact'
import Ligne from './Style/Ligne'
import fire from "../fire"
import {
  useLocation
} from "react-router-dom";

export function DetailVehicule(props){
const database = fire.firebase_.database();
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
    },
  },
}));
let location = useLocation();
const classes = useStyles();
let email = null;
let adresse = null;
let numero = null;

const [data, setData] = React.useState({email:"", adresse:"", numero:""});
const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    setIsLoaded(true);
    console.log("getting client info...");
    let ref = database.ref("/clients/");
     ref.orderByChild("idVendeur").equalTo(location.state.vehicule.idVendeur).on("child_added", function(snapshot) {
      email = snapshot.val().email;
      adresse = snapshot.val().adresse;
      numero = snapshot.val().telephone;
      setData({email: email, adresse:adresse, numero:numero})
      });
  }, [isLoaded])

function getVendeurInfo(id){
  console.log("getting client info...");
  let ref = database.ref("/clients/");
   ref.orderByChild("idVendeur").equalTo(id).on("child_added", function(snapshot) {
    email = snapshot.val().email;
    adresse = snapshot.val().adresse;
    numero = snapshot.val().telephone;
    return {email, adresse, numero};
  });
}

  return(
    <>

    <br/>
    <div style={{width: '60%',  margin:"auto"}}>
      <PicCarousel photo={null}/>
    </div>
    <div style={{marginLeft:"20%"}}>
      <h2>{location.state.vehicule.marque} {location.state.vehicule.modele}</h2>
      <h3>CHF {location.state.vehicule.prix} / {location.state.vehicule.kilometre} km</h3>
    </div>
    <div className={classes.root} style={{display: 'flex', justifyContent: 'center'}}>
          <ButtonDetail logo=<AccountBalanceIcon style={{ fontSize: 20 }} /> text="Des leasing avantageux défiant toutes concurrence" />
          <ButtonDetail logo=<AssignmentTurnedInIcon style={{ fontSize: 20 }} /> text="Estimer votre assurance pour ce véhicule" />
    </div>
    <Ligne color="grey" />
    <br/>
    <TableCaracteristique cheveaux={location.state.vehicule.chevaux} expertise={location.state.vehicule.expertise} annee={location.state.vehicule.annee} porte={location.state.vehicule.porte} carburant={location.state.vehicule.essence} cylindree={location.state.vehicule.cylindree} moteur={location.state.vehicule.motricite} place={location.state.vehicule.place}/>
    <br/>
    <Ligne color="grey" />
    <div style={{display: "flex", justifyContent: "spaceBetween"}}>
      <TableEquipement options={location.state.vehicule.listeOption} />
      <TableContact numero={data.numero}email={data.email}adresse={data.adresse} voiture={location.state.vehicule}/>
    </div>
      </>
)}
export default DetailVehicule


//https://www.freakyjolly.com/react-responsive-carousel-image-gallery-with-thumbnails-using-components/#.X7g0zs1KjZs
