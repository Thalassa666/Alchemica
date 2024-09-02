import styles from './styles.module.scss'
import book from '../../assets/images/book-small-pic.png'
import skill1 from '../../assets/images/skill1-pic.png'
import skill2 from '../../assets/images/skill2-pic.png'
import skill3 from '../../assets/images/skill3-pic.png'
import potion1 from '../../assets/images/potion1-pic.png'
import potion2 from '../../assets/images/potion2-pic.png'
import potion3 from '../../assets/images/potion3-pic.png'
import arrow from '../../assets/images/arrow.png'

export const InfoBlock = () => {
  return (
    <>
      <div className={styles.form}>
        <h2>Alchemist</h2>
        <p>
          Вы - студент Королевской академии алхимии и траволечения. Если вы
          сдадите финальный экзамен, вас ждет хорошая должность при дворе и
          достойная жизнь, а если провалите - останетесь должны короне бездну
          золота за свое обучение. В общем, ставки высоки. Вам нужно
          подготовиться и сдать чертов экзамен. Спрашивать будут строго.
        </p>
        <div className={styles.layout2}>
          <p>Используйте способности</p>
          <div>
            <div className={styles.skill1}></div>
            <div className={styles.skill2}></div>
            <div className={styles.skill3}></div>
          </div>
        </div>
        <div className={styles.layout2}>
          <p>Следуйте рецептам</p>
          <div className={styles.book}></div>
        </div>
        <div className={styles.layout2}>
          <p>Создавайте идеальные зелья</p>
          <div>
            <div className={styles.potion1}></div>
            <div className={styles.potion2}></div>
            <div className={styles.potion3}></div>
          </div>
        </div>
        <p>И удачи на экзамене!</p>
      </div>
    </>
  )
}
