import { ProfileForm, ProfileFormsLayout } from '@components/forms'
import { Header } from '@components/header/Header'
import styles from './styles.module.scss'

const Profile = () => {
  return (
    <section>
      <Header />
      <ProfileFormsLayout isTitleShow={false} backgroundClass={'profileBg'}>
        <ProfileForm />
      </ProfileFormsLayout>
    </section>
  )
}

export default Profile
