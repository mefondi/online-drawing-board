import { create } from "zustand";

const useCanvasState = create((set, get) => ({
    canvas: [],
    ctx: {},
    undoList: [],
    redoList: [],
    lineWidth: 1,
    fillStyle: '#000',
    strokeStyle: '#000',
    tool: 'Brush',
    setTool: (tool) => set((state) => ({ tool: tool })),
    setLineWidth: (lineWidth) => set((state) => ({ lineWidth: lineWidth })),
    setFillStyle: (fillStyle) => set((state) => ({ fillStyle: fillStyle })),
    setStrokeStyle: (strokeStyle) => set((state) => ({ strokeStyle: strokeStyle })),
    setCanvas: (canvas) => set((state) => ({ canvas: canvas })),
    setCtx: (ctx) => set((state) => ({ ctx: ctx })),
    pushUndoList: (undo) => set((state) => ({undoList: [ ...state.undoList, undo]})),
    setUndoList: (undo) => set((state) => ({undoList: undo})),
    setRedoList: (redo) => set((state) => ({redoList: redo})),
    undo: () => {
        const state = get();
        if (state.undoList.length > 0) {
            const dataUrl = state.undoList.pop();
            state.redoList.push(state.canvas.toDataURL())
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
                state.ctx.drawImage(img, 0, 0, state.canvas.width, state.canvas.height);
            };
            set({ redoList: state.redoList});
            set({ undoList: state.undoList });
        } else {
            state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
        }
    },
    rendo: () => {
        const state = get();
        if (state.redoList.length > 0) {
            const dataUrl = state.redoList.pop();
            state.undoList.push(state.canvas.toDataURL())
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
                state.ctx.drawImage(img, 0, 0, state.canvas.width, state.canvas.height);
            };
            set({ redoList: state.redoList});
            set({ undoList: state.undoList });
        }
    }
}))

export default useCanvasState