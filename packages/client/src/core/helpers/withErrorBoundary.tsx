import errorPotionImage from '@/assets/assets/images/error_potion.png'
import { ErrorBoundary } from 'react-error-boundary'
import Error from '@pages/Error'
import { ReactNode } from 'react'

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
