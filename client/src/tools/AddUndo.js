import useSessionState from "../store/sessionState";

export default function addUndo(canvasRef) {
    const sessionState = useSessionState.getState();
    const Url = canvasRef.current.toDataURL()
        sessionState.socket.send(
            JSON.stringify({
              method: "draw",
              figure: "AddUndo",
              id: sessionState.sessionId,
              Url: Url,
            })
          )
}