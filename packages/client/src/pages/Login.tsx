import { FormsLayout, LoginForm } from '@components/forms'

const Login = () => {
  throw new Error('I crashed!')
  return (
    <>
      <div>
        <FormsLayout children={<LoginForm />} />
      </div>
    </>
  )
}

export default Login
