import { useState } from 'react'
import styles from './styles.module.scss'
import ForumTopic from '@components/forum/ForumTopic'
import { Topic } from '@src/types'
import { TextArea } from '@components/UI'
import EmojiPicker from 'emoji-picker-react'

interface ForumListProps {
  id: number
  title: string
  topics: Topic[]
  onSelectTopic: (topic: Topic) => void
}

const ForumList = ({ id, title, topics, onSelectTopic }: ForumListProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('') // State to hold text input value
  const [showEmojiPicker, setShowEmojiPicker] = useState(false) // State for showing the emoji picker

  const toggleSection = () => {
    setIsOpen(!isOpen)
  }

  const handleEmojiClick = (emojiObject: any) => {
    setText(prevText => prevText + emojiObject.emoji) // Append selected emoji to the text area
  }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  return (
    <div className={styles.sections}>
      <div className={styles.section}>
        <button className={styles.header} onClick={toggleSection}>
          {title}
          <span className={styles.headerMarks}>
            <span className={styles.circle}>{topics.length}</span>
            <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>
              &#9660;
            </span>
          </span>
        </button>
        {isOpen && (
          <div className={styles.topicsList}>
            {topics.length === 0 ? (
              <div className={styles.forumTopic}>
                <div>нет тем</div>
              </div>
            ) : (
              topics.map(topic => (
                <ForumTopic
                  key={topic.id}
                  topic={topic}
                  onClick={() => onSelectTopic(topic)}
                  firstMessage={topic.messages[0]}
                />
              ))
            )}
            <div className={styles.forumTopic}>
              <div className={styles.newTopic}>
                <TextArea
                  className={styles.newTopicInput}
                  size={'l'}
                  placeholder={'создать новый топик'}
                  name={'new-topic'}
                  value={text}
                  onChange={e => setText(e.target.value)} // Update text state
                />
                <button
                  className={styles.emojiButton}
                  onClick={toggleEmojiPicker}
                >
                  {showEmojiPicker ? 'Закрыть' : '😀'}
                </button>
                {showEmojiPicker && (
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    height={350}
                    width={300}
                  />
                )}
                <button className={styles.roundButton}>&times;</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForumList
