import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Suspense fallback={<div>....loading</div>}><Login/></Suspense>}>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
