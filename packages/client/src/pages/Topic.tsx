import { useParams } from 'react-router-dom'

const Topic = () => {
  const { topicId } = useParams<{ topicId: string }>()

  return (
    <div>
      <h1>Topic ID: {topicId}</h1>
    </div>
  )
}

export default Topic
