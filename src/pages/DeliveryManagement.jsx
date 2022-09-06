import { useState, useEffect, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import axios from 'axios';
import React from 'react';
import Table from './DeliveryListTable';

import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import "../styles.css";
import '../scss/style.scss';

const options = [
  { value: 'READY',     label: '배송준비' },
  { value: 'SHIPPING',  label: '배송중' },
  { value: 'CANCEL',    label: '배송취소' },
  { value: 'COMP',      label: '배송완료' },
]

const DeliveryManagement = () => {

  const [data, setData] = useState([]);
  const [staDate, setStaDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState();
  const [rowData1, setRowData1] = useState([]);
  const [rowData2, setRowData2] = useState([]);
  const [updCnt, setUpdCnt] = useState();

  const baseURL = '/deliveries';
  // const baseURL = import.meta.env.VITE_API_SERVER + '/deliveries';
  //const baseURL = "http://localhost:8080/deliveries";

  function getId(str) {
    const idx = str.lastIndexOf('/');
    return str.substring(idx + 1);
  }

  /**
   * 최초 한번 조회 또는 배송상태/일시가 수정될 때마다 조회
   */
  useEffect(() => {
    axios.get(baseURL).then((res) => {
      console.log(res);
      setData(res.data._embedded.deliveries);
      // console.log('data raw ', data[0].deliveryAddress.basAddr);
    });
  }, [updCnt]);

  /**
   * 배송 상태 수정
   */
  function updateDeliveryStatus() {

    const params = {
      deliveryStartDt: document.getElementById('deliveryStartDt').value.replaceAll("-",""),
      deliveryEndDt: document.getElementById('deliveryEndDt').value.replaceAll("-",""),
      deliveryStatus: document.getElementById('deliveryStatus').value,
      trackingNumber: rowData1.trackingNumber,
      memberId: rowData1.memberId,
    };

    console.log('=============== 수정(id : '+getId(rowData1._links.self.href)+') ===============');
    console.log('(StartDt : ' + params.deliveryStartDt + ')');
    console.log('(EndDt : ' + params.deliveryEndDt + ')');
    console.log('(deliveryStatus : ' + params.deliveryStatus + ')');

    axios
      .put(baseURL + '/' + getId(rowData1._links.self.href), params)
      .then((res) => {
        setUpdCnt(updCnt+1);
        console.log(res.data);
      });
  };

  function handleChange(e) {
    console.log(`1111111111111 +`, e.currentTarget.value);
  };


  // 김XX 택배기사에게 할당된 배송리스트 테이블 구성
  const columns = useMemo(
    () => [
      {accessor: "sel",                             Header: "선택",
        Cell: ({value}) => (
          <div>
            <Input id="rad1" name="radio1" type="radio" onChange={(e) => handleChange(e)}/>{""}
          </div>
      )
      },
      {accessor: "_links.self.href",                Header: "배송ID",
      Cell: ({value}) => (
        <div>
          {getId(value)}
        </div>
      )
      },
      {accessor: "trackingNumber",                  Header: "운송장번호",},
      {accessor: "deliveryAddress.recipientName",   Header: "받는분",},
      {accessor: "deliveryAddress.deliveryPlace",   Header: "배송지명",},
      {accessor: "deliveryAddress",                 Header: "배송주소",
        Cell: ({value}) => (
          <div>
            ({value.zipcode}) <br/> {value.basAddr} {value.dtlAddr} {value.extraAddr}
          </div>
        )
      },
      {accessor: "deliveryMessage",                 Header: "배송메세지",},
      {accessor: "deliveryStartDt",                 Header: "배송시작일자",},
      {accessor: "deliveryEndDt",                   Header: "배송완료일자",},
      {accessor: "deliveryStatus",                  Header: "배송상태",
        Cell: ({value}) => (
          <div>
            {
              //value === "COMP" ? "배송완료": ""
              options.map((opd, index) => (
                value === opd.value ? opd.label : ""
              ))
            }
          </div>
        )
      },
    ],[]);

  /**
   * 테이블에서 선택된 row의 값을 저장
   * rowData1 : 배송 정보
   * rowData2 : 배송주소 정보
   * @param {*} x : 선택된row
   */
  const parentFunction = (x) => {
    console.log('parent', x);

    setRowData1(x);
    setRowData2(x.deliveryAddress);

    console.log('radio', document.getElementById('rad1'));

  }

  return (
    <>
      <h1 className="App"><b>배송 관리 (김XX 택배기사)</b></h1><br/>
      <Table columns={columns} data={data} parentFunction={parentFunction}/><br/><br/>



        {/* <div className="mb-3 row">
          <label className="col-sm-2 col-form-label"><b>받는 분  : </b></label>
          <div className="col-sm-5">
            <input type="text" className="form-control" placeholder="받는분" id="recipientName" defaultValue={rowData2.recipientName} readOnly disabled/>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label"><b>우편번호 : </b></label>
          <div className="col-sm-1">
            <input type="text" className="form-control" placeholder="우편번호" id="postcode" defaultValue={rowData2.zipcode} readOnly disabled/>
          </div>

        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label"><b>배송주소 : </b></label>
          <div className="col-sm-3">
            <input type="text" className="form-control" placeholder="기본 주소" id="roadAddr" defaultValue={rowData2.basAddr} readOnly disabled/>
          </div>
          <div className="col-sm-3">
            <input type="text" className="form-control" placeholder="상세 주소" id="dtlAddr" defaultValue={rowData2.dtlAddr} readOnly disabled/>
          </div>
        </div> */}


      <Form className='deliveryManagementAlign'>
        <FormGroup>
          <Label for="recipientName"><b>받는분 : </b></Label>
          <Input type="text" placeholder="받는분" id="recipientName" defaultValue={rowData2.recipientName} readOnly disabled/>
        </FormGroup>
        <FormGroup>
          <Label for="postcode"><b>우편번호 : </b></Label>
          <Input type="text" placeholder="우편번호" id="postcode" defaultValue={rowData2.zipcode} readOnly disabled/>
        </FormGroup>
        <FormGroup>
          <Label for="roadAddr"><b>주소 : </b></Label>
          <Input type="text" placeholder="도로명 주소" id="roadAddr" defaultValue={rowData2.basAddr} readOnly disabled/>
        </FormGroup>
        <FormGroup>
          <Label for="dtlAddr"><b>상세주소 : </b></Label>
          <Input type="text" placeholder="상세주소" id="dtlAddr" defaultValue={rowData2.dtlAddr} readOnly disabled/>
        </FormGroup>
        <FormGroup>
          <Label for="deliveryMassage"><b>배송메세지 </b></Label>
          <Input type="text" placeholder="배송메세지" id="deliveryMassage" readOnly disabled/>
        </FormGroup>



        <Label><b>배송시작일자 </b></Label>
        <DatePicker
          className="form-control"
          dateFormat="yyyy-MM-dd"
          selected={staDate}
          id="deliveryStartDt"
          onChange={date => setStaDate(date)}
          value={rowData1.deliveryStartDt}/>

        <Label><b>배송완료일자 </b></Label>
        <DatePicker
          className="form-control"
          dateFormat="yyyy-MM-dd"
          selected={endDate}
          id="deliveryEndDt"
          onChange={date => setEndDate(date)}
          value={rowData1.deliveryEndDt}/>
        <br/><br/>

        {/* <b>배송상태 </b>
        <Select id="deliveryStatus" options={options} onChange={(e) => handleSelect(e)} />
        <br/> */}
        <FormGroup>
          <Label for="deliveryStatus"><b>배송상태 </b></Label>
          <Input id="deliveryStatus" name="select" type="select" key={rowData1.deliveryStatus} defaultValue={rowData1.deliveryStatus} >
            <option label='배송준비'>READY</option>
            <option label='배송중'>SHIPPING</option>
            <option label='배송완료'>COMP</option>
            <option label='배송취소'>CANCEL</option>
          </Input>
        </FormGroup>

        {status}

      </Form>
      <br/>

      <div className="button-group">
        <Button className="btn" size="lg" color="success" type="submit" onClick={updateDeliveryStatus}>저장</Button>
        <Button className="btn" size="lg" color="secondary" type="submit">취소</Button>
      </div>
    </>
  );

};


export default DeliveryManagement;
