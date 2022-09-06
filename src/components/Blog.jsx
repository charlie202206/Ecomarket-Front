import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

const Blog = (props) => {
  return (
    <Card>
      <CardImg alt="Card image cap" src={props.image} />
      <CardBody className="p-4">
        <CardTitle tag="h6">{props.title}</CardTitle>
        <CardSubtitle>{props.subtitle}</CardSubtitle>
        <CardText className="mt-3">{props.text}</CardText>
        {/* <Button color={props.color}>Read More</Button> */}
        {/* <FormGroup check>
            <Input type="checkbox" /> <Label check>Check</Label>
        </FormGroup> */}
      </CardBody>
    </Card>
  );
};

export default Blog;
