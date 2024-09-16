import { Header } from '@components/header/Header'
import { InfoBlock } from './InfoBlock'
import { Layout } from './Layout'

const AboutGame = () => {
  return (
    <>
      <div>
        <Header />
        <Layout
          children={
            <>
              <InfoBlock />
            </>
          }
        />
      </div>
    </>
  )
}

export default AboutGame
