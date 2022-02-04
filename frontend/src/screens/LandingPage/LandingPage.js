import { useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './LandingPage.css';
function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/mynotes');
    }
  }, [navigate]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to note zipper</h1>
              <p className="subtitle">One Safe place for all your notes.</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button className="landingbutton" size="lg">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  variant="outline-primary"
                  className="landingbutton"
                  size="lg"
                >
                  Sign Up
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
