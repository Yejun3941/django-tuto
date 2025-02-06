import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  // In real case, you should store the access token and refresh token in a secure place like localStorage or cookie. 
  //  I have some questions. 
  // That case code is 
    // const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    // const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');
    // and
    // setAccessToken(response.data.access);
    // setRefreshToken(response.data.refresh);
    // localStorage.setItem('accessToken', response.data.access);
    // localStorage.setItem('refreshToken', response.data.refresh
    // But for simplicity, I will store it in the state.
    // You can change it to localStorage or cookie.
    // And you should remove the tokens when the user logs out.
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
    // setAccessToken('');
    // setRefreshToken('');

  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/token/', 
        formData
      );
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);
      alert("로그인 성공");
    } catch (error) {
      console.error(error);
      alert("로그인 실패");
    }
  }

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input 
            type="text" 
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">로그인</button>
      </form>

      {accessToken && (
        <div>
          <p>Access Token: {accessToken}</p>
          <p>Refresh Token: {refreshToken}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
