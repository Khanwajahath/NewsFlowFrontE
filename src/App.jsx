import './App.css'
import { NewsHeader } from './components/header/header'
import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from './components/login/login';
import { Register } from './components/Register/Register';
import { LandingPage } from './components/landingPage/landingpage';
 

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage></LandingPage>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/newsboard' element={<NewsHeader/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
