import { useState, useEffect, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";

import navLogo from "../../assets/icons8-storage-48.png";

import "./navigation.scss";

const URL = "https://course-project-me.herokuapp.com/";

const Navigation = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { usr, setUsr } = useAuth();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.length < 4) return;
    axios.get(`${URL}/search`, { params: { search } }).then((data) => {
      setResults(data?.data);
      console.log(results);
    });
  };

  const handleLogOut = () => {
    localStorage.clear();
    setUsr(null);
    console.log(usr);
  };
  return (
    <>
      <Navbar expand="md">
        <Container>
          <Navbar.Brand href="#">
            <img src={navLogo} alt="nav logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Form className="d-flex search-form">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline-primary" onClick={handleSearch}>
                Search
              </Button>

              <div className={results.length ? "active" : "passive"}>
                {results.map((item, index) => {
                  return (
                    <a key={index} href={item}>
                      {item.slice(0, 46) + "..."}
                    </a>
                  );
                })}
              </div>
            </Form>
            <Nav
              className="ml-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {usr ? (
                <Button
                  variant="light"
                  className="logout-btn"
                  onClick={handleLogOut}
                >
                  Logout{" "}
                </Button>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      {usr ? (
        <Link className="btn btn-primary collection-btn" to="/collections">
          My collections
        </Link>
      ) : null}
    </>
  );
};

export default Navigation;
