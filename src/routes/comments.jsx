import { useLoaderData, useNavigate } from 'react-router-dom'
import Comment from '../components/Comment'

export async function loader() {
  const response = await fetch('http://localhost:3000/api/v1/comments', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  const comments = await response.json()
  return comments
}

export default function Comments() {
  const comments = useLoaderData()
  const navigate = useNavigate()

  async function handleDelete(commentId) {
    await fetch(`http://localhost:3000/api/v1/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    return navigate('/comments', { replace: true })
  }

  return (
    <div className="min-h-full flex-grow flex flex-col gap-2">
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}
