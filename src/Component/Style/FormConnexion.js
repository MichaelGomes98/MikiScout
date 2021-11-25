import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TableCaracteristique(props){
return(
  <form >
                  <h3>Se connecter</h3>

                  <div className="form-group">
                      <label>Email</label>
                      <input type="email" className="form-control" placeholder="Enter email" />
                  </div>

                  <div className="form-group">
                      <label>Mot de passe</label>
                      <input type="password" className="form-control" placeholder="Enter password" />
                  </div>

                  <div className="form-group">
                      <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="customCheck1" />
                          <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                      </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block" onClick={props.openPortailClient}>Se connecter</button>
                  <p className="forgot-password text-right">
                      Pas encore client ? <a href="#" onClick={props.openCreationCompte}>Créer un compte</a>
                  </p>
    </form>
)
}
