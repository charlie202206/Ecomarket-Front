import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'

{/* Delivery */}
import DeliveryAddress from './pages/DeliveryAddress'
import DeliveryInfo from './pages/DeliveryInfo'
import UpdateDeliveryAddress from './pages/UpdateDeliveryAddress'
import DeliveryManagement from './pages/DeliveryManagement'

{/* Ecoproduct */}
import EcoproductList from './pages/EcoproductList'
import EcoproductCreate from './pages/EcoproductCreate'
import EcoproductUpdate from './pages/EcoproductUpdate'
import EcoproductSearch from './pages/EcoproductSearch'
import EcoproductSearchDtl from './pages/EcoproductSearchDtl'
import Payment from './pages/Payment'
import Cart from './pages/Cart'

{/* EcoPoint */}
import EcoPointStandard from './pages/EcoPointStandard'

{/* Disposal */}
import Disposal from './pages/Disposal'

{/* MyPage */}
import MyPage from './pages/MyPage'
// import Temp from './pages/Temp'

{/* Review */}
import Review from './pages/Review'
import ReviewList from './pages/ReviewList'

{/* EcoOrder */}
import Basket from './pages/Basket'
import BasketL from './pages/BasketL'
import EcoOrder from './pages/EcoOrder'
import EcoOrderList from './pages/EcoOrderList'
// import Payment from './pages/Payment'
// import Header from './pages/Header'

{/* Member */}
import Login from './pages/Login';
import NewMember from './pages/NewMember';
import NewMemberList from './pages/NewMemberList';
import SaveMember from './pages/SaveMember';

{/* Global variable set */}
import { ContextProvider } from "./ContextAPI";
import { createContext } from 'react';

const userContext = createContext();
const userInfo = {memberId : 0, memberName : "a", memberEmail : "b", memberPhoneNumber: "d", memberSalesType : "c"};

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
  <ContextProvider value={userInfo}>
    <BrowserRouter>
      <Routes>

        {/* Delivery */}
        <Route path="/" element={<App />}  >
        <Route path="/deliveryAddress" element={<DeliveryAddress />}/>
        <Route path="/deliveryInfo" element={<DeliveryInfo />} />
        <Route path="/updateDeliveryAddress" element={<UpdateDeliveryAddress />} />
        <Route path="/deliveryManagement" element={<DeliveryManagement />} />

        {/* Ecoproduct */}
        <Route path="/ecoproductcreate" element={<EcoproductCreate />} />
        <Route path="/ecoproductlist" element={<EcoproductList />} />
        <Route path="/ecoproductupdate/:id" element={<EcoproductUpdate />} />
        <Route path="/ecoproductsearch" element={<EcoproductSearch />} />
        <Route path="/ecoproductsearchdtl/:id" element={<EcoproductSearchDtl />} />
        <Route path="/basketlist/ecoorder/:id/:price/:quantity/memberid/:name" element={<Payment />} />
        <Route path="/cart/:id/:price/:quantity" element={<Cart />} />

        {/* EcoPoint */}
        <Route path="/ecoPointStandard" element={<EcoPointStandard />} />

        {/* Disposal */}
        <Route path="/disposal" element={<Disposal />} />

        {/* MyPage / Review */}
        {/* <Route path="/" element={<Temp />} /> */}
        <Route path="/myPage/:id" element={<MyPage />} />
        <Route path="/review/:orderItemId" element={<Review />} />
        <Route path="/reviewList/:itemId" element={<ReviewList />} />

        {/* ecoorder */}
        <Route path="/basket" element={<Basket />} />
        <Route path="/basketlist" element={<BasketL />} />
        <Route path="/basketlist/ecoorder" element={<EcoOrder />} />
        <Route path="/ecoorderlist" element={<EcoOrderList />} />
        <Route path="/basketlist/ecoorder/payment" element={<Payment />} />

        {/* Member */}
        <Route path="/" element={<Login />}  ></Route>
        <Route element={<NewMember/>} path="/NewMember"   />
        <Route element={<NewMemberList/>} path="/NewMemberList"  />
        <Route element={<SaveMember/>} path="/SaveMember"  />

        </Route>
      </Routes>
    </BrowserRouter>
    </ContextProvider>
   </React.StrictMode>

)
