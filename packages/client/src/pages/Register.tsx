import { FormsLayout, RegisterForm } from '@components/forms'

const Register = () => {
  return (
    <>
      <div>
        <FormsLayout backgroundClass={'loginBg'} children={<RegisterForm />} />
      </div>
    </>
  )
}

export default Register
