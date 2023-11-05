import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import List from './List.jsx'
import Crop from './Crop.jsx'
import './index.css'
import Image from './Image.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   {/* <App />
    <List />*/}
    <Image />
  </React.StrictMode>,
)
