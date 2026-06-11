import { Outlet } from 'react-router-dom'
import './App.css'
import { Header } from './Componentes/Header/Header';
import {Footer} from './Componentes/Footer/Footer';

function App() {
  return (
<div className='App'>
  <Header /> 
  <Outlet />
  <Footer />
</div>
  )
}

export default App