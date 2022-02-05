import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes';
import LoginPage from './screens/LoginPage/LoginPage';
import RegisterPage from './screens/RegisterPage/RegisterPage';
import CreateNote from './screens/CreateNote/CreateNote';
import EditNote from './screens/CreateNote/EditNote';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createnote" element={<CreateNote />} />
        <Route path="/note/:id" element={<EditNote />} />
        <Route path="/mynotes" element={<MyNotes />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
