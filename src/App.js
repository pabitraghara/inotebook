import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import About from "./Components/About";
import {Contactus} from './Components/Contactus';

import NoteState from './Context/notes/NoteState';
import  Alerts  from './Components/Alerts';
import {Login} from './Components/Login';
import {Signup} from './Components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (massege, types) => {
    setAlert({
      massege: massege,
      types: types
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alerts alert={alert} />
          <div className="container">
            <Routes> {/* Use Routes for v6 */}
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About showAlert={showAlert} />} />
              <Route exact path="/contact" element={<Contactus showAlert={showAlert} />} />

              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router >
      </NoteState>
    </>
  );
}

export default App;
