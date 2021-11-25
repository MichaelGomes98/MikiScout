import React,  { useEffect }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import fire from "../fire"
import Alert from 'react-bootstrap/Alert';
import Logo from "../Images/person.png";
import Modal1 from './Style/Modal1';
import {
  Link,
  Redirect
} from "react-router-dom";


export default function Connexion(props) {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = React.useState(false);
    const[connexion, setConnexion] = React.useState({
        recherche:"",
        alert:"false",
        message:"",
        email:"",
        password:"",
        messageError:"",
        resetEmail:"",
        errorRecup:"",
        connected:false,
        display:"none"
})
const [modal1, setModal1] = React.useState({show:false})
const [alert, setAlert] = React.useState({show:false})
const [visible, setVisible] = React.useState({display:"none"})


useEffect(() => {
    userLogged();
}, []);

function login(e){
        fire.auth().signInWithEmailAndPassword(connexion.email, connexion.password)
          .then((user) => {
            console.log(connexion.email + " is connected");
            props.connect();
            setConnexion({...connexion, connected:true})
            setLog();
          })
          .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            setConnexion({
                ...connexion, messageError:errorMessage
            })
            setShow(true)
          })
}

function recup(email){
    console.log(email + " lancement de la récuperation ");
    let auth = fire.auth();
    let emailAddress = email;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
      setVisible({display:"block"})
      console.log("email envoyé à " + emailAddress);
    }).catch(function(error) {
      // An error happened.
      console.log(error);
      setConnexion({
          ...connexion, errorRecup:error
      })
      visibleAlert();
    });
}

function visibleAlert(){
    setAlert({show:true});
}

//reset du mode du modal
function visibleFalse(){
    setModal1({show:false});
    setVisible({display:"none"})
}

function changeValue(e){
    setConnexion({
        ...connexion, [e.target.id]:e.target.value
    })
}


function setLog(){
    fire.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        localStorage.setItem('userId', user.uid);
        <>
        {console.log("connceted")}
        </>
    } else {
        // No user is signed in.
        <>
        {console.log("not connected")}
        </>
    }})
}

function userLogged(){
    if (localStorage.getItem('userId') != null) {
        setConnexion({...connexion, connected:true});
    }
}

if(connexion.connected){
    return(
        <>
        {userLogged}
        <Redirect to="/portail" />
        </>
    )
}else if(!connexion.connected){
 return(
    <>
    <div style={{width:"70%", margin:"auto", marginTop:"10%", borderStyle: "solid", borderRadius:"15px", borderColor:"gray", padding:"5%"}}>
    <form>
        <h3 style={{textAlign:"center"}}><img src={Logo} style={{width: "4%", height: "auto"}}alt="login"/>Connexion</h3>
        <div className="form-group">
            <label>Email</label>
            <input type="email" id="email" required className="form-control" placeholder="Enter email" onChange={changeValue} value={connexion.email}/>
        </div>
        <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" id="password" required className="form-control" placeholder="Enter password" onChange={changeValue}value={connexion.password}/>
        </div>
        <div className="form-group">
            <a href="#" variant="primary" onClick={() => setModal1({show:true})}  style={{width:"94%"}}>Mot de passe oublié</a>
        </div>
        <button type="button" className="btn btn-primary btn-block" onClick={() => login()}>Se connecter</button>
        <p className="forgot-password text-right">
            <Link className="nav-link"   to="/creation">Créer un compte</Link>
        </p>
    </form>
    <Alert variant='danger' show={show} onClick={() => setShow(false) } style={{width:"100%"}}>
      {connexion.messageError}
    </Alert>
    </div>
    <Modal1 recup={recup} visible={modal1.show} visiblefalse={visibleFalse} error={connexion.errorRecup} showAlert={alert.show} display={visible.display}/>
    </>
)}
}
