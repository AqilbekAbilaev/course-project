import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import MultipleSelect from "../multipleselect/multipleselect";

import useField from "../../hooks/useField";
import useAuth from "../../hooks/useAuth";

import "./collection.scss";

const URL = "https://course-project-me.herokuapp.com/";

const Collection = ({}) => {
  const [collection, setCollection] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const [item, setItem] = useState({});
  const [itemTags, setItemTags] = useState([]);
  const params = useParams();
  const { fields, setFields } = useField();
  const { usr } = useAuth();

  console.log(itemTags);
  useEffect(() => {
    axios
      .get(`${URL}/collections/${params.id}`)
      .then((data) => {
        setCollection(data.data.collection);
        setFields(data.data.collection.item_fields);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(item);
  useEffect(() => {
    axios
      .get(`${URL}/collections/saveditems/get`, {
        params: {
          id: params.id,
        },
      })
      .then((data) => setSavedItems(data?.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCreateItem = (e) => {
    if (!usr) {
      alert("sorry unauthenticated users cannot create item!");
      return;
    }
    if (!item.id || !item.name || itemTags.length == 0) {
      alert("Please fill the all form!");
      return;
    }
    axios
      .post(`${URL}/collections/saveItem`, {
        ...item,
        tag: itemTags,
        parent: params.id,
      })
      .then((data) => {
        setSavedItems(data.data);
      });
  };

  return (
    <Container className="collection-container">
      <Row>
        <Col>
          <img
            className="collection-img"
            src={"https://course-project-me.herokuapp.com/" + "/" + collection?.image}
            alt="collection image"
          />
        </Col>
        <Col>
          <p>Collection Name: {collection?.name}</p>
          <p>Collection Topic: {collection?.topic}</p>
          {collection?.markdown ? (
            <ReactMarkdown children={collection?.description} />
          ) : (
            <p>{collection?.description}</p>
          )}
        </Col>
      </Row>
      <h3 className="title">Items</h3>
      {savedItems.length > 0 ? (
        savedItems?.map((item, index) => {
          return (
            <Row style={{ alignItems: "flex-end" }} key={index}>
              {Object.entries(item)
                .slice(0, 4)
                .map((child, indx) => {
                  if (
                    child[0] == "_id" ||
                    child[0] == "__v" ||
                    child[0] == "parent"
                  )
                    return;

                  return (
                    <Col key={indx}>
                      <Form.Label className="label">{child[0]}</Form.Label>
                      <Form.Control
                        name={child[1]}
                        type={child[1]}
                        onChange={handleChange}
                        value={child[1]}
                        disabled
                      />
                    </Col>
                  );
                })}
              <Col>
                <Link variant="primary" to={item._id}>
                  View
                </Link>
              </Col>
            </Row>
          );
        })
      ) : (
        <p>No items</p>
      )}

      <Row className="create-item-container">
        <h3 className="title">Create new item</h3>
        {fields?.map((item, index) => {
          if (item.name == "tag") {
            return <MultipleSelect key={index} setItemTags={setItemTags} />;
          }
          return (
            <Col key={index}>
              <Form.Label className="label">{item?.name}</Form.Label>
              <Form.Control
                name={item?.name}
                type={item?.type}
                placeholder={item?.name}
                onChange={handleChange}
              />
            </Col>
          );
        })}
        <Button className="create-item-btn" onClick={handleCreateItem}>
          Create item
        </Button>
      </Row>
    </Container>
  );
};

export default Collection;
