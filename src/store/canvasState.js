import { create } from "zustand";

const useCanvasState = create((set) => ({
    canvas: {},
    setCanvas: (canvas) => set((state) => ({ canvas: canvas }))
}))

export default useCanvasState