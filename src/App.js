import './App.css';
import Acceuil from './Component/Acceuil';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavDropdown, Form} from 'react-bootstrap'
import React,  { useEffect } from 'react';
import Connexion from './Component/Connexion';
import Inscription from './Component/Inscription';
import PortailClient from './Component/PortailClient';
import DetailVehicule from './Component/DetailVehicule';
import MesInformations from './Component/MesInformations';
import { Button } from '@material-ui/core';
import fire from "./fire";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";



function App() {
const[connexion, setConnexion] = React.useState({
  connected:"false"
})

useEffect(() => {
    isConnected();
}, []);

useEffect(() => {
    getConnection();
}, []);

function isConnected(){
  if (connexion.connected == "false"){
    return(
    <Form inline>
      <Button variant="outline-success" id="connected">
        <Link style={{color: "inherit"}}  className="nav-link"   to="/connexion">
        Connexion
        </Link>
      </Button>
    </Form>
   )
  }else{
    return(
      <NavDropdown  style={{color: "black", color:"inherit", borderRadius: "50px", marginRight:"5px",  paddingLeft:"25px", paddingRight:"25px"}} title="Mon compte" id="basic-nav-dropdown">
        <NavDropdown.Item style={{color: "#ff7255", textAlign:"center",borderBottomStyle: "none", borderBottom: "0px"}}><Link style={{color: "inherit"}} className="nav-link"   to="/portail">Mes annonces</Link></NavDropdown.Item>
        <NavDropdown.Item><Link style={{color: "inherit", textAlign:"center"}} className="nav-link"   to="/informations">Mes informations</Link></NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item style={{textAlign:"center", fontWeight: "bold"}} onClick={logOut}><Link style={{color: "inherit", textAlign:"center"}} className="nav-link"   to="/">Déconnexion</Link></NavDropdown.Item>
    </NavDropdown>
    )
}
}

function getConnection(){
  if (localStorage.getItem('userId') != null){
    setLog()
  }
}

function logOut(){
  setConnexion({...connexion, connected:"false"});
  <Redirect to="/connexion" />
  fire.auth().signOut().then(function() {
    localStorage.removeItem('userId');
    }).catch(function(error) {
    // An error happened.
    });
}



function setLog(){
  setConnexion({
        ...connexion,
        connected:"true"
    })
}

return(
  <>
<Router path="/:testvalue">
    <Navbar style={{backgroundColor:"gray"}} expand="lg">
                   <Navbar.Brand><Link style={{color: "inherit"}} className="nav-link"   to="/">MikiScout</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" style={{color:"black"}}>
                          </Nav>
                          {isConnected()}
                      </Navbar.Collapse>
    </Navbar>

    <Switch>
          <Route path="/connexion">
            <Connexion connect={setLog}/>
          </Route>
          <Route path="/portail" component={PortailClient}>
            <PortailClient/>
          </Route>
          <Route path="/creation">
            <Inscription connect={setLog}/>
          </Route>
          <Route exact path='/detail' component={DetailVehicule}>
            <DetailVehicule />
          </Route>
          <Route exact path='/informations'>
            <MesInformations />
          </Route>
          <Route path="/">
            <Acceuil/>
          </Route>

        </Switch>
</Router>

  </>
)


}

export default App;


//NavBar : https://react-bootstrap.github.io/components/navbar/
