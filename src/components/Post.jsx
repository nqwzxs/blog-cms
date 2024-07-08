import { Link } from 'react-router-dom'

export default function Post({ post, handleDelete }) {
  return (
    <div className="p-2 px-4 rounded-sm w-full border flex justify-between gap-2">
      <Link to={`/post/${post._id}`} className="overflow-hidden">
        {post.title}
      </Link>
      <div className="flex gap-2">
        <Link to={`/post/${post._id}/edit`}>edit</Link>
        <button onClick={() => handleDelete(post._id)}>delete</button>
      </div>
    </div>
  )
}
