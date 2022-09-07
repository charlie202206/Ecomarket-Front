import axios from 'axios';
// import Header from '../component/Header'
//글로벌변수
import {useContext} from "react";
import ContextAPI from "../ContextAPI";
function Basket() {
    //글로벌변수(useContext) ==사용 start
    const context = useContext(ContextAPI);
    console.log(context);
    console.log("props called inside of a function", context.memberEmail, context.memberName, context.memberId, context.memberSalesType, context.memberPhoneNumber);
    if(context.memberId === 0){
      //alert("비정상경로로 접근하였습니다.{" + context.memberId + "}");
      //return;
    }
    // ======= 사용 end

  function addBasket(e) {
    const params = {
      ecoProductId: document.getElementById('ecoProductId').value,
      ecoProductName: document.getElementById('ecoProductName').value,
      ecoProductQty: document.getElementById('ecoProductQty').value,
      ecoProductUnitPrice: document.getElementById('ecoProductUnitPrice').value,
      memberId: "1",
    };
    axios
      .post('/ecoOrders/baskets', params)
      .then((res) => {
        console.log(res.data);
        //location.reload();
      });
  }
  return <ul>
    <h3>상품</h3>
    <table>
      <tbody>
        <tr>
          <td>상품ID  </td>
          <td><input placeholder='상품ID' id='ecoProductId'/></td>
        </tr>
        <tr>
          <td>상품명  </td>
          <td><input placeholder='상품명' id='ecoProductName'/></td>
        </tr>
        <tr>
          <td>수량</td>
          <td><input placeholder='수량' id='ecoProductQty'/></td>
        </tr>
        <tr>
          <td>단가</td>
          <td><input placeholder='단가' id='ecoProductUnitPrice'/></td>
        </tr>
      </tbody>
    </table>
    <div>
      <button type='submit' onClick={addBasket}>장바구니</button> <button>주문하기</button>
    </div>
  </ul>
}

export default Basket
