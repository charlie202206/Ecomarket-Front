import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewMemberList from "./NewMemberList";
import {useLocation} from "react-router";
import Select from 'react-select';

//글로벌변수
import {useContext} from "react";
import ContextAPI from "../ContextAPI";

function SaveMember() {

  //변수 받아오기(props 대체)
  const location = useLocation();
  const navigate = useNavigate();
  // const props = location.state.value;

  //글로벌변수(useContext) ==사용 start
  const context = useContext(ContextAPI);
  console.log(context);
  console.log("props called inside of a function", context.memberEmail, context.memberName, context.memberId, context.memberSalesType, context.memberPhoneNumber);
  if(context.memberId === 0){
    //alert("비정상경로로 접근하였습니다.{" + context.memberId + "}");
    context.memberId = 1;
    //return;
  }
  // ======= 사용 end

  const [name, setName] = useState(context.memberName);
  const [email, setEmail] = useState(context.memberEmail);
  const [phoneNumber, setPhoneNumber] = useState(context.memberPhoneNumber);
  const [salesType, setSalesType] = useState("customer");
  // const [zipCode, setZipCode] = useState(props.zipCode);
  // const [address, setAddress] = useState(props.address);
  // const [addressDetail, setAddressDetail] = useState(props.addressDetail);
  const [hstate,setHstate]=useState("INIT");
  if(context.memberId != "" && hstate == "INIT"){
    setHstate("AFTER");
    search(context.memberId);
  }

  // const [selectedST, setSelectedST] = useState(salesType);
  const [mode, setMode] = useState('INIT');

  const { id } = useParams();

  const handleChangeCombo = (event) => {
    setSalesType(event.target.value||"")
  }
  function moveNewMemberList()
  {
    navigate('/NewMemberList',{state:{value:""}})
  }
  function search(e){

   console.log(e);
    axios
      //.get(import.meta.env.VITE_API_SERVER + '/members/memberId/'+e)
      .get('/members/memberId/'+e)
      .then((res) => {
          console.log("======start============> " );
          console.log( res.data);
          console.log("======end============> " );
          setName(res.data.name);
          setPhoneNumber(res.data.phoneNumber);
          // setZipCode(res.data.zipCode);
          // setAddress(res.data.address);
          // setAddressDetail(res.data.addressDetail);
          setEmail(res.data.email);
          setSalesType(res.data.salesType);

      });
  }


  function handleChange(e) {

    let checkpwd = "";
    checkpwd = e.target.password.value;
    if(checkpwd === "" ){
      alert("수정을 위해서 패스워드를 입력하세요");
      return;
    }
    if(e.target.password.value != e.target.passwordConfirm.value ){
      alert("패스워드 확인 정보와 일치하지 않습니다.");
      return;
    }
     const params = {
      id: props.id,
      name: e.target.membrename.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
      salesType: salesType,
      encryptedPwd: e.target.password.value
      // zipCode: e.target.zipCode.value,
      // address: e.target.address.value,
      // addressDetail: e.target.addressDetail.value
    };
    axios
      //.put(import.meta.env.VITE_API_SERVER +'/members/memberId/'+props.id, params)
      .put('/members/memberId/'+props.id, params)
      .then((res) => {
         // console.log(res.data);
        if (res.status == "200") {
          alert("정상수정되었습니다.");
          setMode("UPDATE");
        } else {
          alert("수정되지 않았습니다.");
        }
        //console.log(import.meta.env.VITE_API_SERVER + '/member/members');
      }).catch(err =>{alert("수정중 오류가 발생했습니다.")});
  }

  return (
    <div className="container-apply">
      <h1>
        회원정보 수정
      </h1>

      <form className="row g-3" onSubmit={event => {
        event.preventDefault();
        handleChange(event);
      }} >
        <table className="table">
        <tbody>
          <tr>
            <td><h5>회원 이름<span className="red">*</span></h5></td>
            <td><input type="text" name="membrename" id="membrename" value={name||""}  onChange={event=>{
                setName(event.target.value||""); }} maxLength="40" tabIndex="1" size="50"
            /></td>
          </tr>
          <tr>
          <td><h5>회원 이메일<span >*</span></h5></td>
          <td>
            <input type="text" name="email" id="email" value={email||""} onChange={event=>{
                alert("이메일은 변경할수 없습니다"); }}maxLength="40" tabIndex="2" size="50"/>
          </td>
          </tr>
          <tr>
            <td><h5>연락처<span >*</span></h5></td>
            <td>
              <input type="text" name="phoneNumber" id="phoneNumber" value={phoneNumber||""} onChange={event=>{
                setPhoneNumber(event.target.value||""); }}maxLength="13" tabIndex="3" size="50"/>
            </td>
          </tr>
          <tr>
            <td><h5>회원유형<span >*</span></h5></td>
            <td>
              <select value={salesType||""} onChange={handleChangeCombo}>
                <option value="customer">customer</option>
                <option value="company">company</option>
                <option value="delivery">delivery</option>
              </select>
            </td>
          </tr>
          {/* <tr>
            <td><h5>Zipcode<span >*</span></h5></td>
            <td>
              <input type="text" name="zipCode" id="zipCode" value={zipCode||""} onChange={event=>{
                setZipCode(event.target.value||""); }} maxLength="5" tabIndex="5" size="50"/>
            </td>
          </tr>
          <tr>
            <td><h5>주소<span >*</span></h5></td>
            <td>
              <input type="text" name="address" id="address" value={address||""} onChange={event=>{
                setAddress(event.target.value||""); }} maxLength="40" tabIndex="6" size="50"/>
            </td>
          </tr>
          <tr>
            <td><h5>주소상세<span >*</span></h5></td>
            <td>
              <input type="text" name="addressDetail" id="addressDetail" value={addressDetail||""} onChange={event=>{
                setAddressDetail(event.target.value||""); }} maxLength="60" tabIndex="7" size="50"/>
            </td>
          </tr> */}
          <tr>
            <td><h5>패스워드<span >*</span></h5></td>
            <td>
              <input type="password" name="password" id="password" placeholder="패스워드" maxLength="13" tabIndex="13" size="50" />
            </td>
          </tr>
          <tr>
            <td><h5>패스워드확인<span >*</span></h5></td>
            <td>
              <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="패스워드확인" maxLength="13" tabIndex="14" size="50" />
            </td>
          </tr>
          </tbody>

        </table>
        <div className="box-size">
        <button type="submit" className="btn btn-primary" style={{float:"auto"}}>수정</button>
        </div>
      </form>
      <a href={'/'} onClick={event=>{
             event.preventDefault();
             moveNewMemberList();
          }}  style={{float:"right"}} >.</a>
    </div>
  );
}
export default SaveMember;
