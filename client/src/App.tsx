import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Components/LoginSignup/Login'
import Register from './Components/LoginSignup/Register'

import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={ <Login/>} />
        <Route path = '/Login' element={ <Login/>} />
        <Route path='/Register' element={ <Register/>} />
      </Routes>
    </BrowserRouter>  
    )
}

export default App
