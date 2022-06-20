import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Unauthorized from './components/Unauthorized';
import Login from './pages/Login';
import Admin from './pages/Admin';
import RequireAuth from './components/RequireAuth';
import Customer from './pages/Customer';
import Engineer from './pages/Engineer';
import Notfound from './components/Notfound';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'react-circular-progressbar/dist/styles.css';

function App() {


  const ROLES = {
    'CUSTOMER': 'CUSTOMER',
    'ADMIN': 'ADMIN',
    'ENGINEER':'ENGINEER'
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Suspense fallback={<div>....loading</div>}><Login /></Suspense>}>
          </Route>

          <Route path='unauthorized' element={<Unauthorized />} />
          
          {/* <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}> */}
            <Route path='/admin' exact element={<Admin />}/>
          {/* </Route> */}

          {/* <Route element={<RequireAuth allowedRoles={[ROLES.CUSTOMER]} />}> */}
            <Route path='/customer' exact element={<Customer />}/>
          {/* </Route> */}

          {/* <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]} />}> */}
            <Route path='/engineer' exact element={<Engineer />}/>
          {/* </Route> */}
         
          <Route path='/*' element={<Notfound/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
