import { LeaderboardLayout, LeadersListItem } from '@components/Leaderboard'
import styles from './styles.module.scss'
import { Button } from '@gravity-ui/uikit'

const Leaderboard = () => {
  return (
    <>
      <section>
        <LeaderboardLayout>
          <div className={styles.leaderboard}>
            <h2>BOARD OF HONOR</h2>
            <ul className={styles.list}>
              <LeadersListItem
                title={'Диплом с отличием'}
                time={18000}
                imagUrl={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcQ-IfY7IMPcRZFvL_HwG0NuVRLejlGfncQ&s'
                }
                iconBackgroundClass={'first'}
              />
              <LeadersListItem
                title={'Почетный выпускник'}
                time={99999}
                imagUrl={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcQ-IfY7IMPcRZFvL_HwG0NuVRLejlGfncQ&s'
                }
                iconBackgroundClass={'second'}
              />
              <LeadersListItem
                title={'Гордость академии'}
                time={1245558}
                imagUrl={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcQ-IfY7IMPcRZFvL_HwG0NuVRLejlGfncQ&s'
                }
                iconBackgroundClass={'third'}
              />
            </ul>
          </div>
        </LeaderboardLayout>
      </section>
    </>
  )
}

export default Leaderboard