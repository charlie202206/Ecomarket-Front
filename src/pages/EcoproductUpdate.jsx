import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

const EcoproductUpdate = () => {
  const { id } = useParams();
  const [params, setParams] = useState({ name: ''
                                        ,price: ''
                                        ,quantity: ''
                                        ,supercategory: ''
                                        ,subcategory: ''
                                        ,productDescription: ''
                                        ,productImageId: ''
                                        ,memberId: ''
                                       });

  useEffect(() => {
    // axios.get(import.meta.env.VITE_API_SERVER + '/ecoProducts/' + id).then((res) => {
    axios.get('/ecoProducts/' + id).then((res) => {
      setParams({ name: res.data.name
                , price: res.data.price
                , quantity: res.data.quantity
                , supercategory: res.data.category.supercategory
                , subcategory: res.data.category.subcategory
                , productDescription: res.data.productDescription
                , productImageId: res.data.productImageId
                , memberId: res.data.memberId
               });
    });
  }, [params.name, params.price, params.quantity, params.supercategory, params.subcategory, params.productDescription, params.productImageId, params.memberId]
  );




  function handleChange(e) {
    const params = {
      name: document.getElementById('name').value,
      price: document.getElementById('price').value,
      quantity: document.getElementById('quantity').value,
      category : {
                     supercategory: document.getElementById('supercategory').value,
                     subcategory: document.getElementById('subcategory').value
                  },
      productDescription: document.getElementById('productDescription').value,
      productImageId: document.getElementById('productimageid').value,
      memberId: document.getElementById('memberId').value,


    };
    axios
      .put('/ecoProducts/' + id, params)
      .then((res) => {
        console.log(res.data);
      });
      alert('상품 수정 완료');

      window.location.href = '/EcoproductList';
  }
  return (
    <>
      <Row>
      <Col md="3" lg="6">
        <Card>
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            상품 정보 수정
          </CardTitle>
          <CardBody>
            <Form>
            <FormGroup>
                <Label for="name">멤버ID</Label>
                <Input
                  id="memberId"
                  name="memberId"
                  placeholder=""
                  type="text"
                  Value={params.memberId}
                />
              </FormGroup>
              <FormGroup>
                <Label for="name">상품명</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder=""
                  type="text"
                  defaultValue={params.name}
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">상품가격</Label>
                <Input
                  id="price"
                  name="price"
                  placeholder=""
                  type="text"
                  defaultValue={params.price}
                />
              </FormGroup>
              <FormGroup>
                <Label for="quantity">수량</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  placeholder=""
                  type="text"
                  defaultValue={params.quantity}
                />
              </FormGroup>

              <FormGroup>
                <Label for="supercategory">상위 카테고리</Label>
                <Input
                  id="supercategory"
                  name="supercategory"
                  placeholder="상위 "
                  type="text"
                  value={params.supercategory}
                />
              </FormGroup>
              <FormGroup>
                <Label for="subcategory">하위 카테고리</Label>
                <Input
                  id="subcategory"
                  name="subcategory"
                  placeholder=""
                  type="text"
                  value={params.subcategory}
                />
              </FormGroup>
              <FormGroup>
                <Label for="productDescription">상품 설명</Label>
                <Input id="productDescription" name="productDescription" type="textarea"  defaultValue={params.productDescription} />
              </FormGroup>
              <FormGroup>
                <Label for="productImageId">사진</Label>
                <input type="text" placeholder="" id="productimageid" value={params.productImageId} />
              </FormGroup>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button onClick={handleChange} >저장</Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
    </>
  );
};

export default EcoproductUpdate;
