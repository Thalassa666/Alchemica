import { Avatar } from '@gravity-ui/uikit'
import { BASE_URL } from '@core/utils/constants'
import styles from './styles.module.scss'
import { ChangeEvent } from 'react'
import { changeAvatar } from '@core/store/reducers/user.reducer'
import { useDispatch } from 'react-redux'
import { TAppDispatch } from '@core/store/store'
import { getUserData } from '@core/store/reducers/auth.reducer'

export type TUploadAvatarProps = {
  src: string
}

export const UploadAvatar = ({ src }: TUploadAvatarProps) => {
  const dispatch = useDispatch<TAppDispatch>()

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        await dispatch(changeAvatar(file))
        await dispatch(getUserData())
      } catch (error) {
        console.error('Error changing avatar:', error)
      }
    }
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
          onChange={handleAvatarChange}
        />
        <label htmlFor="upload-input" className={styles.uploadLabel}>
          Upload
        </label>
      </div>
    </div>
  )
}
