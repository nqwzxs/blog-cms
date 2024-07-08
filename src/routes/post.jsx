import { format } from 'date-fns'
import { useLoaderData } from 'react-router-dom'

export async function loader({ params }) {
  const response = await fetch(
    `http://localhost:3000/api/v1/posts/${params.postId}`
  )
  const post = await response.json()
  return post
}

export default function Post() {
  const post = useLoaderData()

  const formattedDate = format(new Date(post.date_created), 'MM/dd/yyyy HH:mm')

  return (
    <div className="min-h-full flex-grow flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <span>{formattedDate}</span>
        <div className="flex gap-2">
          <button>edit</button>
          <button>delete</button>
        </div>
      </div>
      <h1 className="font-bold">{post.title}</h1>
      <p className="whitespace-pre-line text-justify text-gray-500">
        {post.body}
      </p>
    </div>
  )
}
