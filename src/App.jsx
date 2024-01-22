import { useState , useEffect} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
// import './App.css'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <NavBar/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about'/>
          <Route path='/favorites'/>
          <Route path='/login'/>
        </Routes>
    <Footer />
    </BrowserRouter>

    </>
  )
}

export default App
