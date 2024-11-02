import { create } from "zustand";

const useCanvasState = create((set) => ({
    canvas: {},
    ctx: {},
    fillStyle: null,
    strokeStyle: null,
    lineWidth: null,
    setCanvas: (canvas) => set((state) => ({ canvas: canvas })),
    setСtx: (ctx) => set((state) => ({ ctx: ctx })),
    setFillStyle: (fillStyle) => set((state) => ({ fillStyle: fillStyle})),
    setStrokeStyle: (strokeStyle) => set((state) => ({ strokeStyle: strokeStyle })),
    setLineWidth: (lineWidth) => set((state) => ({ lineWidth: lineWidth })),
}))

export default useCanvasState