import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';

export default function AlertDesign(props) {
  const [show, setShow] = React.useState({visible : props.visible});
  console.log("in " + show.visible);
  if (show.visible === "true") {
    return (
      <Alert variant='danger' show={show.visible} onClick={() => setShow("false")}>
            This is a primary alert check it out!!
      </Alert>
    );
  }
  return("")
}
