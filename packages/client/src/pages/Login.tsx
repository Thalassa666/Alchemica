import { FormsLayout, LoginForm } from '@components/forms'

const Login = () => {
  return (
    <>
      <div>
        <FormsLayout children={<LoginForm />} />
      </div>
    </>
  )
}

export default Login
