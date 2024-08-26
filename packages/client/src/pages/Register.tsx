
import { FormsLayout, RegisterForm } from '@components/forms'

const Register = () => {
  return (
    <>
      <div>
        <FormsLayout children={<RegisterForm />} />
      </div>
    </>
  )
}

export default Register
