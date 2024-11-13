import { Topic, Message } from '@src/types'
import React from 'react'
import styles from './styles.module.scss'

interface TopicProps {
  topic: Topic
  onClick: () => void
  firstMessage: Message
}

const ForumTopic: React.FC<TopicProps> = ({ topic, onClick, firstMessage }) => {
  return (
    <div className={styles.forumTopic} onClick={onClick}>
      <div className={styles.topicHead}>
        <p className={styles.topicTitle}>{topic.title}</p>
        <span className={styles.date}>{firstMessage.date}</span>
      </div>
      <div className={styles.topicMeta}>
        <p>
          <strong>{firstMessage.username}</strong>: {firstMessage.content}
        </p>
      </div>
    </div>
  )
}

export default ForumTopic
