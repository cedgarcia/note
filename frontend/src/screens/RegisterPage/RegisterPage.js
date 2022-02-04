import React, { useState } from 'react';
import MainScreeen from '../../components/MainScreen/MainScreeen';
import { Form, Button } from 'react-bootstrap';
import ErrorMessage from '../../components/ErrorMessage';
import axios from 'axios';
import Loading from '../../components/Loading';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(
    'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
  );
  const [message, setMessage] = useState(null);
  const [imageMessage, setImageMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email);
    if (password !== confirmPassword) {
      setMessage('Passwords Do not match');
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          '/api/users',
          { name, email, password, image },
          config
        );
        setLoading(false);
        localStorage.setItem('userInfo', JSON.stringify(data));
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };
  const postDetails = (image) => {
    if (
      image ===
      'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    ) {
      return setImageMessage('Please Select an Image');
    }
    setImageMessage(null);
    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'notezipper');
      data.append('cloud_name', 'piyushproj');
      fetch('https://api.cloudinary.com/v1_1/piyushproj/image/upload', {
        method: 'post',
        body: data,
      })
        // SET URL
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setImage(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setImageMessage('Please Select an Image');
    }
  };

  return (
    <>
      <MainScreeen title="Register">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </Form.Group>

          {imageMessage && (
            <ErrorMessage variant="danger">{imageMessage}</ErrorMessage>
          )}
          <Form.Group>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="file"
              label="Upload Profile Picture"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </MainScreeen>
    </>
  );
};

export default RegisterPage;
