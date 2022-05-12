import React, { useState, useEffect } from "react";

import { Col, Container, Row, Form, Button, Table } from "react-bootstrap";
import "./App.css";
import axios from "axios";

//api
const API = "https://jsonplaceholder.typicode.com/users";
function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    axios
      .get("http://192.168.1.100:8080/api/users")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);

  // Create use section
  const createUser = () => {
    if (id === 0) {
      axios
        .post("http://192.168.1.100:8080/api/users", {
          name: name,
          email: email,
          phone: phone,
        })
        .then((result) => {
          if (result.status === 200) {
            setId(0);
            setName("");
            setEmail("");
            setPhone("");
            setLoading(!loading);
          }
        });
    } else {
      axios
        .put(`http://192.168.1.100:8080/api/users/${id}`, {
          name: name,
          email: email,
          phone: phone,
        })
        .then((result) => {
          if (result.status === 200) {
            setId(0);
            setName("");
            setEmail("");
            setPhone("");
            setLoading(!loading);
          }
        });
    }
  };

  // Delete user section
  const deleteUser = (id) => {
    let promise = window.confirm("Rostan o'chirishni hohlaysizmi?");
    if (promise === true) {
      axios
        .delete(`http://192.168.1.100:8080/api/users/${id}`)
        .then((result) => {
          if (result.status === 200) {
            setLoading(!loading);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const editUser = (id) => {
    axios.get(`http://192.168.1.100:8080/api/users/${id}`).then((result) => {
      if (result.status === 200) {
        setName(result.data[0].name);
        setEmail(result.data[0].email);
        setPhone(result.data[0].phone);
        setId(result.data[0].id);
      }
    });
  };

  return (
    <>
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </Col>
            <Col>
              <Button
                style={{ marginTop: "30px" }}
                onClick={() => createUser()}
              >
                Create
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Table */}

        <Table striped bordered hover size="sm" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email address</th>
              <th>Phone Number</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={index}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.phone}</td>
                <td>
                  <Button variant="success" onClick={() => editUser(value.id)}>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => deleteUser(value.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default App;
