import './App.css'
import { NewsHeader } from './components/header/header'
import { BrowserRouter, Route, Routes } from "react-router";
import { Footer } from './components/footer/footer'
import { Login } from './components/login/login';
 

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<NewsHeader/>}></Route>
      </Routes>
    </BrowserRouter>
  

  )
}

export default App
