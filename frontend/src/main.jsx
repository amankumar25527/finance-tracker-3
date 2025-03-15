import { StrictMode } from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import StoreContextProvider from './context/StoreContext.jsx';
import App from './App.jsx'

ReactDom.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <StoreContextProvider>
        <App/>
      </StoreContextProvider>
   </BrowserRouter>
)
