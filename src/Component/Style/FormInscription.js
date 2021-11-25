import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FormInscription(props){
return(
        <form >
                  <h3>Création de compte</h3>
                  <div className="form-group form-inline">
                      <input type="Nom" className="form-control col-lg-7" style={{marginRight:"2%"}}placeholder="Nom"/><input type="prenom" className="form-control col-lg-4" placeholder="Prenom"/>
                  </div>
                  <div className="form-group form-inline">
                      <input type="Email" className="form-control col-lg-5" style={{marginRight:"1%"}}placeholder="Email*"/>
                      <input type="password" className="form-control col-lg-3" style={{marginRight:"1%"}} placeholder="Mot de passe*"/>
                      <input type="password" className="form-control col-lg-3" placeholder="Confirmation de mot de passe*"/>
                  </div>
                  <div className="form-group form-inline">
                      <input type="text" className="form-control col-lg-8" style={{marginRight:"2%"}}placeholder="Adresse"/>
                      <input type="text" className="form-control col-lg-3"placeholder="Code postale"/>
                  </div>
                  <div className="form-group form-inline">
                      <input type="text" className="form-control col-lg-3" style={{marginRight:"1%"}}placeholder="Pays"/>
                      <input type="number" className="form-control col-lg-4" style={{marginRight:"1%"}}placeholder="Téléphone"/>
                      <input type="number" className="form-control col-lg-4"placeholder="Portable"/>
                  </div>
                  <button onClick={props.login} className="btn btn-primary btn-block" style={{width:"94%"}}>Création de compte</button>
             </form>
)}
