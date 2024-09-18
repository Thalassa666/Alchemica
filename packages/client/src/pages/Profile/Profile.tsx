import { ProfileForm, ProfileFormsLayout } from '@components/forms'

const Profile = () => {
  return (
    <section>
      <ProfileFormsLayout isTitleShow={false} backgroundClass={'profileBg'}>
        <ProfileForm />
      </ProfileFormsLayout>
    </section>
  )
}

export default Profile
