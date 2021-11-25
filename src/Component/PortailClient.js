import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import fire from "../fire"

export default function PortailClient(props) {
    const[portail, setPortail] = React.useState({
        recherche:"",
        marque: "",
        modele: "",
        kilometre : "",
        annee:"",
        prix:"",
        option1:"",
        option2:"",
        option3:"",
        chevaux: "",
        porte:"",
        cylindree:"",
        essence:"",
        motricite:"",
        expertise:"",
        place:"",
        disabled: false,
        vehicule:""

})
const [show, setShow] = React.useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [show2, setShow2] = React.useState(false);
const handleClose2 = () => setShow2(false);
const handleShow2 = () => setShow2(true);
const database = fire.firebase_.database();
let lstAnnonce = [];
let id = "";

const classes = useStyles();

function save(){

    let userId = fire.auth().currentUser.uid;
    let listeOption = []
    listeOption.push(portail.option1, portail.option2, portail.option3);
    const annonce = {marque: portail.marque, modele: portail.modele, kilometre : portail.kilometre, annee:portail.annee, prix:portail.prix, listeOption:listeOption, idVendeur:userId, chevaux: portail.chevaux, porte:portail.porte, cylindree:portail.cylindree, essence:portail.essence, motricite:portail.motricite, expertise:portail.expertise, place:portail.place}
    const nouvelId = database.ref(`/annonces/`).push(annonce).key;
    id = nouvelId;
    handleClose()
    console.log(`Produit ajouté ${nouvelId}`, annonce);
}

function _remove(v){
  database.ref(`/annonces/${v.parent}`).remove(error=>{
    if (error) {
      console.warn(`La suppression de a échoué`, error);
    } else {
      deleteInList(v.parent);
      console.log(`La suppression de a été faite` + v.marque);
      handleClose2();
    }
  });
}

function deleteInList(parent){
  for (var i = 0; i < lstAnnonce.length; i++) {
    if (lstAnnonce[i].parent == parent) {
        lstAnnonce.splice(i, 1);
    }
  }
}

function getAll(){
  let userId = fire.auth().currentUser.uid;
  var ref = database.ref("annonces");
  ref.orderByChild("idVendeur").equalTo(userId).on("child_added", function(snapshot) {
    let data = snapshot.val();
    data.parent = snapshot.key;
    lstAnnonce.push(data);
  });
}


function change(e){
  setPortail({
    ...portail, [e.target.id] : e.target.value
  })
}

function checkNotNull(){
    if(portail.marque != "" && portail.modele != "" && portail.kilometre != "" && portail.annee != "" && portail.prix != ""  != portail.chevaux != "" && portail.porte != "" && portail.cylindree != "" && portail.essence != "" && portail.motricite != ""){
        return true;
    }
}

const form =  <form >
                <div className="form-group form-inline">
                    <input type="text" id="marque" onChange={change} value={portail.marque} className="form-control col-lg-5" style={{marginRight:"2%"}}placeholder="Marque"/><input type="Modele" className="form-control col-lg-6" placeholder="Modele" id="modele" onChange={change} value={portail.modele} required/>
                </div>
                <div className="form-group form-inline">
                    <input type="text" className="form-control col-lg-5" style={{marginRight:"1%"}}placeholder="Kilometre*" id="kilometre" onChange={change} value={portail.kilometre} required/>
                    <input type="text" className="form-control col-lg-3" style={{marginRight:"1%"}} placeholder="Année*" id="annee" onChange={change} value={portail.annee} required/>
                    <input type="number" className="form-control col-lg-3" placeholder="Prix*" id="prix" onChange={change} value={portail.prix} required/>
                </div>
                <div className="form-group form-inline">
                    <input type="text" className="form-control col-lg-3" style={{marginRight:"1%"}}placeholder="Option 1" id="option1" onChange={change} value={portail.option1} required/>
                    <input type="text" className="form-control col-lg-4" style={{marginRight:"1%"}}placeholder="Option 2" id="option2" onChange={change} value={portail.option2} required/>
                    <input type="text" className="form-control col-lg-4" style={{marginRight:"1%"}}placeholder="Option 3" id="option3" onChange={change} value={portail.option3} required/>
                </div>
                <div className="form-group form-inline">
                    <input type="text" className="form-control col-lg-3" style={{marginRight:"1%"}}placeholder="chevaux" id="chevaux" onChange={change} value={portail.chevaux} required/>
                    <input type="text" className="form-control col-lg-2" style={{marginRight:"1%"}}placeholder="cylindree" id="cylindree" onChange={change} value={portail.cylindree} required/>
                    <select className="form-control col-lg-3" style={{marginRight:"1%"}} placeholdename="porte" id="porte" onChange={change} value={portail.porte} required>
                      <option value="">--Porte--</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="5">5</option>
                    </select>
                    <select className="form-control col-lg-3" style={{marginRight:"1%"}} placeholdename="place" id="place" onChange={change} value={portail.place} required>
                      <option value="">--place--</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="5">5</option>
                      <option value="7">7</option>
                    </select>
                </div>
                <div className="form-group form-inline">
                    <select className="form-control col-lg-3" style={{marginRight:"2%"}} placeholdename="essence" id="essence" onChange={change} value={portail.essence} required>
                      <option value="">--Essence--</option>
                      <option value="diesel">diesel</option>
                      <option value="essence">essence</option>
                      <option value="autre">autre</option>
                    </select>
                    <select className="form-control col-lg-4" style={{marginRight:"1%"}} placeholdename="motricite" id="motricite" onChange={change} value={portail.motricite} required>
                      <option value="">--Motricité--</option>
                      <option value="Propulsion">Propulsion</option>
                      <option value="Traction">Traction</option>
                      <option value="Transmision">Transmision</option>
                    </select>
                    <select className="form-control col-lg-4" style={{marginRight:"1%"}} placeholdename="expertise" id="expertise" onChange={change} value={portail.expertise} required>
                      <option value="">--Expertisée--</option>
                      <option value="Oui">Oui</option>
                      <option value="Non">Non</option>
                    </select>
                </div>
                <div className="form-group form-inline">
                <button type="button" onClick={() => window.open("file:///c:/")}className="btn btn-primary btn-block" style={{width:"94%"}}>Ajouter des photos</button>
                </div>

            </form>


const btnClose = <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>

const btnSave = <Button variant="primary" disabled={portail.disabled} onClick={() =>save()} >
                  Save Changes
                </Button>

const btnClose2 = <Button variant="secondary" onClick={handleClose}>
                                    Annuler
                                </Button>

const btnSave2 = <Button variant="primary" onClick={() =>_remove(portail.vehicule)}>
                                  Oui
                                </Button>

function modalRemove(vehicule){
  setPortail({
    vehicule:vehicule
  })
  handleShow2();
}



function generateGrid(){
  let array = []
  for(let v of lstAnnonce){
    array.push(
      <div className={classes.root} style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', width:"100"}}>
                            <Paper  style={{ width: '94%', cursor:'hand'}} onClick={() =>null} >
                              <Grid container spacing={2}>
                                <Grid item>
                                  <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
                                  </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                  <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                      <Typography gutterBottom variant="subtitle1">
                                        {v.marque} {v.modele}
                                      </Typography>
                                      <Typography variant="body2" gutterBottom>

                                      </Typography>
                                      <Typography variant="body2" color="textSecondary">
                                         {v.kilometre} km / {v.annee}
                                      </Typography>
                                    </Grid>
                                    <Grid item>
                                      <Typography variant="body2" style={{ cursor: 'pointer' }} onClick={() => modalRemove(v)}>
                                        Remove
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                  <Grid item>
                                    <Typography variant="subtitle1">{v.prix}.-</Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Paper>
                            <br/>
                            <br/>
                          </div>
    )
  }
  return array;
}

return(
    <>
    {getAll()}
        <div style={{width:"80%", margin:"auto", marginTop:"10%"}}>
            <form >
                <h3> Mes annonces </h3>
                        {generateGrid().map(e => e)}
                        <Button variant="primary" onClick={handleShow} style={{width:"94%"}}>
                            Créer un annonce
                        </Button>
                        <br/>
                        <br/>
                        <Modal show={show} onHide={handleClose} animation={false}>
                            <Modal.Header closeButton>
                              <Modal.Title>Annonce</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {form}
                            </Modal.Body>
                            <Modal.Footer>
                              {btnClose}
                              {btnSave}
                            </Modal.Footer>
                        </Modal>
                        <Modal show={show2} onHide={handleClose2} animation={false}>
                            <Modal.Header closeButton>
                              <Modal.Title>Suppression</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Etes-vous sur de vouloir supprimer cette annonce ?
                            </Modal.Body>
                            <Modal.Footer>
                              {btnClose2}
                              {btnSave2}
                            </Modal.Footer>
                        </Modal>
                </form>
            </div>
        </>
    )
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
