import { Avatar } from '@gravity-ui/uikit'
import { BASE_URL } from '@core/utils/constants'
import styles from './styles.module.scss'
import { ChangeEvent } from 'react'

export type TUploadAvatarProps = {
  src: string
}

export const UploadAvatar = ({ src }: TUploadAvatarProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('handleFileChange', e)
  }

  return (
    <div className={styles.avatarContainer}>
      <Avatar
        className={styles.avatarImage}
        size={'xl'}
        imgUrl={`${BASE_URL}/resources/${src}`}
      />
      <div className={styles.uploadOverlay}>
        <input
          type="file"
          accept="image/*"
          className={styles.uploadInput}
          onChange={handleFileChange}
        />
        <label htmlFor="upload-input" className={styles.uploadLabel}>
          Upload
        </label>
      </div>
    </div>
  )
}
