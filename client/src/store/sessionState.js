import { create } from "zustand";

const useSessionState = create((set, get) => ({
    username: '',
    socket: null,
    sessionId: null,
    setSocket: (socket) => set((state) => ({ socket: socket })),
    setSessionId: (sessionId) => set((state) => ({ sessionId: sessionId })),
    setUsername: (username) => set((state) => ({ username: username })),
}))

export default useSessionState