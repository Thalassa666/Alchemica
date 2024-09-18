import Error from '@pages/Error/Error'
import { ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import errorPotionImage from '../../assets/images/icons/error_potion.png'

const WithErrorBoundary = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary
    fallback={
      <Error
        errorCode={500}
        errorMessage="Упс, что-то сломалось :-("
        errorPicture={errorPotionImage}
      />
    }
  >
    {children}
  </ErrorBoundary>
)

export default WithErrorBoundary
