import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  // 실제로는 localStorage 등에 저장된 accessToken을 가져온다고 가정
  const token = localStorage.getItem('accessToken'); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/posts/',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('게시글이 작성되었습니다!');
      // 성공 후 /posts 페이지(게시글 목록)로 이동, useNavigate()
      navigate('/posts');
      

    } catch (error) {
      console.error(error);
      alert('작성 실패');
    }
  };

  return (
    <div>
      <h1>새 게시글 작성</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input 
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>내용</label>
          <textarea 
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <button type="submit">작성</button>
      </form>
    </div>
  );
}

export default PostCreate;
