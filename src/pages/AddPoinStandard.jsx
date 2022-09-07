// // import React from 'react';
import React, {useState} from 'react';
import '../scss/modal.css';

import  { Link } from 'react-router-dom';
import {
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

//글로벌변수
import {useContext} from "react";
import ContextAPI from "../ContextAPI";

const AddPoinStandard = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  const [edited, setEdited] = useState("");
  const [inputs, setInputs] = useState({
    standardId: "",
    countweightstandard: "",
    classification: "",
    standardDesc:"",
    ecoPoint : ""
  })

    //글로벌변수(useContext) ==사용 start
    const context = useContext(ContextAPI);
    console.log(context);
    console.log("props called inside of a function", context.memberEmail, context.memberName, context.memberId, context.memberSalesType, context.memberPhoneNumber);
    if(context.memberId === 0){
      //alert("비정상경로로 접근하였습니다.{" + context.memberId + "}");
      //return;
    }
    // ======= 사용 end

  const onEditChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }


  //const baseURL = "http://localhost:8080/";

  function addPointStandard(data){
    console.log(data.classification + ": classification???");
    fetch('/ecoPointStandard/addStandard' , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classification: data.classification,
        countweightstandard: data.countweightstandard,
        standardDesc: data.standardDesc,
        ecoPoint: data.ecoPoint
      })
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res+ " RES");
        if (res === "ok") {
          // setPointStandard(pointStandard.filter((item) => item.standardId !== id));
        }
      })
      .catch(error => console.log(error + " \n fetch error!"));
      window.location.reload();
  }

  const onSubmitEdit = (e) => {
    e.preventDefault();
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <FormGroup  onSubmit={onSubmitEdit}>
            <Label for="exampleEmail"> 분류  </Label>
             <Input  onChange={onEditChange} name="classification">  </Input>

            <Label for="exampleEmail"> 무게/수량 (kg/개)   </Label>
            <Input  type="number"  onChange={onEditChange} name="countweightstandard"/>

            <Label for="exampleEmail">  에코포인트  </Label>
            <Input  type="number"  onChange={onEditChange} name="ecoPoint">  </Input>

            <Label for="exampleEmail"> 설명  </Label>
            <Input type="textarea" onChange={onEditChange} name="standardDesc">  </Input>
          </FormGroup>
          {/* <main>{props.children}</main> */}
          <footer>
          {/* <Link to="/result">
            <button className="close" onClick={close}>
              저장
            </button> </Link> */}
             <button type='submit'  onClick={() => addPointStandard(inputs)} >  저장 </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default AddPoinStandard;
