import { useState, useEffect } from 'react';
import API from '../api/axios';

interface Props {
  itemId: number;
  itemType: 'lost' | 'found';
}

const Comments = ({ itemId, itemType }: Props) => {
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState('');

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${itemType}/${itemId}`);
      setComments(res.data.data || res.data);
    } catch (err) {
      console.error("Comments fetch error", err);
    }
  };

  useEffect(() => { fetchComments(); }, [itemId, itemType]);

  const postComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/comments', { text, itemId, itemType });
      setText('');
      fetchComments();
    } catch (err) {
      alert("Error posting comment");
    }
  };

  return (
    <div className="mt-4 p-3 bg-light rounded border">
      <h5>Comments Section</h5>
      <form onSubmit={postComment} className="mb-3">
        <div className="input-group">
          <input 
            className="form-control" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Write a comment..." 
          />
          <button className="btn btn-primary">Post</button>
        </div>
      </form>
      {comments.map((c: any) => (
        <div key={c.id} className="card p-2 mb-2 border-0 shadow-sm">
          <strong>{c.user?.name || 'User'}</strong>
          <p className="mb-0">{c.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;