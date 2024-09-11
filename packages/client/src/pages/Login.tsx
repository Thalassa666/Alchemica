import { FormsLayout, LoginForm } from '@components/forms'

const Login = () => {
  return (
    <>
      <div>
        <FormsLayout isTitleShow={true} backgroundClass={'loginBg'}>
          <LoginForm />
        </FormsLayout>
      </div>
    </>
  )
}

export default Login
