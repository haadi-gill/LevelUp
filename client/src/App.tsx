import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Routes, BrowserRouter} from 'react-router-dom';
import Login from './Components/LoginSignup/Login'
import Register from './Components/LoginSignup/Register'

import './App.css'

function App() {

  return (
    <>
      <div>
        <Login/>
        {/* <BrowserRouter>
          <Routes>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Register' element={<Register/>}/>
          </Routes>
        </BrowserRouter> */}
      </div>
    </>
  )
}

export default App
