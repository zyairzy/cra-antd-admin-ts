import './App.less';
import { HashRouter as Router } from 'react-router-dom';
import RenderRouter from './routes';

function App() {
  return (
    <Router>
      <RenderRouter></RenderRouter>
    </Router>
  );
}

export default App;
