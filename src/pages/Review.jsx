import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate , useParams } from 'react-router-dom';
//글로벌변수
import {useContext} from "react";
import ContextAPI from "../ContextAPI";

let good = 0;
let normal = 0;
let bad = 0;

const Review = () => {
  //글로벌변수(useContext) ==사용 start
  const context = useContext(ContextAPI);
  console.log(context);
  console.log("props called inside of a function", context.memberEmail, context.memberName, context.memberId, context.memberSalesType, context.memberPhoneNumber);
  if(context.memberId === 0){
   // alert("비정상경로로 접근하였습니다.{" + context.memberId + "}");
   // return;
  }
  // ======= 사용 end
  let memberId = '1';

  const [g_reviewId, setReviewId] = useState();
  const { orderItemId } = useParams();
  const [satisfaction, setSatisfaction] = useState();
  const [orderItem, setOrderItem] = useState({
      orderItemId: "",
      itemId: "",
      itemName: ""
  });
  const [review, setReview] = useState({
    reviewId : "",
    memberId : "",
    orderItem : "",
    reviewDescription : "",
    satisfactionType : "",
    reviewDate : ""
  });

  function check(param) {
    console.log(param)

    good = 0;
    normal = 0;
    bad = 0;

    if(param === 'GOOD') good = 1
    else if (param === 'NORMAL') normal = 1
    else if (param === 'BAD') bad = 1
    console.log(good);
    console.log(normal);
    console.log(bad);
  }

  useEffect(() => {
    axios.get('/mypages/orderItem/'+orderItemId).then((res) => {
      console.log(res);
      setOrderItem({
          orderItemId: res.data.orderItemId,
          itemId: res.data.itemId,
          itemName: res.data.itemName
      })
   })
   },[]);

  useEffect(() => {
    axios.get('/reviews/orderItem/'+orderItemId).then((res) => {
      console.log(orderItemId);
      console.log(res);
      setReview({
        reviewId : res.data.reviewId,
        memberId : res.data.memberId,
        orderItem : res.data.orderItem,
        reviewDescription : res.data.reviewDescription,
        satisfactionType : res.data.satisfactionType,
        reviewDate : res.data.reviewDate
          })
      setReviewId(res.data.reviewId);
      console.log(g_reviewId);
      check(res.data.satisfactionType);
   })
   },[]);



  const navigate = useNavigate();

  function handleUseNavigate() {
    navigate('/myPage/'+memberId);
  }

  //console.log(orderItem);

  const radioClick = (param) => {

    if(param === 'GOOD') { good = 1; normal = 0; bad = 0}
    else if (param === 'NORMAL') { good = 0; normal = 1; bad = 0}
    else if (param === 'BAD') { good = 0; normal = 0; bad = 1}

    setSatisfaction(param);
    console.log(satisfaction)
  }

  const Save = () => {
    //params.satisfactionType = document.getElementById("satisfaction").value;
    //params.satisfactionType = satisfaction;
    console.log(g_reviewId);
    setReview({
        memberId: "1",
        reviewId : g_reviewId,
        orderItem: orderItem,
        reviewDescription: document.getElementById("reviewDescription").value,
        satisfactionType: satisfaction,
        reviewDate: new Date()
      })

   console.log(review);

  }

  const SavePost = () => {
    axios
    .post('/reviews', review)
    .then((res) => {
      console.log(res.data);
    });
    alert("저장이 완료 되었습니다.")
    handleUseNavigate();
  }

  const UpdateReview = () => {
    console.log(review);
    axios
    .put('/reviews', review)
    .then((res) => {
      console.log(res.data);
    });
    alert("수정이 완료 되었습니다.")
    handleUseNavigate();
  }

  const DeleteReview = () => {
    console.log(review);
    axios
    .delete('/reviews/'+review.reviewId)
    .then((res) => {
      console.log(res.data);
    });
    alert("삭제가 완료 되었습니다.")
    handleUseNavigate();
  }


  function buttonComponent() {
    console.log(review.reviewId);
    if(review.reviewId > 0 ) {
    return (
        <>
        <button class="btn btn-primary me-md-2" type="button" onClick={() => {UpdateReview();}}>수정</button>
        <button class="btn btn-primary me-md-2" type="button" onClick={() => {DeleteReview();}}>삭제</button>
        <button class="btn btn-primary me-md-2" type="button" onClick={() => {handleUseNavigate();}}>닫기</button>
        </>
    )
    } else
    return (
      <>
      <button class="btn btn-primary me-md-2" type="button" onClick={() => {SavePost();}}>저장</button>
      <button class="btn btn-primary me-md-2" type="button" onClick={() => {handleUseNavigate();}}>닫기</button>
      </>
      )
  }

  return (
    <>
      <div style={{width:"800px",height:"1000px"}}>
      <br></br>
      <h5><strong>상품 리뷰 작성</strong></h5>
      <hr></hr>
      <div class="form-floating">
        <textarea class="form-control" type="textarea"></textarea>
        <label class="form-control" id="orderItemName"><h5><strong>상품명 : {orderItem.itemName}</strong></h5></label>
      </div>
      <br></br>
      <div>
        <strong>상품만족도</strong>&nbsp;&nbsp;
        <label><input class="form-check-input" type="radio" name="satisfaction" id="satisfaction" checked={good} value="GOOD" onClick={() => radioClick("GOOD")}/>&nbsp;좋음&nbsp;</label>
        <label><input class="form-check-input" type="radio" name="satisfaction" id="satisfaction" checked={normal} value="NORMAL" onClick={() => radioClick("NORMAL")}/>&nbsp;보통&nbsp;</label>
        <label><input class="form-check-input" type="radio" name="satisfaction" id="satisfaction" checked={bad} value="BAD" onClick={() => radioClick("BAD")}/>&nbsp;나쁨&nbsp;</label>
      </div>
      <br></br>
      <strong>리뷰 작성란</strong>&nbsp;&nbsp;

      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a comment here" id="reviewDescription" value={review.reviewDescription}  onChange={() => {Save(); }}></textarea>
      </div>
      <br></br>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        {buttonComponent()}
      </div>
      </div>
    </>
  );
};

export default Review;
