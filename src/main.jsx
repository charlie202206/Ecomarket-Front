import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'

import DeliveryAddress from './pages/DeliveryAddress'
import DeliveryInfo from './pages/DeliveryInfo'
import UpdateDeliveryAddress from './pages/UpdateDeliveryAddress'
import DeliveryManagement from './pages/DeliveryManagement'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
        <Route path="/deliveryAddress" element={<DeliveryAddress />}/>
        <Route path="/deliveryInfo" element={<DeliveryInfo />} />
        <Route path="/updateDeliveryAddress" element={<UpdateDeliveryAddress />} />
        <Route path="/deliveryManagement" element={<DeliveryManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>

)
