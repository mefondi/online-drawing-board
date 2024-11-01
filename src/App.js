import './App.css';
import Canvas from './components/Canvas';
import SettingBar from './components/SettingBar';
import ToolBar from './components/ToolBar';

function App() {
  return (
    <div className="App">
      <ToolBar/>
      <SettingBar/>
      <Canvas/>
    </div>
  );
}

export default App;
