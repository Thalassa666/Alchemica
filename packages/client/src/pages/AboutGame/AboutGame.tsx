import { InfoBlock } from './InfoBlock'
import { Layout } from './Layout'

const AboutGame = () => {
  return (
    <>
      <div>
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
