import { create } from "zustand";

const useToolState = create((set) => ({
    tool: null,
    setTool: (tool) => set((state) => ({ tool: tool }))
}))

export default useToolState