import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TableJohn from '../components/TableJohn';
import "../scss/johnstyle.scss";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardSubtitle,
} from "reactstrap";
//글로벌변수
import {useContext} from "react";
import ContextAPI from "../ContextAPI";

const List = () => {
  //글로벌변수(useContext) ==사용 start
  const context = useContext(ContextAPI);
  console.log(context);
  console.log("props called inside of a function", context.memberEmail, context.memberName, context.memberId, context.memberSalesType, context.memberPhoneNumber);
  if(context.memberId === 0){
  // alert("비정상경로로 접근하였습니다.{" + context.memberId + "}");
  // return;
  }
  // ======= 사용 end



  const [data, setData] = useState([]);
  const { current: a } = useRef(['a']);
  console.log(a);


  function getId(str) {
    const idx = str.lastIndexOf('/');
    return str.substring(idx + 1);
  }


  function handleRemove(id) {
    console.log("Delete id", id);
    axios
    //  .delete(`${import.meta.env.VITE_API_SERVER}/ecoProducts/${id}`)
      .delete(`/ecoProducts/${id}`)
      .then((res) => {
        console.log(res.data);
      alert('상품 삭제 완료');
      });

      window.location.href = '/EcoproductList';
  }


  useEffect(() => {
    // axios.get('/ecoProducts').then((res) => {
    // axios.get(import.meta.env.VITE_API_SERVER + '/ecoProducts/search/findByMemberId?memberId='+1+'&projection=with-writer').then((res) => {
    axios.get('/ecoProducts/search/findByMemberId?memberId='+1+'&projection=with-writer').then((res) => {
    console.log(res);
    setData(res.data._embedded.ecoProducts);
    });
  }, [a]);

  const listItems = data.map((item, index) => (
    <>
      <li key={index}>
        <div>{item._links.self.href}</div>
          {`${getId(item._links.self.href)}: ${item.name}, ${item.price} ,${item.quantity}, ${item.category.supercategory}, ${item.category.subcategory}, ${item.productDescription}`}
      </li>
    </>
  ));

  const columns = useMemo(
    () => [
      {
        accessor: "name",
        Header: "상품명"
      },
      {
        accessor: "price",
        Header: "가격"
      },
      {
        accessor: "quantity",
        Header: "수량"
      },
      {
        accessor: "category.supercategory",
        Header: "상위구분"
      },
      {
        accessor: "category.subcategory",
        Header: "하위구분"
      },
      {
        accessor: "productDescription",
        Header: "상품설명"
      },
      {
        accessor: "productImageId",
        Header: "이미지"
      },
      {
        accessor: "_links.self.href",
        Header: "변경 및 삭제",
        Cell: ({ value }) => (
          <div className="button-group">
             <Link to={'/EcoproductUpdate/' + getId(value)}><Button className="btn" color="warning">변경</Button></Link>
             <Button className="btn" color="danger" onClick={() => handleRemove(getId(value))}>삭제</Button>
          </div>

        )
      }
    ],
    []
  );
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h4">상품 List 관리</CardTitle>
           <TableJohn  responsive columns={columns} data={data} />
        </CardBody>
      </Card>
    </>
  );

};

export default List;
