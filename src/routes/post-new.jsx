import { Form, redirect } from 'react-router-dom'

import { apiUrl } from '../utils'

export async function action({ request }) {
  const formData = await request.formData()
  const post = Object.fromEntries(formData)

  const response = await fetch(`${apiUrl}/posts/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })

  if (response.ok) {
    return redirect('/posts')
  }

  return null
}

export default function PostNew() {
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
        className="border p-2 focus:border-black rounded-sm focus:outline-none w-full"
      />
      <textarea
        type="text"
        name="body"
        placeholder="body"
        autoComplete="off"
        required
        className="border p-2 focus:border-black rounded-sm focus:outline-none min-h-48 h-48 w-full"
      />
      <button>add</button>
    </Form>
  )
}
