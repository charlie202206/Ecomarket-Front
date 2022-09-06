import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Col, Card, CardTitle, CardText } from "reactstrap";

import axios from 'axios';
import React from 'react';

import '../App.css'
import '../scss/style.scss';

const DeliveryAddress = () => {
  const [data, setData] = useState([]);
  const [delCnt, setDelCnt] = useState(1);
  const navigate = useNavigate();

  const baseURL = '/deliveryAddresses'
  // const baseURL = import.meta.env.VITE_API_SERVER + '/deliveryAddresses'
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
   * 배송지 주소 최초 조회 또는 주소가 삭제될때마다 조회
   */
  useEffect(() => {
    console.log('useEffect>>>>>>>>>>>>>')
    axios.get(baseURL + '/search/findByMemberId?memberId='+1+'&projection=with-address').then((res) => {
      console.log(res);
      setData(res.data._embedded.deliveryAddresses);
    });
  }, [delCnt]);  // []에 값이 없으면 최초 한번만 수행

  if (!data) return null;


  /**
   * 배송지 주소 추가
   */
  function addAddress() {
    navigate('/updateDeliveryAddress', {
      state: {
        memberId: 1
      }
    });
  }


  /**
   * 배송지 주소 수정
   * @param {*} id        : 주소ID
   * @param {*} memberId  : 회원ID
   * @param {*} e
   */
  function updateAddress(id, memberId, e) {
    navigate('/updateDeliveryAddress', {
      state: {
        addrId: id,
        memberId: 1
      }
    });
  }



  /**
   * 배송지 주소 삭제
   * @param {*} id  : 주소ID
   * @param {*} e   : 이벤트
   */
  const delAddress = (id, e) => {
    console.log('id ::::::: ', id);
    e.preventDefault();

    axios
      .delete(`${baseURL}/${id}`)
      .then((res) => {
        setDelCnt(delCnt+1);
        console.log(res.data);
      });
    console.log('Delete Delivery Address Complete...')
  }


  /**
   * 선택버튼 클릭시, 주소정보 리턴
   * @param {*} zipcode   : 우편번호
   * @param {*} basAddr   : 기본주소(도로명주소)
   * @param {*} dtlAddr   : 상세주소
   * @param {*} extraAddr : 참고항목
   * @param {*} e         : 이벤트
   */
  function sendDeliveryAddress(zipcode, basAddr, dtlAddr, extraAddr, e) {
    console.log('zipcode : ', zipcode);
    console.log('baseAddress : ', basAddr);
    console.log('dtlAddress : ', dtlAddr + extraAddr);

    // 호출 화면쪽으로 주소 정보 넘겨야함
  }


  return (
    <>
      <h1 className="App"><b>배송지 관리</b></h1><br/><br/>


      {data.map((item, i) => (
          <ul key={i}>

            {/* To-Be light-success */}
             <Col lg="10">
                <Card body color="light-success">

                  <div style={addressCard}>

                      <div className="DeliveryAddressAlign col-md-8">
                        <CardTitle tag="h4">{item.deliveryPlace} {item.rootAddrYn === "Y" ? "(기본 배송지)" : ""}</CardTitle>
                        <CardText>
                        ({item.zipcode})<br/> {item.basAddr} {item.dtlAddr} {item.extraAddr}<br/>
                          {item.recipientName}
                        </CardText>
                      </div>

                      <div className="col-md-4 btng">
                        <div className="button-group">
                          <Button
                            className="btn" size="lg" color="btn btn-success"
                            onClick={(e) => sendDeliveryAddress(item.zipcode, item.basAddr, item.dtlAddr, item.extraAddr, e)}>선택</Button>
                          <Button
                            className="btn" size="lg" color="btn btn-success"
                            onClick={(e) => updateAddress(getId(item._links.self.href), item.memberId, e)}>수정</Button>
                          <Button
                            className="btn" size="lg" color="btn btn-success"
                            onClick={(e) => delAddress(getId(item._links.self.href), e)}>삭제</Button>
                        </div>
                      </div>

                  </div>
                </Card>
              </Col>

            {/* As-Is */}
            {/* <div style={style}>
              <div>
                <div style={style3}><b>{item.deliveryPlace}</b></div>
                <div style={style3}>{item.zipcode} {item.basAddr} {item.dtlAddr} {item.extraAddr}</div>
                <div style={style3}>{item.recipientName}</div>
              </div>

              <div style={{position: 'absolute', right: 20, marginRight: "20px"}}>
                  <button>선택</button>
                  <button onClick={(e) => updateAddress(getId(item._links.self.href), e)}>수정</button>
                  <button onClick={(e) => delAddress(getId(item._links.self.href), e)}>삭제</button>
              </div>
            </div> */}
          </ul>
      ))}


      <div>
        <div className="App">
          <Button
            className="btn"
            color="btn btn-dark"
            type="submit"
            size="lg"
            onClick={addAddress}>
              + 새 배송지 등록
          </Button>
        </div>
    
      </div>
    </>
  );
};

const addressCard = {
  padding: '4px',
  margin: '4px',
  display: 'flex',
};


const style = {
  border: '1px solid black',
  padding: '8px',
  margin: '8px',
  display: 'flex'
};

const style2 = {
  border: '1px solid black',
  padding: '18px',
  margin: '8px'
};

const style3 = {
  padding: '2px',
  margin: '2px'
};



export default DeliveryAddress;
