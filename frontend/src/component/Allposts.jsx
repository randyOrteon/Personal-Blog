import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Allposts() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getPosts = async () => {
    try {
      const res = await axios.get(`${window.API_URL}/api/post/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data && res.data.length > 0) {
        setPosts(res.data);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
      console.log(res.data);
    } catch (e) {
      console.error(e);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="mainallposts">
      <div className="allposts">
        <h1>Allposts</h1>

        {loading && <div>Loading...</div>}
        {error && <div>Error loading posts</div>}
        {!loading &&
          !error &&
          posts.map((post) => (
            <div key={post._id}>
              <Posts {...post} />
            </div>
          ))}
      </div>

      <button onClick={() => navigate('/createpost')}>Create Post</button>
    </div>
  );
}

function Posts(props) {
  const navigate = useNavigate();

  return (
    <div className="posts" onClick={() => navigate(`/expandpost/${props._id}`)}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <p>Author: {props.author?.name || 'Unknown'}</p>
      <p>Date: {new Date(props.date).toLocaleDateString()}</p>
    </div>
  );
}

export default Allposts;
