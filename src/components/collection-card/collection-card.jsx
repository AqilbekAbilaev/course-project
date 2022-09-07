import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const URL = "https://course-project-me.herokuapp.com";

const CollectionCard = ({ src, name, topic, description, id }) => {
  return (
    <Card style={{ width: "18rem", padding: "0 0" }}>
      <Card.Img variant="top" src={`${URL}/${src}`} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{topic}</Card.Text>
        {description?.slice(0, 40) + "..."}

        <Link to={"collections/" + id}>More</Link>
      </Card.Body>
    </Card>
  );
};

export default CollectionCard;
