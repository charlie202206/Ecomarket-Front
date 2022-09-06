import React, {useState} from 'react';
import '../scss/modal.css';
import axios from 'axios';

import {
  FormGroup,
  Input,
  FormFeedback,
  Table,
} from "reactstrap";


const DisposalProduct = (props) => {
  // 
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header , selectedData, handleCancel} = props;
  console.log(selectedData + " ~!????");
  console.log(typeof  selectedData.toString());
  const [edited, setEdited] = useState(selectedData);
//
  const str = selectedData.toString().split(',');

const [inputs, setInputs] = useState({
  disposalId: "",
  disposalProduct: "",
  quantity: "",
  ecoPoint:"",
  disposalPlace: "",
  userId : ""
})

 

  const onCancle = () => {
    handleCancel();
  }
  
  const onEditChange = (e) => {
    setInputs({
      ...inputs, 
      [e.target.name]: e.target.value
    })
  }
 

  const onSubmitEdit = (e) => {
    e.preventDefault();
    // handleEditSubmit(selectedData);
  }
  
  const baseURL = "http://localhost:8081/";

  function disposalItem(data, index){
    console.log(data.quantity + " //// " + selectedData + "// " + index + " //"
    + str[index])

    // const params = {
    //     disposalProduct: str[index],
    //     quantity: data.quantity,
    //     ecoPoint: "1000",
    //     disposalPlace: "용인",
    //     userId : "3622"
    // };
    // axios.post(baseURL + 'disposalItem', params )
    //      .then((res) => {
    //       // setUpdCnt(updCnt+1);
    //       console.log(res.data);
    //     });
    
    fetch('/disposal/disposalItem', {
      method: "POST",
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        disposalProduct: str[index],
        quantity: data.quantity,
        ecoPoint: "0",
        disposalPlace: "용인",
        userId : "3622"
      })
    })
      .then((res) => res.text())
      .then((res) => {
        // console.log(res+ " RES");
        if (res === "ok") { }
      })
      .catch(error => console.log(error.message + " \n fetch 에러!"));
      // window.location.reload();
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
          <main>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>재활용품</th>
                <th>무게/수량 (개/Kg)</th>
                <th>v</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata}</h6>
                        {/* <span className="text-muted">{tdata.email}</span> */}
                      </div>
                    </div>
                  </td>
                  <td><Input type="number" name="quantity" onChange={onEditChange}>  </Input></td>
                  <td> <button  onClick={() => disposalItem(inputs, index)} >  배출 </button> </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          </main>
          <footer> 
            <button  onClick={close} >  완료 </button> 
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default DisposalProduct;
