import { FormsLayout, ProfileForm } from '@components/forms'
import { useAppSelector } from '@core/hooks/useAppSelector'
import { useEffect } from 'react'

const Profile = () => {
  return (
    <>
      <FormsLayout backgroundClass={'profileBg'}>
        <ProfileForm />
      </FormsLayout>
    </>
  )
}

export default Profile
