import { FormsLayout, ProfileForm } from '@components/forms'
import styles from './styles.module.scss'

const Profile = () => {
  return (
    <>
      <FormsLayout isTitleShow={false} backgroundClass={'profileBg'}>
        <ProfileForm />
      </FormsLayout>
    </>
  )
}

export default Profile
