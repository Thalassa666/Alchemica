import { TextArea } from '@components/UI'
import { useAppSelector } from '@core/hooks'
import { TAppDispatch } from '@core/store/store'
import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles.module.scss'
import { ITopic, ITopicResponse } from '@core/utils/interfaces/Forum'
import {
  createNewTopic,
  getTopicsData,
} from '@core/store/reducers/forum.reducer'
import ForumTopic from './ForumTopic'
import classNames from 'classnames'

interface ForumListProps {
  onSelectTopic: (topic: any) => void
  selectedTopic: ITopicResponse | null
  setSelectedTopic: React.Dispatch<React.SetStateAction<ITopicResponse | null>>
}

const ForumList = ({ onSelectTopic }: ForumListProps) => {
  const [text, setText] = useState('') // State to hold text input value
  const [showEmojiPicker, setShowEmojiPicker] = useState(false) // State for showing the emoji picker
  const { topics } = useAppSelector(state => state.forumReducer)
  const dispatch = useDispatch<TAppDispatch>()
  const { userData } = useAppSelector(state => state.authReducer)

  const handleEmojiClick = (emojiObject: any) => {
    setText(prevText => prevText + emojiObject.emoji) // Append selected emoji to the text area
  }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleButtonClick = () => {
    if (userData && userData?.id !== null) {
      const data: ITopic = {
        user: {
          id: userData.id,
          firstName: userData.first_name,
          secondName: userData.second_name,
          login: userData.login,
          avatar: userData.avatar,
        },
        title: text,
      }
      dispatch(createNewTopic(data))
    }
  }

  return (
    <div className={styles.sections}>
      <div className={styles.section}>
        <div className={styles.topicsList}>
          {topics && topics?.count === 0 ? (
            <div className={styles.forumTopic}>
              <h2 className={styles.text}>Тем пока нет. Создать тему?</h2>
            </div>
          ) : (
            topics &&
            topics !== null &&
            topics.count !== 0 &&
            topics.rows.map((topic: any) => (
              <ForumTopic
                key={topic.id}
                topic={topic}
                onClick={() => onSelectTopic(topic)}
              />
            ))
          )}
        </div>
        <div className={styles.topicsList1}>
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
            </div>

            <button
              className={classNames(styles.emojiButton, styles.icon3)}
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
            <button
              className={classNames(styles.roundButton, styles.icon2)}
              onClick={handleButtonClick}
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumList
