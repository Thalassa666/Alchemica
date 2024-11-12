import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { TextArea } from '@components/UI'
import {
  IComment,
  ICommentResponse,
  ITopicResponse,
} from '@core/utils/interfaces/Forum'
import { useDispatch } from 'react-redux'
import { TAppDispatch } from '@core/store/store'
import { useAppSelector } from '@core/hooks'
import { createNewComment } from '@core/store/reducers/forum.reducer'

interface ModalProps {
  onClose: () => void
  topicContent: ITopicResponse | null
}

const Modal: React.FC<ModalProps> = ({ onClose, topicContent }) => {
  if (!topicContent) return null
  const [text1, setText1] = useState('') // State to hold text input value
  const [topic, setTopic] = useState<ITopicResponse | null>(null)
  const [messages, setMessages] = useState<ICommentResponse[] | null>(null)
  //if (!topicContent.messages) return null
  const dispatch = useDispatch<TAppDispatch>()
  const { userData } = useAppSelector(state => state.authReducer)
  const { topics } = useAppSelector(state => state.forumReducer)

  const handleClick = () => {
    if (userData && userData?.id !== null) {
      const data: IComment = {
        user: {
          id: userData.id,
          firstName: userData.first_name,
          secondName: userData.second_name,
          login: userData.login,
          avatar: userData.avatar,
        },
        content: text1,
        topicId: topicContent.id,
      }
      dispatch(createNewComment(data))
      setText1('')
    }
  }

  useEffect(() => {
    if (topics && topics !== null) {
      const item = topics.rows.find(
        (item1: ITopicResponse) => item1.id === topicContent.id
      )
      if (item.comments.length !== null) {
        const turns = [...item.comments]?.sort((a, b) => a.id - b.id)
        setMessages(turns)
      }
      setTopic(item)
    }
  }, [topics, topicContent])

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
        <h3>{topicContent.title}</h3>
        <div className={styles.messagesList}>
          {topicContent &&
            topic &&
            topic.comments &&
            topic.comments.length !== null &&
            messages &&
            messages.map(message => (
              <>
                {message !== null && (
                  <div key={message.id} className={styles.message}>
                    <p>
                      <strong>{message.user?.firstName}</strong>:{' '}
                      {message.content}
                    </p>
                    <div className={styles.date}>
                      {`${message.createdAt.slice(
                        0,
                        10
                      )} ${message.createdAt.slice(11, 16)}`}
                    </div>
                  </div>
                )}
                {messages === null ||
                  (messages?.length === 0 && (
                    <div className={styles.message}>
                      <p>
                        <strong>Сообщений еще нет. Напишите что-нибудь!</strong>
                      </p>
                    </div>
                  ))}
              </>
            ))}
        </div>
      </div>
      <TextArea
        onChange={e => {
          setText1(e.target.value)
        }}
        className={styles.modalMessage}
        size={'xl'}
        minRows={3}
        maxRows={3}
        placeholder={'Введите сообщение'}
        name={'forum-message'}
        value={text1}
      />
      <button
        className={`${styles.roundButton} ${styles.buttonAbsolute}`}
        onClick={handleClick}
      >
        &times;
      </button>
    </div>
  )
}

export default Modal
