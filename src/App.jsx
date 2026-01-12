 
 import '../node_modules/bootstrap/dist/css/bootstrap.css'
 import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
 import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import { NewsHeader } from './components/header/header'
import { NewsCat } from './components/categories/categories'
import { Breaking } from './components/breakingNews/breaking'
import {LatestStories} from './components/news/latestStories'
import { Footer } from './components/footer/footer'
// import { Demofetch } from './components/demofetch'

function App() {
 
  return (
    <div  className='main d-flex flex-column'>
      <NewsHeader></NewsHeader>
      <Footer></Footer>
    </div>

  )
}

export default App
