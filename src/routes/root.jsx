import { Link, useNavigate, Outlet, useFetcher } from 'react-router-dom'

export default function Root() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    return navigate('/login')
  }

  return (
    <div className="min-h-screen divide-y flex flex-col">
      <div>
        <div className="max-w-screen-sm mx-auto flex justify-between items-center p-4 gap-4">
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link to="posts">posts</Link>
              </li>
              <li>
                <Link to="comments">comments</Link>
              </li>
            </ul>
          </nav>
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>
      <div className="flex-grow">
        <div className="max-w-screen-sm mx-auto min-h-full flex justify-between items-center p-4 gap-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
