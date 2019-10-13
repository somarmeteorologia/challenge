import React from "react";
import { withRouter } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalFeedBack({ show, onHide, onClick, history }) {
  const { state } = history.location;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Consulta não disponível</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Infelizmente não foi possível consultar a cidade{" "}
          <b>{state.city_name}</b>.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="dark" onClick={onClick}>
          Consultar outra cidade
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default withRouter(ModalFeedBack);
