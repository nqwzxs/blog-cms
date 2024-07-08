import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div className="min-h-full flex-grow flex flex-col gap-2 justify-center items-center w-full">
      <h1 className="text-8xl">{error.status}</h1>
      <p className="text-2xl">{error.statusText || error.message}</p>
    </div>
  )
}
