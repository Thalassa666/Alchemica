import ForumList from '@components/forum/ForumList'
import Modal from '@components/forum/Modal'
import { Header } from '@components/header/Header'
import { Section, Topic } from '@src/types'
import React, { useEffect, useState } from 'react'
import { mockForumSections } from '../../../mocks/forumMock'
import { useAppSelector, useForm } from '@core/hooks'
import { Layout } from './Layout'
import styles from './styles.module.scss'
import { getTopicsData } from '@core/store/reducers/forum.reducer'
import { useDispatch } from 'react-redux'
import { TAppDispatch } from '@core/store/store'
import { ITopicResponse } from '@core/utils/interfaces/Forum'

const Forum: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<ITopicResponse | null>(
    null
  )
  //const [topics, setTopics] = useState<any | null>(null)
  const { topics, createdTopic, createdComment } = useAppSelector(
    state => state.forumReducer
  )
  const dispatch = useDispatch<TAppDispatch>()

  const handleOpenTopic = (topic: ITopicResponse) => {
    setSelectedTopic(topic)
  }

  const handleCloseModal = () => {
    setSelectedTopic(null)
  }

  useEffect(() => {
    dispatch(getTopicsData())
  }, [])

  useEffect(() => {
    if (createdTopic !== null || createdComment !== null)
      dispatch(getTopicsData())
  }, [createdTopic, createdComment])

  /*useEffect(() => {
    if (createdComment && Array.isArray(topics.rows))
      setSelectedTopic(topics.rows.find((topic: ITopicResponse) => topic?.topicId === createdComment?.topicId))
  }, [createdComment])*/

  return (
    <>
      <section>
        <Header />
        <Layout>
          <div className={styles.section}>
            <div className={styles.forum}>
              <h1>GAME FORUM</h1>
              <ForumList
                onSelectTopic={handleOpenTopic}
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
              />
            </div>
            {selectedTopic && (
              <Modal onClose={handleCloseModal} topicContent={selectedTopic} />
            )}
          </div>
        </Layout>
      </section>
    </>
  )
}

export default Forum
