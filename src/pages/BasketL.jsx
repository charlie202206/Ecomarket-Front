import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BasketL() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  
  useEffect((e) => {
    //e.preventDefault();
    
    const params = {
      page: 1,
      size: 100
    };
    axios
      .get('/ecoOrders/baskets', params)
      .then((res) => {
       // e.preventDefault();
        console.log(res.data);
        console.log(res.data.content);
        setItems(res.data.content);
      });
  }, []);

  function deleteProduct(basketId, e) {
    //e.preventDefault();
    axios
      .delete('/ecoOrders/baskets/'+ basketId)
      .then((res) => {
        console.log(res.data);
        deleteItem(basketId);
      });
  }

  function deleteItem(basketId) {
    let delItems = items.filter(item => item.basketId !== basketId); 
    setItems(delItems);
  }

  function totalPrice(product) {
    return  product.reduce((prev, current) => prev + (current.ecoProductUnitPrice * current.ecoProductQty), 0);
  }

  return <ul className="list_item">
    <h1>장바구니</h1>
    <table border={1}>
      <thead>
        <tr>
          {/* <td width="10" align="center"><input type="checkbox" /></td> */}
          <td width="100" align="center">상품명</td>
          <td width="70" align="center">수량</td>
          <td width="50" align="center">단가</td>
          <td width="50" align="center">금액</td>
          <td width="10" align="center">삭제</td>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
        <tr key={item.basketId}>
          {/* <td align="center"><input type="checkbox" onChange={() => {checkedProduct(item.basketId, item.ecoProductQty * item.ecoProductUnitPrice)}} /></td> */}
          <td>{item.ecoProductName}</td>
          <td align="center">{item.ecoProductQty}</td>
          <td align="right">{item.ecoProductUnitPrice}</td>
          <td align="rigth">{item.ecoProductQty * item.ecoProductUnitPrice}</td>
          <td align="center"><button type='submit' onClick={(e) => {deleteProduct(item.basketId, e)}}>X</button></td>
        </tr>
        ))}
      </tbody>
    </table>
    <h1> 합계 : {totalPrice(items)} 원</h1>
    <button type='submit' onClick={() => {navigate('/basketlist/ecoorder', {state: {items: items,},})}}>주문하기</button>
  </ul>;
}

export default BasketL
