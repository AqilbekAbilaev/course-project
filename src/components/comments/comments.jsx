import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import Comment from "../../components/comment/comment";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import checkUser from "../../utils/check-user";

import "./comments.scss";

const URL = process.env.VITE_URL;

const Comments = ({ id }) => {
  const [comment, setComment] = useState({});
  const [comments, setComments] = useState([]);
  const { usr } = useAuth();
  const {itemId} = useParams()

  useEffect(() => {
    axios
      .get(`${URL}/collections/items/comments/`, {
        params: {
          id: itemId,
        },
      })
      .then((data) => {
        setComments(data?.data);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const handleSubmit = () => {
    if (!checkUser(usr)) return;

    if (!comment.from || !comment.text) {
      alert("Name and comment are required");
      return;
    }

    axios
      .post(URL + "/collections/items/comments", {
        text: comment?.text,
        date: new Date(),
        from: comment?.from,
        parent: itemId
      })
      .then((data) => {
        setComments(data?.data);
      });
  };

  return (
    <>
      <div className="comments-container">
        <div className="create-comment">
          <Form.Control
            className="name"
            type="text"
            name="from"
            placeholder="Name"
            onChange={handleChange}
          />
          <Form.Control
            className="textarea"
            as="textarea"
            rows={3}
            name="text"
            placeholder="Comment"
            onChange={handleChange}
          />
          <Button
            className="create-comment-btn"
            type="submit"
            onClick={handleSubmit}
          >
            Send
          </Button>
        </div>

        {comments.map((item, index) => (
          <Comment
            key={index}
            date={item.date}
            from={item.from}
            text={item.text}
          />
        ))}
      </div>
    </>
  );
};

export default Comments;
