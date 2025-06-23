import { Form, redirect } from 'react-router-dom'

import { apiUrl } from '../utils'

export async function action({ request }) {
  const formData = await request.formData()
  const user = Object.fromEntries(formData)

  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  if (response.ok) {
    const token = await response.json()

    localStorage.setItem('token', token)
    return redirect('/')
  }

  return null
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Form method="post" className="flex flex-col gap-2 p-4 items-end">
        <input
          type="text"
          name="username"
          placeholder="username"
          autoComplete="off"
          required
          className="border-b focus:border-b-black focus:outline-none text-right"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
          className="border-b focus:border-b-black focus:outline-none text-right"
        />
        <button>login</button>
      </Form>
    </div>
  )
}
