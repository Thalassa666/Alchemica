import React from 'react'
import styles from './styles.module.scss'
import { ITopicResponse } from '@core/utils/interfaces/Forum'

interface TopicProps {
  topic: ITopicResponse
  onClick: () => void
}

const ForumTopic: React.FC<TopicProps> = ({ topic, onClick }) => {
  return (
    topic && (
      <div className={styles.forumTopic} onClick={onClick}>
        <div className={styles.topicHead}>
          <p className={styles.topicTitle}>{topic.title}</p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              className={styles.date}
            >{`${topic.user?.firstName} ${topic.user?.secondName}`}</span>
            <span className={styles.date}>{`${topic.updatedAt.slice(
              0,
              10
            )} ${topic.updatedAt.slice(11, 16)}`}</span>
          </div>
        </div>
      </div>
    )
  )
}

export default ForumTopic
