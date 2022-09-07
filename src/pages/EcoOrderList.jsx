// import dummy from '../db/data.json'
import axios from 'axios';
import { useEffect, useState } from 'react';
//글로벌변수
import {useContext} from "react";
import ContextAPI from "../ContextAPI";
function EcoOrderList() {
  //글로벌변수(useContext) ==사용 start
  const context = useContext(ContextAPI);
  console.log(context);
  console.log("props called inside of a function", context.memberEmail, context.memberName, context.memberId, context.memberSalesType, context.memberPhoneNumber);
  if(context.memberId === 0){
   // alert("비정상경로로 접근하였습니다.{" + context.memberId + "}");
   // return;
  }
  // ======= 사용 end
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const params = {
      page: 1,
      size: 100,
    };
    axios
      .get('/ecoOrders/ecoOrders', params)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.content);
        setOrderItems(res.data.content);
      });
  }, []);

  function cancelOrder(ecoOrderId, ecoOrderStatus, e) {
    console.log(ecoOrderId+ecoOrderStatus);

    const params = {
      ecoOrderId: ecoOrderId,
      ecoOrderStatus: 'CANCELED'
    };
    axios
      .patch('/ecoOrder/ecoorders/'+ ecoOrderId, params)
      .then((res) => {
        console.log(res.data);
        // orderItems.map((item) => item.ecoOrderId === res.data.ecoOrderId ?  {...item, ...res.data} : item);
        location.reload();
      });
  }

  return <ul className="list_Order">
    <h1>주문내역</h1>
    <table border={1}>
      <thead>
        <tr>
          {/* <td width="10" align="center"></td> */}
          <td width="70" align="center">주문일자</td>
          <td width="100" align="center">상품명</td>
          <td width="70" align="center">결제금액</td>
          <td width="50" align="center">주문상태</td>
          <td width="50" align="center">결제방법</td>
          <td width="50" align="center">결제상태</td>
          <td width="50" align="center">취소</td>
        </tr>
      </thead>
      <tbody>
        {orderItems.map(orderItem => (
        <tr key={orderItem.ecoOrderId}>
          {/* <td align="center"><input type="checkbox" /></td> */}
          <td align="center">{orderItem.ecoOrderDate}</td>
          <td>{orderItem.ecoOrderProduct}</td>
          <td align="right">{orderItem.totalPrice}</td>
          <td align="center">{orderItem.ecoOrderStatus}</td>
          <td align="center">{orderItem.ecoOrderMethod}</td>
          <td align="center">{orderItem.paymentStatus}</td>
          {/* <td align="center"><button type='submit' onClick={() => {cancelOrder(orderItem.ecoOrderId)}}>X</button></td> */}
          {/* <td align="center"><button type='submit' disabled={(orderItem.ecoOrderStatus!='ORDERED'?true:false)} onClick={() => {cancelOrder(orderItem.ecoOrderId)}}>X</button></td> */}
          <td align="center">{(orderItem.ecoOrderStatus=='ORDERED'?true:false) && <button type='submit' onClick={(e) => {cancelOrder(orderItem.ecoOrderId, orderItem.ecoOrderStatus, e)}}>X</button>}</td>
        </tr>
        ))}
      </tbody>
    </table>
  </ul>;
}

export default EcoOrderList
