import Card from "react-bootstrap/Card";

import "./comment.scss";

const Comment = ({ from, text, date }) => {
  return (
    <Card className="comment-container" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted from">
          {from} <span className="date">{date.slice(0, 10)}</span>
        </Card.Subtitle>
        <Card.Text style={{textAlign: "start"}}>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Comment;
