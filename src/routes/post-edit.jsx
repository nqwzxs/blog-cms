import { useState } from 'react'
import { Form, redirect, useLoaderData } from 'react-router-dom'

export async function loader({ params }) {
  const response = await fetch(
    `http://localhost:3000/api/v1/posts/${params.postId}`
  )
  const post = await response.json()
  return post
}

export async function action({ request, params }) {
  const formData = await request.formData()
  const post = Object.fromEntries(formData)

  const response = await fetch(
    `http://localhost:3000/api/v1/posts/${params.postId}`,
    {
      method: 'put',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    }
  )

  if (response.ok) {
    return redirect('/posts')
  }

  return null
}

export default function PostEdit() {
  const post = useLoaderData()
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)

  return (
    <Form
      method="post"
      className="min-h-full flex-grow flex flex-col gap-2 items-start"
    >
      <input
        type="text"
        name="title"
        placeholder="title"
        autoComplete="off"
        required
        value={title}
        onChange={(e) => setTitle(e.value)}
        className="border p-2 focus:border-black rounded-sm focus:outline-none w-full"
      />
      <textarea
        type="text"
        name="body"
        placeholder="body"
        autoComplete="off"
        required
        value={body}
        onChange={(e) => setBody(e.value)}
        className="border p-2 focus:border-black rounded-sm focus:outline-none min-h-48 h-48 w-full"
      />
      <button>save</button>
    </Form>
  )
}
