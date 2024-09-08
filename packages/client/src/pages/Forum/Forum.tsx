import React, { useState } from 'react'
import styles from './styles.module.scss'
import { Header } from '@components/header/Header'
import { Layout } from './Layout'
import ForumList from '@components/forum/ForumList'
import Modal from '@components/forum/Modal'
import { Section, Topic } from '@src/types'
import { mockForumSections } from '../../../mocks/forumMock'

const Forum: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedTopic(null)
  }

  return (
    <>
      <section>
        <Header />
        <Layout>
          <div className={styles.section}>
            <div className={styles.forum}>
              <h1>GAME FORUM</h1>
              <ul className={styles.list}>
                {mockForumSections.map((section: Section) => (
                  <ForumList
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    topics={section.topics}
                    onSelectTopic={handleSelectTopic}
                  />
                ))}
              </ul>
            </div>
            <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              topicContent={selectedTopic}
            />
          </div>
        </Layout>
      </section>
    </>
  )
}

export default Forum
