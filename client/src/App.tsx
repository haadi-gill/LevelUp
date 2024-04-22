import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Home from './Components/Home/Home'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
         <Route path='/' element={ <Login/>} />
         <Route path = '/Login' element={ <Login/>} />
         <Route path='/Register' element={ <Register/>} />
         <Route path='/HomePage/:id' element={<Home/>}/>
       </Routes>
    </BrowserRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={ <Login/>} />
    //     <Route path = '/Login' element={ <Login/>} />
    //     <Route path='/Register' element={ <Register/>} />
    //   </Routes>
    // </BrowserRouter>  
    )
}

export default App