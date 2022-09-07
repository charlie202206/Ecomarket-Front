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
const EditPoinStandard = (props) => {
//   // console.log(selectedData + " ????");
//   // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header , selectedData, handleCancel, handleEditSubmit} = props;

  const [edited, setEdited] = useState(selectedData);

const [inputs, setInputs] = useState({
  standardId: "",
  countweightstandard: "",
  classification: "",
  standardDesc:"",
  ecoPoint : ""
})

//sconst baseURL = "http://localhost:8080/";

// const onEditChange = (e) => {
//   setInputs({
//     ...inputs,
//     [e.target.name]: e.target.value
//   })
// }
//

  const onCancle = () => {
    handleCancel();
  }

  const onEditChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }
  // const onEditChange =  (e) => {
  //   console.log(e);
    // setEdited({
    //   standardId: selectedData.standardId,
    //   countweightstandard: "3622",
    //   classification: "변경 TEST",
    //   standardDesc:"test",
    //   ecoPoint : 1212
    // })
  // }

  const onSubmitEdit = (e) => {
    e.preventDefault();
    // handleEditSubmit(selectedData);
  }



  function editePointStandard(data){

    //글로벌변수(useContext) ==사용 start
    const context = useContext(ContextAPI);
    console.log(context);
    console.log("props called inside of a function", context.memberEmail, context.memberName, context.memberId, context.memberSalesType, context.memberPhoneNumber);
    if(context.memberId === 0){
    // alert("비정상경로로 접근하였습니다.{" + context.memberId + "}");
    // return;
    }
    // ======= 사용 end
    console.log(selectedData.standardId + ": standardId???");
    console.log(data.classification + ": classification???");
    console.log(data.countweightstandard + ": countweightstandard???");
    console.log(data.standardDesc + ": standardDesc???");
    console.log(data.ecoPoint + ": ecoPoint???");
    if(!data.classification )     { data.classification = selectedData.classification; }
    if(!data.countweightstandard) { data.countweightstandard = selectedData.countweightstandard; }
    if(!data.standardDesc )       { data.standardDesc = selectedData.standardDesc;  }
    if(!data.ecoPoint )           { data.ecoPoint = selectedData.ecoPoint; }
    fetch('/ecoPointStandard/' + selectedData.standardId, {
      method: "PATCH",
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
      .catch(error => console.log(error + " \n fetch 에러!"));
      window.location.reload();
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
          {/* <main>{props.children}</main> */}
          <main>
          {/* <form onSubmit={onSubmitEdit}>
            <div>
              <div> ID: {edited.classification}</div>
              <div>classification : <input type='text' name='name' value={edited.classification} onChange={onEditChange}></input></div>
            </div>
          </form> */}

          <FormGroup  onSubmit={onSubmitEdit}>
            <div>ID :  {selectedData.standardId}</div><hr/>
            {/* <Label for="exampleEmail"> ID  </Label>
            <Input defaultValue={selectedData.standardId} onChange={onEditChange} name="standardId">  </Input><hr/> */}

            <Label for="exampleEmail"> 분류  </Label>
             <Input defaultValue={selectedData.classification} onChange={onEditChange} name="classification">  </Input>
            <FormFeedback>
              You will not be able to see this
            </FormFeedback>
            <Label for="exampleEmail"> 무게/수량 (kg/개)   </Label>
            <Input type="number" defaultValue={selectedData.countweightstandard} onChange={onEditChange} name="countweightstandard">  </Input>
            <FormFeedback>
              You will not be able to see this
            </FormFeedback>
            <Label for="exampleEmail">  에코포인트  </Label>
            <Input type="number"  defaultValue={selectedData.ecoPoint} onChange={onEditChange} name="ecoPoint">  </Input>
            <FormFeedback>
              You will not be able to see this
            </FormFeedback>
            <Label for="exampleEmail"> 설명  </Label>
            <Input defaultValue={selectedData.standardDesc} type="textarea" onChange={onEditChange} name="standardDesc">  </Input>

            <FormFeedback>
              You will not be able to see this
            </FormFeedback>

          </FormGroup>
          </main>
          <footer>
            <button  onClick={() => editePointStandard(inputs)} >  저장 </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default EditPoinStandard;
