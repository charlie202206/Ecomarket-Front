import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, ButtonGroup, FormGroup, Input, Label, } from "reactstrap";
import user1 from "../img/users/user1.jpg";
import user2 from "../img/users/user2.jpg";
import user3 from "../img/users/user3.jpg";
import user4 from "../img/users/user4.jpg";

import React, {useState, useEffect} from "react";
import axios from 'axios';
// Modal
import AddPoinStandard from '../pages/AddPoinStandard';
import EditPoinStandard from '../pages/EditPoinStandard';

// import '../App.css';
// import "../styles.css";
import '../scss/ecoPoint.scss';

function getStandard(){
  return fetch('/ecoPointStandard')
    .then(response => {
      console.log(response.jyson);
        return response.json();
    })
    .then(ecoPointStandard => {
        return ecoPointStandard;
    })
    .catch(error => console.log(error));
}

export {
  getStandard,
}

const tableData = [
  {
    avatar: user1,
    name: "N123",
    email: "..",
    project: "플라스틱",
    status: "pending",
    weeks: "35",
    budget: "8,500",
  },
  {
    avatar: user2,
    name: "N123",
    email: "..",
    project: "종이",
    status: "done",
    weeks: "105",
    budget: "5,500",
  },
  {
    avatar: user3,
    name: "N123",
    email: "..",
    project: "캔",
    status: "holt",
    weeks: "22",
    budget: "15,000",
  },
  {
    avatar: user4,
    name: "N123",
    email: "...",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "7,700",
  },

];



const EcoPointStandard = () => {

  const [pointStandard, setPointStandard] = useState([]);
  const [selected, setSelected] = useState({});
  const baseURL = "http://localhost:8080/";
  
  function deletePointStandard(id){
    console.log(id + ": ???");
    fetch(baseURL + 'ecoPointStandard/' + id, {
      method: "delete",
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === "ok") {
          console.log(res + " RES");
          // setPointStandard(pointStandard.filter((item) => item.standardId !== id)); 
        }
      })
      .catch(error => console.log("fetch 에러!"));
      window.location.reload(); //화면 새로 고침
  }

  function editPointStandard(item){
    setModalOpen(true);
    console.log(item.classification + ": edit???");

    const selectedData = {
      standardId: item.standardId,
      classification: item.classification,
      countweightstandard : item.countweightstandard,
      standardDesc : item.standardDesc,
      ecoPoint : item.ecoPoint,
    };
    
    console.log(selectedData.standardDesc + " selectedData?");
    setSelected(selectedData);
    console.log(selected.standardDesc + " selected?");
    
  }
  
  // console.log(selected.standardDesc + "  ?!?!?!?");
  
  
  
  useEffect(() => {
    fetch(baseURL + 'ecoPointStandard')
    .then(response => response.json())
    .then(response => {
      setPointStandard(response);
    });
  }, [])


  // useEffect(() => {
  //   axios.get(baseURL + 'ecoPointStandard').then((res) => {
  //     console.log(res);
  //     setPointStandard(res);
  //   });
  // }, []);
  

  const [state, setState] = useState("");
  const [member, setMember] = useState({userId:null,userName:null})
 
  
  const [data, setData] = useState([]);
  const fetchData = () => {
    fetch('http://localhost:8080/ecoPointStandard')
        .then(response => response.json())
        .then(responseData => { setData(responseData.items); });
  }
 
  // 모달
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [modalOpen2, setModalOpen2] = useState(false);

  const openModal2 = () => {
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setModalOpen2(false);
  };

  const handleEditSubmit = (item) => {
    console.log(item);
    // handleSave(item);
    setModalOpen(false);
  }
  
//
  return (
    <div>
      {/* <button onClick={handleClickUser}>GetUser</button>
      <p>
        email: {member.userId} <br/>
        name: {member.userName}
      </p> */}
      
      <Card>
        <CardBody>
          <CardTitle tag="h4">EcoPointStandard</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            * 배출 품목에 따른 포인트 기준
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle table table-hover" responsive borderless>
            <thead>
              <tr>
                <th>분류</th>
                <th>무게/수량 (개/Kg)</th>
                <th>에코포인트</th>
                <th>설명</th>
                <th></th><th></th>
              </tr>
            </thead>
            <tbody>
               {pointStandard.map((tdata, index) => (
                <tr key={index} className="border-top">
  
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.classification}</h6>
                        {/* <span className="text-muted">{tdata.countweightstandard}</span> */}
                      </div>
                    </div>
                  </td>
                  <td>{tdata.countweightstandard}</td>
                  {/* <td>
                    {tdata.status === "pending" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.status === "holt" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td> */}
                  <td>{tdata.ecoPoint}</td>
                  <td>{tdata.standardDesc}</td>
                  {/* <td  onClick={() => deletePointStandard(tdata.standardId)}>remove</td> */}
                  <td>
                    {/* <Button className="btn" outline color="warning"  onClick={() => editPointStandard(tdata)}> 수정 </Button> */}
                    <React.Fragment>
                      <Button className="btn" outline color="warning"  onClick={() => editPointStandard(tdata)}>수정</Button>
                      {/* //header 부분에 텍스트를 입력한다. */}
                      <EditPoinStandard open={modalOpen} close={closeModal} selectedData={selected}  handelEditSubmit={handleEditSubmit}  
                        header="EcoPoint 기준 수정">
                      </EditPoinStandard>
                  </React.Fragment>
                  
                  </td>
                  <td>
                    <Button className="btn" outline color="danger"  onClick={() => deletePointStandard(tdata.standardId)}> 삭제 </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>


      <div className="button-group" >
      <React.Fragment>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end" >
          {/* <button class="btn btn-primary" type="button" onClick={openModal2}>추가</button> */}
          <Button className="btn" outline color="info" onClick={openModal2}>추가</Button>
        </div>
        
        <AddPoinStandard open={modalOpen2} close={closeModal2}  
          header="EcoPoint 기준 추가" />
      </React.Fragment>
      </div> 

    </div>
  );
};

export default EcoPointStandard;
