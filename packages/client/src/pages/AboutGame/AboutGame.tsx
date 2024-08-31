import { Header } from '@components/header/Header'
import { Layout } from './Layout'
import { InfoBlock } from './InfoBlock'

const AboutGame = () => {
  return (
    <>
      <div>
        <Layout
          children={
            <>
              <Header />
              <InfoBlock />
            </>
          }
        />
      </div>
    </>
  )
}

export default AboutGame
