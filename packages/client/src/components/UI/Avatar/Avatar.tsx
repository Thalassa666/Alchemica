import { CSSProperties } from 'react'
import styles from './Avatar.module.scss'

interface AvatarProps {
  className?: string
  size: 's' | 'm' | 'l' | 'xl'
  imgUrl: string
  altText?: string
  style?: CSSProperties
}

export const Avatar = ({
  className,
  size,
  imgUrl,
  altText = 'User Avatar',
  style = {},
}: AvatarProps) => {
  const sizeClass = styles[`avatar-${size}`]

  return (
    <div
      style={{ ...style }}
      className={`${styles['avatar-container']} ${sizeClass} ${className}`}
    >
      <img className={styles['avatar-image']} src={imgUrl} alt={altText} />
    </div>
  )
}
