import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Comments from "../comments/comments";
import { FaHeart } from "react-icons/fa";

import checkUser from "../../utils/check-user";

import "./item.scss";

const URL = "https://course-project-me.herokuapp.com";

const Item = () => {
  const [like, setLike] = useState(true);
  const [item, setItem] = useState({});
  const [newItem, setNewItem] = useState({});
  const [edit, setEdit] = useState(false);
  const params = useParams();
  const { usr } = useAuth();
  const Navigate = useNavigate();

  useEffect(() => {
    axios.get(URL + "/collections/items/" + params.itemId).then((data) => {
      setItem(data.data);
      setNewItem(data.data);
    });
  }, [edit]);

  const handleReset = () => {
    if (!checkUser(usr)) return;

    setNewItem(item);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleLike = () => {
    if (!checkUser(usr)) return;
    axios
      .patch(URL + "/collections/items/" + params.itemId, {
        like,
      })
      .then((data) => {
        setItem(data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setLike(!like);
  };

  const handleDelete = () => {
    if (!checkUser(usr)) return;

    axios
      .delete(`${URL}/collections/items/${item._id}`)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        Navigate(-1, { replace: true });
      });
  };

  const handleSave = () => {
    axios
      .put(`${URL}/collections/items/${item._id}`, newItem)
      .then(() => {
        alert("Updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row>
        {Object.entries(newItem).map((item, index) => {
          if (
            item[0] == "_id" ||
            item[0] == "__v" ||
            item[0] == "likes" ||
            item[0] == "parent"
          )
            return;
          return (
            <Col key={index}>
              <Form.Label className="label">{item[0]}</Form.Label>
              <Form.Control
                disabled={!edit}
                name={item[0]}
                type={item[1]}
                onChange={handleChange}
                value={item[1]}
              />
            </Col>
          );
        })}
      </Row>
      <div className="like-container">
        <Button className="item-btn" variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button
          className="item-btn"
          variant="primary"
          onClick={() => {
            setEdit(!edit);
          }}
        >
          {!edit ? "Update" : "Reset"}
        </Button>
        <Button className="item-btn" variant="success" onClick={handleSave}>
          Save
        </Button>
        <FaHeart
          className="like"
          style={!like ? { color: "red" } : { color: "#444" }}
          onClick={handleLike}
        />
        {item.likes == 0 ? null : (
          <span className="like-counter">{item.likes}</span>
        )}
      </div>

      <Comments id={item._id} />
    </Container>
  );
};

export default Item;
