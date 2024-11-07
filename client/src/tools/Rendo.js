import useSessionState from "../store/sessionState";

export default function Rendo() {
    const sessionState = useSessionState.getState();

        sessionState.socket.send(
            JSON.stringify({
              method: "draw",
              figure: "Rendo",
              id: sessionState.sessionId,
            })
          );
}