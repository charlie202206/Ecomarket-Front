import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardGroup,
  Button,
  Row,
  Col,
} from "reactstrap";
import ReviewList from "./ReviewList";


const EcoproductSearchDtl = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const [params, setParams] = useState({ name: ''
                                        ,price: ''
                                        ,quantity: ''
                                        ,supercategory: ''
                                        ,subcategory: ''
                                        ,productDescription: ''
                                        ,productImageId: ''
                                       });
                                       

  useEffect(() => {
     axios.get('/ecoProducts/' + id).then((res) => {
    // axios.get(import.meta.env.VITE_API_SERVER + '/ecoProducts/' + id).then((res) => {
      setParams({ name: res.data.name
                , price: res.data.price
                , quantity: res.data.quantity
                , supercategory: res.data.category.supercategory
                , subcategory: res.data.category.subcategory
                , productDescription: res.data.productDescription
                , productImageId: res.data.productImageId
               });
    });
  }, [params.name, params.price, params.quantity, params.supercategory, params.subcategory, params.productDescription,  params.productImageId]
  );

  const productimg = 'https://s3-john.s3.ap-northeast-2.amazonaws.com/'+params.productImageId




  function handleBasket() {
    const params2 = {
      ecoProductId: id,
      ecoProductName: params.name,
      ecoProductQty: document.getElementById('quantity').value,
      ecoProductUnitPrice: params.price,
      memberId: 1 
    };
    axios
      .post('/ecoOrders/baskets', params2)
      .then((res) => {
        console.log(res.data);
      });
      alert('장바구니 등록완료');

      window.location.href = '/EcoproductSearchDtl/'+id;
    }

    function handleOrder(ecoProductId, ecoProductName, ecoProductQty, ecoProductUnitPrice, memberId, e) {
      console.log('ecoProductId : ', ecoProductId);
      console.log('ecoProductName : ', ecoProductName);
      console.log('ecoProductQty : ', ecoProductQty);
      console.log('ecoProductUnitPrice : ', ecoProductUnitPrice);
      setItems({  basketId: 1,
                  memberId: memberId,
                  ecoProductId: ecoProductId,
                  ecoProductName: ecoProductName,
                  ecoProductQty: ecoProductQty,
                  ecoProductUnitPrice: ecoProductUnitPrice
              });
      // 호출 화면쪽으로 주소 정보 넘겨야함
      navigate('/basketlist/ecoorder', {state: {items}});
    }
  
  return (
    <>
      <Row>
        <h3 className="mb-3 mt-3">상품 구매</h3>
        <Col md="3" lg="7" >
          <CardGroup>
            <Card>
              <div>
              <CardImg alt="Card image cap" src={productimg} top width="70%" />
              </div>
            </Card>
            <Card>
              <CardBody >
                <CardTitle tag="h4">{params.name}</CardTitle>
                <br></br>
                <CardSubtitle className="mb-2 text-muted" tag="h5">
                  가격:{params.price} 원
                </CardSubtitle>
                <CardText>
                {params.productDescription}
                <br></br>
                <br></br>
                수량<input type="text" placeholder="" id="quantity" defaultValue={0} onChange={e => setQuantity(e.target.value)}/>
                </CardText>
                <div className="button-group">
                <Link to={'/basketlist/ecoorder/' + id+'/'+params.price+'/'+quantity+'/'+1+'/' +params.name }><Button className="btn" >바로구매</Button></Link>
                <Button onClick={handleBasket} >장바구니</Button>
                <button type='submit' onClick={(e) => handleOrder(id, params.name,document.getElementById('quantity').value, params.price, 1, e)}>바로구매2</button>
                </div>
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      </Row>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <ReviewList responsive itemId={id} />
    </>
  );
};

export default EcoproductSearchDtl;
