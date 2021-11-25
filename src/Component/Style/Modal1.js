import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert';


export default function Modal1(props) {
const [show, setShow] = React.useState(props.showAlert);
const [showModal, setShowModal] = React.useState(props.visible);
const handleClose = () => setShowModal(false);
const handleShow = () => setShowModal(props.visible);
const[connexion, setConnexion] = React.useState({
    resetEmail:""
})


React.useEffect(() => {
  setShowModal(props.visible);
}, [props.visible])

function changeValue(e){
    setConnexion({
        ...connexion, [e.target.id]:e.target.value
    })
}

const btnClose = <Button variant="secondary" onClick={handleClose, props.visiblefalse}>
                        Close
                </Button>

return(
    <>
    {console.log("++" + props.showAlert)}
      <Modal show={showModal} onHide={handleShow, props.visiblefalse} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Récuperation de mot de passe </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="form-group">
                  <label>Email</label>
                  <input type="email" id="resetEmail" required className="form-control" placeholder="Enter email" onChange={changeValue} value={connexion.resetEmail}/>
              </div>
              <div style={{color:"green",fontSize: "12px", display: props.display}}>
                email envoyé
                </div>
          </Modal.Body>
          <Modal.Footer>
            {btnClose}
            <Button variant="primary" onClick={() => props.recup(connexion.resetEmail)}>
                Valider
            </Button>
          <Alert variant='danger' show={show} onClick={() => setShow(props.showAlert) } style={{width:"100%"}}>
              {props.error}
          </Alert>
          </Modal.Footer>
      </Modal>
    </>
)}
