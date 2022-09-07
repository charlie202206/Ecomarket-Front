import { useState, useEffect, useRef } from 'react'
import {BrowserRouter, Routes, Route, useParams, Link} from 'react-router-dom';
import axios from 'axios';
//글로벌변수
import {useContext} from "react";
import ContextAPI from "../ContextAPI";
function ReviewList( {itemId} ) {
  //글로벌변수(useContext) ==사용 start
  const context = useContext(ContextAPI);
  console.log(context);
  console.log("props called inside of a function", context.memberEmail, context.memberName, context.memberId, context.memberSalesType, context.memberPhoneNumber);
  if(context.memberId === 0){
   // alert("비정상경로로 접근하였습니다.{" + context.memberId + "}");
   // return;
  }
  // ======= 사용 end
  //const { itemId } = useParams();
  const [reviewCnt, setreviewCnt] = useState();
  const [reviewItem, setReviewItem] = useState([]);

  useEffect(() => {
    axios.get('/reviews/reviewItem/'+ itemId).then((res) => {
      console.log(res);
      console.log(res.data.length);
      setReviewItem(res.data);
      setreviewCnt(res.data.length);
   })
   },[]);

  const reviewItemComponent = reviewItem.map((item, index) => (
    <>
    <hr></hr>
    <div key={index} class="card-body">
      <p>작성일 : {item.reviewDate} </p>
      <p>상품명 : {item.orderItem.itemName}</p>
      <p>만족도 : {item.satisfactionType}</p>
      <p>리뷰 : {item.reviewDescription} </p>
    </div>
    </>
  ));

  return (
    <>
    <div class="card">
      <div class="card-header">
        <h3>전체 리뷰 : {reviewCnt}건</h3>
      </div>
      {reviewItemComponent}
      {/* <div class="card-body">
        <p>작성일 : 2022-07-24 </p>
        <p>상품명 : 폐타이어가방</p>
        <p>만족도 : 좋음</p>
        <p>리뷰 : 아주 좋습니다!!! </p>
      </div>
      <hr></hr>
      <div class="card-body">
        <p>작성일 : 2022-06-25 </p>
        <p>상품명 : 폐타이어가방</p>
        <p>만족도 : 보통</p>
        <p>리뷰 : 들고다니기 좋습니다. 약간의 불편함이 있습니다. </p>
      </div>
      <hr></hr>
      <div class="card-body">
        <p>작성일 : 2022-05-24 </p>
        <p>상품명 : 폐타이어가방</p>
        <p>만족도 : 나쁨</p>
        <p>리뷰 : 상품 수령시 가방이 손상되어 있었습니다. 가방끈이 잘 풀립니다. </p>
      </div> */}
    </div>
    </>
  )
}

export default ReviewList
