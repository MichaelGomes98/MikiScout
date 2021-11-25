import React,  { useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import DetailVehicule from './DetailVehicule';
import Form from 'react-bootstrap/Form'
import Card from './Style/Card'
import fire from "../fire"
import Line from './Style/Ligne'
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";




export default function Acceuil(props) {
  const classes = useStyles();
  let match = useRouteMatch();
  const[vehicule, setVehicule] = React.useState({
  recherche : "",
  mode:"liste",
  vehicule : {},
  liste: props.liste
})
  const database = fire.firebase_.database();
  const liste = [];
  const useComponentWillMount = func => {
  const willMount = useRef(true);
  if (willMount.current) {
    connect();
  }
  };

useComponentWillMount(() => connect());

  function openDetail(v){
    setVehicule({
      ...vehicule,
      vehicule: v
    })
  }


  function gestionGrid(list){
    let array = []
    for(let v of list){
      array.push(
        <Card onClick={()=>setVehicule({...vehicule, vehicule : v})} detail={() => openDetail(v)} objet={v} vehicule={v}/>
      )
    }
    return array;
  }

  function rechercheChange(e){
    setVehicule({
      ...vehicule, recherche : e.target.value
    })
  }

  function changeRecheche(){
    let selectBox = document.getElementById("filterM");
    setVehicule({
      ...vehicule, recherche : selectBox.value
    })
  }

  function changeRechecheModele(){
    let selectBox = document.getElementById("filterMod");
    setVehicule({
      ...vehicule, recherche : selectBox.value
    })
  }

  function filtreMarque(liste, type){
    let lst = liste.map(item => item.marque).filter((value, index, self) => self.indexOf(value) === index)
    return(
          <Form.Group>
            <Form.Control as="select" id="filterM"  onChange={() => changeRecheche()}>
              <option value="">Tous</option>
              {lst.map(e => <option value={e}>{e}</option>)}
            </Form.Control>
          </Form.Group>
    )
  }

  function filtreModele(liste, type){
    let lst = liste.map(item => item.modele).filter((value, index, self) => self.indexOf(value) === index)
    return(
          <Form.Group>
            <Form.Control as="select" id="filterMod"  onChange={() => changeRechecheModele()}>
              <option value="">Tous</option>
              {lst.map(e => <option value={e}>{e}</option>)}
            </Form.Control>
          </Form.Group>
    )
  }

  function connect(){
    database.ref('/annonces/').on('value', snapshot =>{
      const voiture = snapshot.val();
      for(const key in voiture){
          liste.push(voiture[key])
      }
    });
  }

  const listeFiltre = liste.filter(e => vehicule.recherche.toUpperCase() === "" || e.marque.toUpperCase().startsWith(vehicule.recherche.toUpperCase()) || e.modele.toUpperCase().startsWith(vehicule.recherche.toUpperCase()))
    return (
      <>
      <div style={{display: "flex", justifyContent: "spaceBetween"}}>
          <div style={{width:"30%", marginLeft:"1%", marginTop:"2%"}}>
            <form className={classes.root} noValidate autoComplete="off" style={{marginBottom:"5%"}}>
              <TextField id="outlined-basic" style={{width:"80%"}}label="Recherche Rapide" variant="outlined" onChange={rechercheChange} value={vehicule.recherche}/>
            </form>
            <div style={{width:"80%"}}>
              <b>Marques</b>
              {filtreMarque(liste, "marque")}
              <b>Modele</b>
              {filtreModele(liste, "modele")}
              <Line Color="black" />
            </div>
          </div>
          <div style={{width:"100%", marginTop:"2%"}}>
              {gestionGrid(listeFiltre).map(e => e)}
          </div>
      </div>
      </>
    );
      <Switch>
        <Route path={`${match.path}/detail`}>
          <DetailVehicule/>
        </Route>
      </Switch>
  }


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);



//Source des grid : https://material-ui.com/components/grid/
//Input : https://material-ui.com/components/text-fields/
