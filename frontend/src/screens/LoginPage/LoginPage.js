import React, { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen/MainScreeen';
import { Link } from 'react-router-dom';

import { Form, Button, Row, Col } from 'react-bootstrap';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import axios from 'axios';

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

 
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        '/api/users/login',
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <>
      <MainScreen title="Login">
        <div className="loginContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              New Customer? <Link to="/register">Register Here</Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </>
  );
};

export default LoginPage;
