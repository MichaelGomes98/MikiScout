import React,  { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import fire from "../fire"


export default function MesInformations(props) {
    const[connexion, setConnexion] = React.useState({
        recherche:"",
        email:"",
        password:"",
        confirmPassword:"",
        messageError:"",
        nom:"",
        prenom:"",
        adresse:"",
        codePostal:"",
        pays:"",
        telephone:"",
        portable:"",
        visible: "none"
    })
    const [data, setData] = React.useState({})
    const [id, setID] = React.useState("")

const database = fire.firebase_.database();


const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    setIsLoaded(true);
    console.log("getting data info...");
    let userId = fire.auth().currentUser.uid;
    let ref = database.ref("/clients/");
        ref.orderByChild("idVendeur").equalTo(userId).on("child_added", function(snapshot) {
          setData(snapshot.val());
          setID(snapshot.key);
       });
  }, [isLoaded])



function onChangeValue(e){
  setConnexion({
    ...connexion, [e.target.id] : e.target.value
  })
}


function modification(){
    initialize();
    const client = {"nom":connexion.nom,"prenom":connexion.prenom,"adresse":connexion.adresse,"codePostal":connexion.codePostal,"pays":connexion.pays,"telephone":connexion.telephone,"portable":connexion.portable}
    database.ref(`/clients/`).child(id).update(client);
    if(!noChange()){
        setConnexion({visible:"block"})
    }
}

function initialize(){
    if(connexion.nom === ""){
        connexion.nom = data.nom
    }
    if(connexion.prenom === ""){
        connexion.prenom = data.prenom
    }
    if(connexion.adresse === ""){
        connexion.adresse = data.adresse
    }
    if(connexion.codePostal === ""){
        connexion.codePostal = data.codePostal
    }
    if(connexion.pays === ""){
        connexion.pays = data.pays
    }
    if(connexion.telephone === ""){
        connexion.telephone = data.telephone
    }
    if(connexion.portable === ""){
        connexion.portable = data.portable
    }
}

function noChange(){
    if(connexion.nom === data.nom && connexion.prenom === data.prenom && connexion.adresse === data.adresse && connexion.codePostal === data.codePostal && connexion.pays === data.pays && connexion.telephone === data.telephone && connexion.portable === data.portable){
        return true;
    }
    return false
}


  return(
    <>
    <div style={{width:"70%", margin:"auto", marginTop:"10%"}}>
    <form onSubmit={(e) => e.preventDefault()}>
              <h3>Mes informations</h3>
              <div className="form-group form-inline">
                  <input type="Nom" className="form-control col-lg-7" style={{marginRight:"2%"}} id="nom"  value={connexion.nom} onChange={onChangeValue} placeholder={"Nom : " + data.nom}/><input type="prenom" value={connexion.prenom}className="form-control col-lg-4" placeholder={"Prenom : " + data.prenom} id="prenom" onChange={onChangeValue}/>
              </div>
              <div className="form-group form-inline">
                  <input type="text" className="form-control col-lg-8" style={{marginRight:"2%"}}placeholder={"Adresse : " + data.adresse} id="adresse" value={connexion.adresse} onChange={onChangeValue}/>
                  <input type="text" className="form-control col-lg-3"placeholder={"Code postal : " + data.codePostal} id="codePostal"  value={connexion.codePostal} onChange={onChangeValue}/>
              </div>
              <div className="form-group form-inline">
                  <input type="text" className="form-control col-lg-3" style={{marginRight:"1%"}}placeholder={"Pays : " + data.pays} value={connexion.pays} id="pays" onChange={onChangeValue}/>
                  <input type="text" className="form-control col-lg-4" style={{marginRight:"1%"}}placeholder={"Telephone : " + data.telephone} value={connexion.telephone} id="telephone"  onChange={onChangeValue}/>
                  <input type="text" className="form-control col-lg-4"placeholder={ "Portable : " + data.portable} id="portable"  value={connexion.portable} onChange={onChangeValue}/>
              </div>
              <button  className="btn btn-primary btn-block" style={{width:"94%"}} onClick={() => modification()}>Sauvegarder les modifications </button>
         </form>
         <br />
         <div style={{color:"green",fontSize: "15px", textAlign:"center", display: connexion.visible}}>
           Element enregistré
         </div>
    </div>
    </>
)}
