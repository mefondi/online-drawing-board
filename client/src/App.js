import './App.css';
import Canvas from './components/Canvas';
import SettingBar from './components/SettingBar';
import ToolBar from './components/ToolBar';
import { Route, Routes, Navigate} from "react-router-dom";

function App() {
  return (
    <div className="App">
          <Routes>
            <Route path="/:id" element={<div>
            <ToolBar/>
            <SettingBar/>
            <Canvas/>
            </div>}/>
            <Route path="*" element={<Navigate to={`${(+new Date).toString(16)}`} />} />
        </Routes>
    </div>
  );
}

export default App;
