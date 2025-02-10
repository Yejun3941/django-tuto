import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import PostCreate from './pages/PostCreate';
import PostList from './pages/PostList';


function Home() {
  const [msg, setMsg] = useState('');

  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/api/hello/')
  //     .then(res => setMsg(res.data.message))
  //     .catch(err => console.error(err));
  // }, []);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/hello/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        setMsg(res.data.message);
      } catch (err) {
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
