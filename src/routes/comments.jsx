import { useLoaderData, useNavigate } from 'react-router-dom'
import Comment from '../components/Comment'

import { apiUrl } from '../utils'

export async function loader() {
  const response = await fetch(`${apiUrl}/comments`, {
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
    await fetch(`${apiUrl}/comments/${commentId}`, {
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
