import axios from 'axios';
import React, { useRef } from "react";
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
import AWS from 'aws-sdk'

const S3_BUCKET ='s3-john';
const REGION ='ap-northeast-2';


AWS.config.update({
  accessKeyId: '',
  secretAccessKey: ''
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const EcoproductCreate = () => {

  const fileInput = useRef();


  function handleChange() {

    let file = fileInput.current.files[0];
    let newFileName = fileInput.current.files[0].name.replace(/ /, "");

    const params = {
      name: document.getElementById('name').value,
      price: document.getElementById('price').value,
      quantity: document.getElementById('quantity').value,
      category : {
                  supercategory: document.getElementById('supercategory').value,
                  subcategory: document.getElementById('subcategory').value
      },
      productDescription :  document.getElementById('productDescription').value,
      productImageId: newFileName,
      memberId: "1"
    };
    console.log(params);

    axios
      // .post(import.meta.env.VITE_API_SERVER + '/ecoProducts', params)
      .post('/ecoProducts', params)
      .then((res) => {
        console.log(res.data);
        alert('상품 등록 완료');
      });

      const awsparams = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
    };

    myBucket.putObject(awsparams)
        .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
            if (err) console.log(err)
        })



      window.location.href = '/EcoproductCreate';
  }
  return (
    <>
      <Row>
      <Col md="3" lg="6">
        <Card>
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            상품 등록
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="name">상품명</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="이름"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">상품가격</Label>
                <Input
                  id="price"
                  name="price"
                  placeholder="상품가격"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="quantity">수량</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  placeholder="수량"
                  type="text"
                />
              </FormGroup>

              <FormGroup>
                <Label for="supercategory">상위 카테고리</Label>
                <Input
                  id="supercategory"
                  name="supercategory"
                  placeholder="상위 카테고리"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="subcategory">하위 카테고리</Label>
                <Input
                  id="subcategory"
                  name="subcategory"
                  placeholder="하위 카테고리"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="productDescription">상품 설명</Label>
                <Input id="productDescription" name="productDescription" type="textarea" />
              </FormGroup>
              <FormGroup>
                <Label for="productImageId">사진</Label>
                <input type="file"  placeholder="사진" id="productImageId" ref={fileInput} />
              </FormGroup>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
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

export default EcoproductCreate;
