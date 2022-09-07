import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../scss/style.scss";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
} from "reactstrap";
//글로벌변수
import {useContext} from "react";
import ContextAPI from "../ContextAPI";

  const EcoproductSearch = () => {
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

    const [search, setSearch] = useState('');


    function getId(str) {
      const idx = str.lastIndexOf('/');
      return str.substring(idx + 1);
    }

    useEffect(() => {
      if(search === "") {
        axios.get('/ecoProducts').then((res) => {
        // axios.get('/ecoProducts').then((res) => {
          console.log(res);
          setData(res.data._embedded.ecoProducts);
          });
      } else {
        data.filter(data => bySearch(data, search));
      }
    }, [search]);


    const bySearch = (data, search) => {
      if (search) {
        return data.name.toLowerCase().includes(search.toLowerCase());
      } else return data;
    };


    const filteredList = (data,  search) => {
      return data
        .filter(data => bySearch(data, search));
    };


return (
    <>
      <h1>상품 검색</h1>
      <input
        type="search"
        placeholder="search"
        onChange={e => setSearch(e.target.value)}
      />
      <br></br>
      <br></br>
      <Row >
        {filteredList(data, search).map((item,index) => (
          <Col md="3" lg="3" key={index}>
            <Card className="text-center" >
              <CardImg alt="Card image cap" src={'https://s3-john.s3.ap-northeast-2.amazonaws.com/'+item.productImageId} />
              <CardBody className="p-4">
                <CardTitle tag="h4">{item.name}</CardTitle>
                <CardSubtitle tag="h6" >{item.category.subcategory}</CardSubtitle>
                <br></br>
                <Link to={'/EcoproductSearchDtl/' + getId(item._links.self.href)}><Button color="primary">구매</Button></Link>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );

};

export default EcoproductSearch;
