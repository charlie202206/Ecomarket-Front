import {
  Button,
  Row,
  Col,
  Alert,
  FormGroup,
  Label,
  Input,
  Badge,
} from "reactstrap";

import Blog from "../components/Blog";
import bg1 from "../img/bg/plastic.jpg";
import bg2 from "../img/bg/can.jpg";
import bg3 from "../img/bg/bg3.jpg";
import bg4 from "../img/bg/paper.jpg";

import  { Link } from 'react-router-dom';
import React, {useState, useEffect} from "react";

// Modal
import DisposalProduct from '../pages/DisposalProduct';
//글로벌변수
import {useContext} from "react";
import ContextAPI from "../ContextAPI";

const BlogData = [
  {
    id: 0,
    image: bg1,
    title: "플라스틱",
    subtitle: "(Plastic)",
    description:
      "음료수병, 간장 식용유병, 야쿠르트병, 세제용기류, 막걸리통, 물통, 우유병 등",
    btnbg: "primary",
  },
  {
    id: 1,
    image: bg2,
    title: "캔",
    subtitle: "(Can)",
    description:
      "음료용캔, 식품용 캔, 분유통, 통조림통, 에어졸, 부탄가스 등",
    btnbg: "primary",
  },
  {
    id: 2,
    image: bg3,
    title: "유리",
    subtitle: "(Glass)",
    description:
      "유리병, 식품용 캔, 분유통, 통조림통, 에어졸, 부탄가스 등",
    btnbg: "primary",
  },
  {
    id: 3,
    image: bg4,
    title: "종이",
    subtitle: "(Paper)",
    description:
      "책, 신문지, 노트, 복사지, 종이팩, 달력, 포장지, 종이컵, 우유팩, 종이상자류",
    btnbg: "primary",
  },
];

const baseURL = "http://localhost:8081/";

// function getMember(){
//   return fetch(baseURL + '/user')
//     .then(response => {
//       console.log(response.json);
//         return response.json();
//     })
//     .then(member => {
//         return member;
//     })
//     .catch(error => console.log(error));
// }

// export {
//   getMember
// };


// 카테고리 목록
// const CATEGORY_LIST = [
//   { id: 0, data: '플라스틱', title : "titme"},
//   { id: 1, data: '캔', title : "titme" },
//   { id: 2, data: '유리', title : "titme" },
//   { id: 3, data: '종이', title : "titme"},
//   { id: 4, data: '경남', title : "titme" },
//   { id: 5, data: '전북', title : "titme"},
//   { id: 6, data: '전남', title : "titme"},
// ];


const Disposal = () => {
  //글로벌변수(useContext) ==사용 start
  const context = useContext(ContextAPI);
  console.log(context);
  console.log("props called inside of a function", context.memberEmail, context.memberName, context.memberId, context.memberSalesType, context.memberPhoneNumber);
  if(context.memberId === 0){
    //alert("비정상경로로 접근하였습니다.{" + context.memberId + "}");
    //return;
  }
  // ======= 사용 end
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch('/disposal')
    .then(response => response.text())
    .then(message => {
      setMessage(message);
    });
  }, [])


  const [state, setState] = useState("");
  const [member, setMember] = useState({userId:null,userName:null})

  function handleClickUser(){
    getMember().then(response => {
      console.log(response);
      setMember(response);
    })
  }

  function test(item){
    setModalOpen(true);
    console.log(item.classification + ": edit???");

    // const selectedData = {
    //   standardId: item.standardId,
    //   classification: item.classification,
    //   countweightstandard : item.countweightstandard,
    //   standardDesc : item.standardDesc,
    //   ecoPoint : item.ecoPoint,
    // };

    // console.log(selectedData.standardDesc + " selectedData?");
    // setSelected(selectedData);
    // console.log(selected.standardDesc + " selected?");

  }

  // 모달
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  ////////////

    // 데이터를 넣을 빈배열
    const [checkedList, setCheckedList] = useState([]);
    // 1️⃣ onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
    const onCheckedElement = (checked, item) => {
      if (checked) {
        setCheckedList([...checkedList, item]);
      } else if (!checked) {
        setCheckedList(checkedList.filter(el => el !== item));
      }
    };
    // x를 누르면 리스팅 목록에서 카테고리가 삭제되며 체크도 해제 된다

  const onRemove = item => {
    setCheckedList(checkedList.filter(el => el !== item));
  };

    return (
        <div>
          <div>
        {/* <button onClick={handleClickUser}>GetUser</button>
        <p>
          email: {member.userId} <br/>
          name: {member.userName}
        </p> */}

      {/* --------------------------------------------------------------------------------*/}
      <Alert color="success">
      {message}
              {/* <b>{message} 님,</b> 어떤 상품을 <b>배출</b>하시겠습니까?   */}
              <b></b> 어떤 상품을 <b>배출</b>하시겠습니까?
              {/* <br/>   { <a href="/" className="alert-link"> EcoPoint 기준 조회  </a> } */}
      </Alert>
      <Row>
        {BlogData.map((item, index) => (
          <Col sm="6" lg="6" xl="3" key={item.id}>
          <Input type="checkbox"
            // 이때 value값으로 data를 지정해준다.
            value={item.title}
            // onChange이벤트가 발생하면 check여부와 value(data)값을 전달하여 배열에 data를 넣어준다.
            onChange={e => {
              onCheckedElement(e.target.checked, e.target.value);
            }}
            //  체크표시 & 해제를 시키는 로직. 배열에 data가 있으면 true, 없으면 false
            checked={checkedList.includes(item.title) ? true : false}
          />
          <div>{item.data}</div>
            <Blog
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              text={item.description}
              color={item.btnbg}
            />
        </Col>
        ))}
        <hr/>
        <div>
              {/* // 여기서부턴 리스팅 container!
              // checkedList가 빈배열일 경우, 즉 아무 데이터도 없을땐 길이가0이므로 조건부 렌더링을 사용하여 "카테고리를 지정해주세요" 문구가 출력되게 한다. */}
              {checkedList.length === 0 && (
                // <Alert>{'체크박스로 선택해주세요.'}</Alert>
                <div class="alert alert-light" role="alert">
                  {'체크박스로 선택해주세요.'}  </div>
              )}
            {/* // checkedList에 데이터가 들어가있을 경우 위와 마찬지로 map함수를 사용하여 데이터가 리스팅되도록 한다. */}
              {checkedList.map(item => {
                return (
                  <span key={item}>
              {/* // 카테고리를 삭제하면 배열에서 데이터가 삭제돠게 만드는 이벤트 */}
                    {/* <div onClick={() => onRemove(item)}>  X </div> */}
                      {/* <div key={item} > */}
                        <Button color="info" className="ms-3" outline>
                        {item}  <Badge color="secondary" onClick={() => onRemove(item)} >X</Badge>
                        </Button>


                      {/* </div> */}
                  </span>
                );
              })}
            </div>
      </Row>
      <hr/>

    <React.Fragment>
         <div class="d-grid gap-2 d-md-flex justify-content-md-end" >
          <Button className="btn" outline color="warning" onClick={openModal}>배출하기</Button>
        </div>
        {/* <Button className="btn" outline color="warning"   onClick={openModal}>배출하기</Button> */}
        {/* //header 부분에 텍스트를 입력한다. */}
        <DisposalProduct open={modalOpen} close={closeModal} selectedData={checkedList}
          header="재활용품 배출">
        </DisposalProduct>
    </React.Fragment>

    </div>


    </div>
  );
  // };
};


export default Disposal;
