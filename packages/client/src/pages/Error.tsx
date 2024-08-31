import React from 'react'
import styles from './Error.module.scss'
import { Link } from 'react-router-dom'

interface ErrorProps {
  errorCode: number
  errorMessage: string
  errorPicture: string
}

const Error: React.FC<ErrorProps> = ({
  errorCode,
  errorMessage,
  errorPicture,
}) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <div className={styles.errorBackground}></div>
        <img
          src={errorPicture}
          alt="Error picture"
          className={styles.errorImage}
        />
        <h1 className={styles.errorTitle}>Ошибка {errorCode}</h1>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <Link to="/" className={styles.errorLink}>
          Вернуться назад и попробовать снова
        </Link>
      </div>
    </div>
  )
}

export default Error
