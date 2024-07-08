import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export default function Comment({ comment, handleDelete }) {
  const formattedDate = format(
    new Date(comment.date_created),
    'MM/dd/yyyy HH:mm'
  )

  return (
    <div className="p-2 px-4 rounded-sm w-full border flex flex-col justify-between gap-2">
      <div className="flex justify-between gap-2">
        <span>{formattedDate}</span>
        <button onClick={() => handleDelete(comment._id)}>delete</button>
      </div>
      <h1 className="font-bold">{comment.author}</h1>
      <p className="overflow-hidden">{comment.body}</p>
    </div>
  )
}
