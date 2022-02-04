import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainScreeen from '../../components/MainScreen/MainScreeen';
import { Link } from 'react-router-dom';
import { Badge, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
function MyNotes() {
  const [notes, setNotes] = useState([]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure ?')) {
    }
  };

  const fetchNotes = async () => {
    const { data } = await axios.get('/api/notes');
    setNotes(data);
  };
  console.log(notes);
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <MainScreeen title="Welcome Back Cedrick">
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>

      {notes.map((note) => (
        <Accordion key={note._id}>
          <Accordion.Item variant="link" eventKey="0">
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: 'flex' }}>
                <span
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                    flex: 1,
                    cursor: 'pointer',
                    alignSelf: 'center',
                    fontSize: '18',
                  }}
                >
                  <Accordion.Button eventKey="0">{note.title}</Accordion.Button>
                </span>
                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    onClick={() => deleteHandler(note._id)}
                    variant="danger"
                    className="mx-2"
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>

              <Accordion.Body>
                <Card.Body>
                  <h4>
                    <Badge variant="success"> Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content} </p>
                    <footer className="blockquote-footer">
                      Created on -date
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainScreeen>
  );
}

export default MyNotes;
