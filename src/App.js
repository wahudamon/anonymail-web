import { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import Navibar from './components/Navibar';

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const CreateMail = lazy(() => import('./pages/CreateMail'))

function App() {
  return (
    <Router>
      <Suspense fallback={""}>
        <div>
          <Navibar />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/create-mail" component={CreateMail} />
          </Switch>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
