import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form } from 'reactstrap';

import axios from 'axios';
import React from 'react';

import '../App.css';
import "../styles.css";
import '../scss/style.scss';
//글로벌변수
import {useContext} from "react";
import ContextAPI from "../ContextAPI";

const UpdateDeliveryAddress = () => {
  //글로벌변수(useContext) ==사용 start
  const context = useContext(ContextAPI);
  console.log(context);
  console.log("props called inside of a function", context.memberEmail, context.memberName, context.memberId, context.memberSalesType, context.memberPhoneNumber);
  if(context.memberId === 0){
    // alert("비정상경로로 접근하였습니다.{" + context.memberId + "}");
    // return;
  }
  // ======= 사용 end
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [params, setParams] = useState({ deliveryPlace: '', recipientName: '',  zipcode: '',  basAddr: '',  dtlAddr: '', extraAddr: '' });
  const location = useLocation();
  const addrId = location.state.addrId;
  const memberId = location.state.memberId;

  const baseURL = '/deliveryAddresses';
  // const baseURL = import.meta.env.VITE_API_SERVER + '/deliveryAddresses';
  //const baseURL = "http://localhost:8080/deliveryAddresses";

  /**
   * 배송주소ID 추출
   * @param {*} str : links href url주소
   * @returns deliveryAddress_id
   */
   function getId(str) {
    const idx = str.lastIndexOf('/');
    return str.substring(idx + 1);
  }

  /**
   * 최초 조회 또는 주소정보값이 변경되었을 경우 조회
   */
  useEffect(() => {

    if(addrId) {
      axios.get(baseURL + '/' + addrId).then((res) => {
        setParams({ deliveryPlace: res.data.deliveryPlace
                  , recipientName: res.data.recipientName
                  , zipcode: res.data.zipcode
                  , basAddr: res.data.basAddr
                  , dtlAddr: res.data.dtlAddr
                  , extraAddr: res.data.extraAddr});
      }
    )};
  }, [params.deliveryPlace, params.recipientName, params.zipcode, params.basAddr, params.dtlAddr, params.extraAddr]);


  function updateRootAddrYn(item, uptRootAddrYnVal) {
    console.log('YYYYYYYYYYY : ', getId(item._links.self.href));
    axios.patch(baseURL + '/' + getId(item._links.self.href), uptRootAddrYnVal)
    .then((res) => {
      console.log(res.data);
    })
  }

  /**
   * 확인버튼 클릭후, 저장 또는 수정 이벤트처리
   * 주소ID가 없으면 저장(POST), 있으면 수정(PUT)
   * @param {*} e
   */
  function handleChange(e) {

    const params = {
      deliveryPlace: document.getElementById('deliveryPlace').value,
      recipientName: document.getElementById('recipientName').value,
      zipcode: document.getElementById('postcode').value,
      basAddr: document.getElementById('roadAddress').value,
      dtlAddr: document.getElementById('dtlAddr').value,
      extraAddr: document.getElementById('extraAddress').value,
      rootAddrYn: document.getElementById('rootAddrYn').value === 'true' ? 'Y' : 'N',
      memberId: memberId,
    };


    if(!addrId) {
      console.log('========== 추가 ===========')
      axios
        .post(baseURL, params)
        .then((res) => {
        console.log(res.data);
      });
    }
    else {
      console.log('========== 수정 ===========(id : '+ addrId + ')')

      if(params.rootAddrYn === 'Y') {

        // axios
        // .get('http://localhost:8083/deliveryAddresses/search/findByMemberId?memberId='+memberId)
        // .then((res) => {
        //   console.log(res);
        //   setData(res.data._embedded.deliveryAddresses);
        // });

        // const uptRootAddrYnVal = {
        //   rootAddrYn: 'N',
        // };

        // data.map((item, index) => (

        //   <ul key={index}>
        //     {item.recipientName}
        //   </ul>
        // ));
      }


      axios
        .put(baseURL + '/' + addrId, params)
        .then((res) => {
          console.log(res.data);
        });

    }

    window.location.href = '/deliveryAddress';

  }

  /**
   * 기본 배송지 체크박스 이벤트 처리
   * @param {*} param0
   */
  const onCheckBoxChange = ({ target }) => {

    setIsChecked(!isChecked);
    target.checked ? console.log('checked') : console.log('unchecked');

  };

  /**
   * 주소 찾기 팝업(다음카카오 주소API)
   */
  function findAddress() {
    new daum.Postcode({
        oncomplete: function(data) {

            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
               extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("roadAddress").value = roadAddr;
            document.getElementById("jibunAddress").value = data.jibunAddress;

            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if(roadAddr !== ''){
                document.getElementById("extraAddress").value = extraRoadAddr;
            } else {
                document.getElementById("extraAddress").value = '';
            }

            var guideTextBox = document.getElementById("guide");
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if(data.autoRoadAddress) {
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                guideTextBox.style.display = 'block';

            } else if(data.autoJibunAddress) {
                var expJibunAddr = data.autoJibunAddress;
                guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                guideTextBox.style.display = 'block';
            } else {
                guideTextBox.innerHTML = '';
                guideTextBox.style.display = 'none';
            }
        }
    }).open();
  }


  return (
    <>
      <h1 className="App"><b>배송지 등록/수정</b></h1><br/>
      {/* <p className="App">addrId: {addrId}</p> */}
      {/* <p className="App">memberId: {memberId}</p> */}
      <br/>

      {/* <Form>
        <FormGroup>
          <Label for="deliveryPlace">*배송지명 : </Label>
          <Input type="text" placeholder="배송지명" id="deliveryPlace" defaultValue={params.deliveryPlace}/>
        </FormGroup>
        <FormGroup>
          <Label for="recipientName">*받는분 : </Label>
          <Input type="text" placeholder="받는분" id="recipientName" defaultValue={params.recipientName}/>
        </FormGroup>
        <FormGroup>
          <Label for="postcode">*우편번호 : </Label>
          <Input type="text" placeholder="우편번호" id="postcode" defaultValue={params.zipcode}/>
          <Button className="btn" color="primary" type="submit" onClick={findAddress}>우편번호 찾기</Button>
        </FormGroup>
        <FormGroup>
          <Label for="roadAddress">도로명 주소 : </Label>
          <Input type="text" placeholder="도로명 주소" id="roadAddress" defaultValue={params.basAddr}/>
        </FormGroup>
        <FormGroup>
          <Label for="jibunAddress">지번 주소 : </Label>
          <Input type="text" placeholder="지번 주소" id="jibunAddress" defaultValue={params.basAddr}/>
        </FormGroup>
        <FormGroup>
          <Label for="dtlAddr">*상세주소 : </Label>
          <Input type="text" placeholder="상세주소" id="dtlAddr" defaultValue={params.dtlAddr} />
        </FormGroup>
        <FormGroup>
          <Label for="extraAddress">참고항목 : </Label>
          <Input type="text" placeholder="참고항목" id="extraAddress" defaultValue={params.extraAddr}/>
        </FormGroup>
      </Form> */}



  <Form className="needs-validation">
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label" htmlFor='deliveryPlace'><b>*배송지명 : </b></label>
      <div className="col-sm-5">
        <input type="text" className="form-control" placeholder="배송지명" id="deliveryPlace" defaultValue={params.deliveryPlace} required/>
        <div className="invalid-feedback">
        배송지명을 입력하세요
        </div>
      </div>
    </div>

    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label"><b>*받는 분 : </b></label>
      <div className="col-sm-5">
        <input type="text" className="form-control" placeholder="받는분" id="recipientName" defaultValue={params.recipientName} required/>
        <div className="invalid-feedback">
          받는분을 입력하세요
        </div>
      </div>
    </div>
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label"><b>*우편번호 : </b></label>
      <div className="col-sm-3">
        <input type="text" className="form-control" placeholder="우편번호" id="postcode" defaultValue={params.zipcode} required/>
        <div className="invalid-feedback">
          우편번호 찾기를 통해 주소를 입력하세요
        </div>
      </div>
      <div className="col-sm-2">
      <Button type="submit" onClick={findAddress}>우편번호 찾기</Button>
      </div>
    </div>
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label"><b>도로명 주소 : </b></label>
      <div className="col-sm-5">
        <input type="text" className="form-control" placeholder="도로명 주소" id="roadAddress" defaultValue={params.basAddr}/>
      </div>
    </div>
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label"><b>지번 주소 :  : </b></label>
      <div className="col-sm-5">
        <input type="text" className="form-control" placeholder="지번 주소" id="jibunAddress" defaultValue={params.basAddr}/>
      </div>
      <span id="guide"></span>
    </div>
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label"><b>*상세주소 : </b></label>
      <div className="col-sm-5">
        <input type="text" className="form-control" placeholder="상세주소" id="dtlAddr" defaultValue={params.dtlAddr} required/>
        <div className="invalid-feedback">
          상세주소를 입력하세요
        </div>
      </div>
    </div>
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label"><b>참고항목 : </b></label>
      <div className="col-sm-5">
        <input type="text" className="form-control" placeholder="참고항목" id="extraAddress" defaultValue={params.extraAddr}/>
      </div>
    </div>

    <div>
      <input className="form-check-input" id="rootAddrYn" type="checkbox" onChange={(e) => onCheckBoxChange(e)} value={isChecked}/>
      <> 기본 배송지로 설정</><br/><br/>
    </div>
    </Form>


    <div className="button-group">
      <Button className="btn" color="success" type="submit" onClick={handleChange}>확인</Button>
      <Button className="btn" color="secondary" type="submit">취소</Button>
    </div>


      {/* <div className="App">
        <b>*배송지명 : </b>
        <input type="text" placeholder="배송지명" id="deliveryPlace" defaultValue={params.deliveryPlace}/>
        <br/>

        <b>*받는 분 : </b>
        <input type="text" placeholder="받는분" id="recipientName" defaultValue={params.recipientName}/>
         <br/>

        <b>*우편번호 : </b>
        <input type="text" placeholder="우편번호" id="postcode" defaultValue={params.zipcode}/>
        <button type="submit" onClick={findAddress}>우편번호 찾기</button>
        <br/>

        <b>도로명 주소 : </b>
        <input type="text" placeholder="도로명 주소" id="roadAddress" defaultValue={params.basAddr}/>
        <br/>
        <b>지번 주소 : </b>
        <input type="text" placeholder="지번 주소" id="jibunAddress" defaultValue={params.basAddr}/>
        <br/>
        <span id="guide"></span>

        <b>*상세주소 : </b>
        <input type="text" placeholder="상세주소" id="dtlAddr" defaultValue={params.dtlAddr} />
        <br/>

        <b>참고항목 : </b>
        <input type="text" placeholder="참고항목" id="extraAddress" defaultValue={params.extraAddr}/>
        <br/>

        <input id="rootAddrYn" type="checkbox" onChange={(e) => onCheckBoxChange(e)} value={isChecked}/>
        <b> 기본 배송지로 설정</b>
        <br/><br/>
      </div> */}
    </>
  );
};

const style = {
  padding: '8px',
  margin: '8px',
  display: 'flex',
};

export default UpdateDeliveryAddress;
