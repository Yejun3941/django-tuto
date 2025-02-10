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

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/posts/')
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.error(err));
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
