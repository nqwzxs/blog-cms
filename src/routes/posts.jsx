import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import Post from '../components/Post'

import { apiUrl } from '../utils'

export async function loader() {
  const response = await fetch(`${apiUrl}/posts`)
  const posts = await response.json()
  return posts
}

export default function Posts() {
  const posts = useLoaderData()
  const navigate = useNavigate()

  async function handleDelete(postId) {
    await fetch(`${apiUrl}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    return navigate('/posts', { replace: true })
  }

  return (
    <div className="min-h-full flex-grow flex flex-col gap-2">
      <Link
        to={'/post/new'}
        className="bg-gray-100 p-2 px-4 rounded-sm w-full mb-2 text-center"
      >
        add new post
      </Link>
      {posts.map((post) => (
        <Post key={post._id} post={post} handleDelete={handleDelete} />
      ))}
    </div>
  )
}
