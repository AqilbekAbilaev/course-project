import { Link } from "react-router-dom";

import useCollections from "../../hooks/useCollections";
import useAuth from "../../hooks/useAuth";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const URL = "https://course-project-me.herokuapp.com/";

const Collections = () => {
  const { collections, setCollections } = useCollections();
  const { usr } = useAuth();
  console.log(usr);
  console.log(collections);

  return (
    <Container>
      <Row xs={1} md={4} className="g-4">
        {collections
          ?.filter((item) => item.parent == usr)
          .map((item, index) => (
            <Card key={index} style={{ width: "18rem", padding: "0 0" }}>
              <Card.Img variant="top" src={`${URL}/${item.image}`} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.topic}</Card.Text>

                <Link to={`/collections/${item._id}`}>More</Link>
              </Card.Body>
            </Card>
          ))}
      </Row>
      <Link to="/">Home</Link>
    </Container>
  );
};

export default Collections;
