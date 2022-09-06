import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NewMemberList from "./NewMemberList";

import { useNavigate } from "react-router-dom";

function NewMember(props) {

  const { id } = useParams();
  const [salesType, setSalesType] = useState("customer");
  const navigate = useNavigate();
  const handleChangeCombo = (event) => {
    console.debug("================:"+event.target.value);
    setSalesType(event.target.value);
  }

  // const [selectedST, setSelectedST] = useState("customer");
  const [mode, setMode] = useState('INIT');
  let contentControl = null;

  if (mode === "INIT") {
    contentControl = <></>;
  } else if (mode === "UPDATE") {
    contentControl = <NewMemberList _mode="UPDATE" ></NewMemberList>;
  } else {
    contentControl = <NewMemberList _mode="READ" ></NewMemberList>;
  }


  function handleChange(e) {

     const params = {
      name: e.target.membrename.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
      salesType: salesType,
      encryptedPwd: e.target.password.value,
      // zipCode: e.target.zipCode.value,
      // address: e.target.address.value,
      // addressDetail: e.target.addressDetail.value
    };
    if(e.target.password.value != e.target.passwordConfirm.value ){
      alert("패스워드를 재확인하세요");
      return;
    }
    axios
      .post('/members/members', params)
      .then((res) => {
        //debugger;
        // console.log(res.data);
        if (res.status == "201") {
          alert("정상등록되었습니다.");
          setMode("UPDATE");
          navigate('/',{state:{value:""}})
        } else {
          alert("등록되지 않았습니다.");
        }
        // console.log(import.meta.env.VITE_API_SERVER + '/member/members');
      }).catch(err => {alert("등록중에 오류가 발생했습니다")});
  }

  return (

<div className="container-apply">
  <p></p>
  <p></p>
      <h1>
        회원가입
      </h1>

      <form onSubmit={event => {
        event.preventDefault();
        handleChange(event);
      }} >
        <table className="table">
          <tbody>
          <tr>
            <td><h5>회원 이름<span className="red">*</span></h5></td>
            <td><input type="text" name="membrename" id="membrename" placeholder="이름" maxLength="40" tabIndex="1" size="50"
            /></td>
          </tr>
          <tr>
          <td><h5>회원 이메일<span >*</span></h5></td>
          <td>
            <input type="text" name="email" id="email" placeholder="이메일" maxLength="40" tabIndex="2" size="50"/>
          </td>
          </tr>
          <tr>
            <td><h5>연락처<span >*</span></h5></td>
            <td>
              <input type="text" name="phoneNumber" id="phoneNumber" placeholder="연락처" maxLength="13" tabIndex="3" size="50" />
            </td>
          </tr>
          <tr>
            <td><h5>회원유형<span >*</span></h5></td>
            <td>
              <select value={salesType} onChange={handleChangeCombo} >
                <option value="customer">개인고객</option>
                <option value="company">기업고객</option>
                <option value="delivery">배달기사</option>
              </select>
            </td>
          </tr>
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
          {/* <tr>
            <td><h5>Zipcode<span >*</span></h5></td>
            <td>
              <input type="text" name="zipCode" id="zipCode" placeholder="우편번호" maxLength="5" tabIndex="5" size="50"/>
            </td>
          </tr>
          <tr>
            <th><h5>주소<span >*</span></h5></th>
            <td>
              <input type="text" name="address" id="address" placeholder="주소" maxLength="40" tabIndex="6" size="50"/>
            </td>
          </tr>
          <tr>
            <th><h5>주소상세<span >*</span></h5></th>
            <td>
              <input type="text" name="addressDetail" id="addressDetail" placeholder="상세주소" maxLength="60" tabIndex="7" size="50"/>
            </td>
          </tr>*/}
          </tbody>
          {/* <input type="submit" value="가입"></input> */}

        </table>
        <div>
        <button type="submit" className="btn btn-primary" style={{float:"left"}}>가입</button>
        </div>
      </form>
      <div>
        <a href={'/'} onClick={event=>{
             navigate('/',{state:{value:""}})
          }}  style={{float:"right"}} >로그인</a>
        </div>
      {contentControl}

      </div>

  );
}
export default NewMember;
