import React from 'react'
import styles from './Avatar.module.scss'

interface AvatarProps {
  className?: string
  size: 's' | 'm' | 'l' | 'xl' // Different size options
  imgUrl: string // URL for the avatar image
  altText?: string // Optional alt text for accessibility
}

export const Avatar = ({
  className,
  size,
  imgUrl,
  altText = 'User Avatar',
}: AvatarProps) => {
  const sizeClass = styles[`avatar-${size}`] // Dynamically apply size classes

  return (
    <div className={`${styles['avatar-container']} ${sizeClass} ${className}`}>
      <img className={styles['avatar-image']} src={imgUrl} alt={altText} />
    </div>
  )
}
