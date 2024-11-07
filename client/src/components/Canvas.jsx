import React, { useEffect, useRef, useState } from "react";
import st from "./style/canvas.module.css";
import useCanvasState from "../store/canvasState";
import useSessionState from "../store/sessionState";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import serverRequests from "../utils/serverRequests";
import Brush from "../tools/Brush.js";
import AddUndo from "../tools/AddUndo.js";

export default function Canvas() {
  const { setCanvas, pushUndoList } = useCanvasState();
  const { username, setUsername } = useSessionState();
  const [modal, setModal] = useState(true);
  const canvasRef = useRef();
  const usernameRef = useRef();
  const id = useParams().id;

  useEffect(() => {
    setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    Brush();
    serverRequests(username, id);
  }, [username]);

  const connectHandler = () => {
    setUsername(usernameRef.current.value);
    setModal(false);
  };
  return (
    <div className={st.canvas}>
      <Modal show={modal} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Введите ваше имя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={usernameRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => connectHandler()}>
            войти
          </Button>
        </Modal.Footer>
      </Modal>

      <canvas
        onMouseDown={() => AddUndo(canvasRef)}
        ref={canvasRef}
        width={1600}
        height={700}
      />
    </div>
  );
}
