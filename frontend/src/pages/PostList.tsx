import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface IPost {
  id: number;
  title: string;
  content: string;
  author: number;
  author_username: string;
  created_at: string;
}

function PostList() {
  const [posts, setPosts] = useState<IPost[]>([]);

  // 게시글 목록 조회, 쿠키 사용, access token 만료 시, refresh token 사용
  useEffect(() => {
    // TODO : API 처리 상태에서 로딩 상태 처리 필요
    axios.get('/api/posts/', {
      withCredentials: true,
    })
      .then(res => {
        setPosts(res.data);
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          const refreshTokenResponse = await axios.post('/api/token/refresh/', {
            withCredentials: true,
          });
          console.log(refreshTokenResponse); // check refresh token response
          axios.get('/api/posts/', {
            withCredentials: true,
          })
          .then(res => {
            setPosts(res.data);
          })
        }
      })
      // .catch(err => console.error(err)); 

  }, []);

  return (
    <div>
      <h1>게시글 목록</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong> by {post.author_username}
          </li>
        ))}
      </ul>
      <div><Link to="/posts/new"><button>새 게시글 작성</button></Link></div>
      <div><Link to="/"><button>홈</button></Link></div>
    </div>
  );
}

export default PostList;
