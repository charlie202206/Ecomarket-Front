// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';


// const Payment = () => {
//   const  params  = useParams();

//   return (
//     <>
//     {params.id}
//     <br></br>
//     {params.price}
//     <br></br>
//     {params.quantity}
//     </>
//   );
// };

// export default Payment;

import axios from 'axios';
import { useLocation } from "react-router";
//글로벌변수
import {useContext} from "react";
import ContextAPI from "../ContextAPI";
function Payment() {
  //글로벌변수(useContext) ==사용 start
  const context = useContext(ContextAPI);
  console.log(context);
  console.log("props called inside of a function", context.memberEmail, context.memberName, context.memberId, context.memberSalesType, context.memberPhoneNumber);
  if(context.memberId === 0){
   // alert("비정상경로로 접근하였습니다.{" + context.memberId + "}");
   // return;
  }
  // ======= 사용 end
  const location = useLocation();
  const orderItems = location.state.orderItems;
  const deliveryId = location.state.deliveryId;
  const ecoPoint = location.state.ecoPoint;
  const ecoOrderId = location.state.ecoOrderId;
  const paymentKind = location.state.paymentKind;
  const paymentMethod = location.state.paymentMethod;
  const totalPrice = location.state.totalPrice;

  let cntItems = location.state.orderItems.length;

  function insertEcoOrder(e) {

    const params = {
      memberId: "1",
      ecoOrderDate: '20220801',
      ecoOrderProduct: orderItems[0].ecoProductName + ' 외 ' + cntItems,
      ecoOrderStatus: "ORDERED",
      totalPrice: totalPrice,
    };
    axios
      .post('/ecoOrder/ecoOrders', params)
      .then((res) => {
        console.log(res.data);
        //location.reload();
      });
  }

  return <ul className="Pyament">
    <h1>결제</h1>
    <table border={1}>
      <tbody>
        <tr>
          <td>ecoOrderId</td>
          <td>{ecoOrderId}</td>
        </tr>
        <tr>
          <td>paymentKind</td>
          <td>{paymentKind}</td>
        </tr>
        <tr>
          <td>paymentMethod</td>
          <td>{paymentMethod}</td>
        </tr>
      </tbody>
    </table>
    <h1> 결제금액 : {totalPrice}</h1>
    <button onClick={insertEcoOrder}>결제하기</button>
  </ul>;
}

export default Payment
