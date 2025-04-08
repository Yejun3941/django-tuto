import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import PostCreate from './pages/PostCreate';
import PostList from './pages/PostList';
import Chat from './pages/Chat';


function Home() {
  const [msg, setMsg] = useState('');


  // useEffect(() => {
  //   axios.get('/api/hello/')
  //     .then(res => setMsg(res.data.message))
  //     .catch(err => console.error(err));
  // }, []);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get('/api/hello/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        setMsg(res.data.message);
      } catch (err) {
        setMsg('Token access failed');
        console.error(err);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <div>
        <h1>Django + React 연결</h1>
        <p>{msg}</p>
        <nav>
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/posts/new">PostCreate</Link></li>
            <li><Link to="/posts">PostList</Link></li>
            <li><Link to="/chat">Chat</Link></li>
          </ul>
        </nav>
      </div>
      
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/new" element={<PostCreate />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
