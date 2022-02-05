import React, { useState, useEffect } from 'react';
import MainScreeen from '../../components/MainScreen/MainScreeen';
import { Link } from 'react-router-dom';
import { Badge, Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/notesActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
function MyNotes() {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;
  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  useEffect(() => {
    dispatch(listNotes());
  }, [dispatch, userInfo, successCreate, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure ?')) {
      dispatch(deleteNoteAction(id));
    }
  };
  return (
    <MainScreeen title={`Welcome Back ${userInfo.name}`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {/* {error && <ErrorMessage >{error}</ErrorMessage>} */}
      {loading && <Loading />}
      {notes?.map((note) => (
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
