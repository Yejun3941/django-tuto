import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO : API 처리 상태에서 로딩 상태 처리 필요
      const response = await axios.post(
        '/api/token/', 
        formData,
        {
          withCredentials: true // 쿠키를 주고받기 위해 필요
        }
      );
      alert(response.data.message); // TODO : 로그인 성공 시 메시지 출력 로직 추가 필요
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("로그인 실패"); // TODO : 로그인 실패 시 오류 처리 필요
    }
  }

  const handleLogout = async () => {
    try {
      // 쿠키를 삭제하기 위해 백엔드에 로그아웃 요청
      await axios.post('/api/token/logout/', {}, {
        withCredentials: true
      });
      alert("로그아웃 성공"); // TODO : 로그아웃 성공 시 쿠키 삭제 로직 추가 필요
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("로그아웃 실패");
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
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default Login;
