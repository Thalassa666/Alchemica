import { FormsLayout, RegisterForm } from '@components/forms'

const Register = () => {
  return (
    <>
      <div>
        <FormsLayout
          isTitleShow={true}
          backgroundClass={'loginBg'}
          children={<RegisterForm />}
        />
      </div>
    </>
  )
}

export default Register
