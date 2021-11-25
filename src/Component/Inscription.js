import React from 'react';
import "firebase/auth";
import fire from "../fire"
import Alert from 'react-bootstrap/Alert';
import {
  Redirect
} from "react-router-dom";

export default function Inscription(props) {
    const [show, setShow] = React.useState(false);
    const[connexion, setConnexion] = React.useState({
        recherche:"",
        email:"",
        password:"",
        confirmPassword:"",
        messageError:"",
        prenom:"",
        nom:"",
        adresse:"",
        codePostal : "",
        pays : "",
        telephone :"",
        portable:"",
        display:"None"
})
const database = fire.firebase_.database();
let monid = null;

function onChangeValue(e){
    setConnexion({
        ...connexion, [e.target.id]:e.target.value
    })
}

function login(email, password){
    console.log(connexion);
    fire.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
         console.log("mon id : " + user.user.uid);
         monid = user.user.uid;
         fire.auth().onAuthStateChanged(function(user) {
             const client = { idVendeur:monid, email: connexion.email, prenom:connexion.prenom, nom:connexion.nom,adresse:connexion.adresse,codePostal : connexion.codePostal,pays : connexion.pays,telephone :connexion.telephone,portable:connexion.portable}
             const nouvelId = database.ref(`/clients/`).push(client).key;
             setLogger(monid);
             props.connect();
             console.log(`Client ajouté ${nouvelId}`, client);
            setConnexion({...connexion, display:"block"})
         });
        setShow(false)
      })
      .catch((error) => {

        let errorMessage = error.message;
        setShow(true)
        setConnexion({messageError:errorMessage, email : "", password : "", confirmPassword:"", display:"none", nom:"", prenom:"", adresse:"", codePostal:"", pays:"", telephone:"", portable:""})
      });
}

function setLogger(id){
    localStorage.setItem('userId', id);
}

function validation(e){

    if(connexion.confirmPassword === connexion.password && connexion.password != "" && connexion.email !=""){
        login(connexion.email, connexion.password);
        <Redirect to="/portail" />
    }else{
        let message = "Vérifier que vos mots de passes soient similaire et que tous les champs obligatoire soient remplis !!"
        setConnexion({messageError:message, email : "", password : "", confirmPassword:"", display:"none", nom:"", prenom:"", adresse:"", codePostal:"", pays:"", telephone:"", portable:""})
        setShow(true)
    }
}


return(
    <>
    <div style={{width:"70%", margin:"auto", marginTop:"10%"}}>
    <form onSubmit={(e) => e.preventDefault()}>
              <h3>Création de compte</h3>
              <div className="form-group form-inline">
                  <input type="String" id="email" required className="form-control col-lg-5" onChange={onChangeValue} style={{marginRight:"1%"}} placeholder="Email*" value={connexion.email}/>
                  <input type="password"  id="password" required onChange={onChangeValue} className="form-control col-lg-3" style={{marginRight:"1%"}} placeholder="Mot de passe*" value={connexion.password}/>
                  <input type="password" id="confirmPassword" required className="form-control col-lg-3" value={connexion.confirmPassword} onChange={onChangeValue} placeholder="Confirmation de mot de passe*"/>
              </div>
              <div className="form-group form-inline">
                  <input type="Nom" className="form-control col-lg-7" style={{marginRight:"2%"}}placeholder="Nom" id="nom"  value={connexion.nom} onChange={onChangeValue}/><input type="prenom"  className="form-control col-lg-4" placeholder="Prenom" id="prenom"  value={connexion.prenom} onChange={onChangeValue}/>
              </div>
              <div className="form-group form-inline">
                  <input type="text" className="form-control col-lg-8" style={{marginRight:"2%"}}placeholder="Adresse" id="adresse"  value={connexion.adresse} onChange={onChangeValue}/>
                  <input type="text" className="form-control col-lg-3"placeholder="Code postale" id="codePostal" value={connexion.codePostal} onChange={onChangeValue}/>
              </div>
              <div className="form-group form-inline">
                  <input type="text" className="form-control col-lg-3" style={{marginRight:"1%"}}placeholder="Pays" id="pays" value={connexion.pays} onChange={onChangeValue}/>
                  <input type="number" className="form-control col-lg-4" style={{marginRight:"1%"}}placeholder="Téléphone" id="telephone" value={connexion.telephone} onChange={onChangeValue}/>
                  <input type="number" className="form-control col-lg-4"placeholder="Portable" id="portable"  value={connexion.portable} onChange={onChangeValue}/>
              </div>
              <button onClick={() =>validation()} className="btn btn-primary btn-block" style={{width:"94%"}}>Création de compte</button>
    </form>
    <br />
    <Alert variant='danger' show={show} onClick={() => setShow(false) } style={{width:"94%"}}>
        {connexion.messageError}
    </Alert>
    <div style={{color:"green",fontSize: "18px", display: connexion.display}}>
      Compte crée avec succès
      </div>
    </div>
    </>
    )
}
