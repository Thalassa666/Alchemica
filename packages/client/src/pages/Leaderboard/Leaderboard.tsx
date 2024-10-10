import { LeadersListItem } from '@components/Leaderboard'
import { Loader } from '@components/UI'
import { useFetch } from './lib/useFetch'
import styles from './styles.module.scss'

const Leaderboard = () => {
  const { data, isLoading, isError, errorMessage } = useFetch()

  return (
    <>
      <section className={styles.layout}>
        <div className={styles.background}>
          <div className={styles.leaderboard}>
            <h2>BOARD OF HONOR</h2>

            {isError && <p>Ошибка: {errorMessage} </p>}
            {isLoading && <Loader />}

            {data && (
              <ul className={styles.list}>
                {data?.map(item => (
                  <LeadersListItem
                    key={item.data.user.login}
                    data={item.data}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Leaderboard
