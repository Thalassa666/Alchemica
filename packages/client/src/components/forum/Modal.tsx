import React from 'react'
import styles from './styles.module.scss'
import { Topic } from '@src/types'
import { TextArea } from '@components/UI'

interface ModalProps {
  onClose: () => void
  topicContent: Topic | null
}

const Modal: React.FC<ModalProps> = ({ onClose, topicContent }) => {
  if (!topicContent) return null

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
        <h3>{topicContent.title}</h3>
        <div className={styles.messagesList}>
          {topicContent.messages.map(message => (
            <div key={message.id} className={styles.message}>
              <p>
                <strong>{message.username}</strong>: {message.content}
              </p>
              <div className={styles.date}>{message.date}</div>
            </div>
          ))}
        </div>
      </div>
      <TextArea
        className={styles.modalMessage}
        size={'xl'}
        minRows={3}
        maxRows={3}
        placeholder={'введите сообщение'}
        name={'forum-message'}
      />
      <button className={`${styles.roundButton} ${styles.buttonAbsolute}`}>
        &times;
      </button>
    </div>
  )
}

export default Modal
