import { FormsLayout, ChangePassForm } from '@components/forms'

export const ChangePass = () => {
  return (
    <FormsLayout isTitleShow={false} backgroundClass={'profileBg'}>
      <ChangePassForm />
    </FormsLayout>
  )
}
