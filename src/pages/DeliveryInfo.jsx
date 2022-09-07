import { useState, useEffect } from 'react';
import { Col, Card, CardTitle, CardText } from "reactstrap";
import axios from 'axios';
import React from 'react';

import { ReactComponent as Truck } from '../img/truck-side.svg'
import { ReactComponent as Boxalt } from '../img/box-alt.svg'
import { ReactComponent as Boxes } from '../img/boxes.svg'
import { ReactComponent as Dsr } from '../img/double-small-right.svg'
//글로벌변수
import {useContext} from "react";
import ContextAPI from "../ContextAPI";

import '../App.css'

const DeliveryInfo = () => {
  //글로벌변수(useContext) ==사용 start
  const context = useContext(ContextAPI);
  console.log(context);
  console.log("props called inside of a function", context.memberEmail, context.memberName, context.memberId, context.memberSalesType, context.memberPhoneNumber);
  if(context.memberId === 0){
    //alert("비정상경로로 접근하였습니다.{" + context.memberId + "}");
    //return;
  }
    // ======= 사용 end
  const [data, setData] = useState([]);
  const baseURL = '/deliveries';
  // const baseURL = import.meta.env.VITE_API_SERVER + '/deliveries';
  //const baseURL = "http://localhost:8080/deliveries";

  /**
   * 최초 한번 조회
   */
  useEffect(() => {
    axios.get(baseURL + '/search/findByMemberId?memberId='+1+'&projection=with-writer').then((res) => {
      console.log(res);
      setData(res.data._embedded.deliveries);
    });

  }, []);

  return (
    <>
      <h1 className="App"><b>배송 조회</b></h1><br/>
      {data.map((item, i) => (
        <ul key={i} className="border-top">
          <br/>
          <div className="DeliveryStatus">
            <div>
              <Boxes fill={item.deliveryStatus === "READY" ? "#FF6666" : "#a4aeae"}/>
              <h4 style={{color: item.deliveryStatus === "READY" ? "#FF6666" : "#a4aeae"}}>상품준비중</h4>
            </div>
            <Dsr fill="#a4aeae"/>
            <div>
              <Truck fill={item.deliveryStatus === "SHIPPING" ? "#FF6666" : "#a4aeae"}/>
              <h4 style={{color: item.deliveryStatus === "SHIPPING" ? "#FF6666" : "#a4aeae"}}>배송중</h4>
            </div>
            <Dsr fill="#a4aeae"/>
            <div>
              <Boxalt fill={item.deliveryStatus === "COMP" ? "#FF6666" : "#a4aeae"}/>
              <h4 style={{color: item.deliveryStatus === "COMP" ? "#FF6666" : "#a4aeae"}}>배송완료</h4>
            </div>
          </div>
          <br/>

          <Col lg="12">
            <Card className="DeliveryAddressAlign" body color="white">
              <CardTitle tag="h4">배송정보 {i+1}</CardTitle>
              <CardText className="border-top">
                <br/>
                <b>주문상품 : </b>{item.ecoProductName} 외 1건<br/>
                <b>배송주소 : </b>({item.deliveryAddress.zipcode}) {item.deliveryAddress.basAddr} {item.deliveryAddress.dtlAddr} {item.deliveryAddress.extraAddr}<br/>
                <b>배송완료일 : </b>{item.deliveryEndDt}<br/>
                <b>택배사 : </b>A택배<br/>
                <b>택배기사님 : </b>김XX<br/>
                <b>운송장번호 : </b>{item.trackingNumber}<br/>
              </CardText>
            </Card>
          </Col>
        </ul>

      ))}
    </>
  );
};

export default DeliveryInfo;



