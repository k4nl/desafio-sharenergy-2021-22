import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Clients from './pages/Clients';
import Finance from './pages/Finance';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/clients" component={ Clients } />
        <Route exact path="/finance" component={ Finance } />
      </Switch>
    </div>
  );
}

export default App;
