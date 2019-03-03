import { Card } from 'bloomer/lib/components/Card/Card'
import { CardContent } from 'bloomer/lib/components/Card/CardContent'
import { CardImage } from 'bloomer/lib/components/Card/CardImage'
import { CardFooter } from 'bloomer/lib/components/Card/Footer/CardFooter'
import { CardHeader } from 'bloomer/lib/components/Card/Header/CardHeader'
import { CardHeaderIcon } from 'bloomer/lib/components/Card/Header/CardHeaderIcon'
import { CardHeaderTitle } from 'bloomer/lib/components/Card/Header/CardHeaderTitle'
import { Icon } from 'bloomer/lib/elements/Icon'
import { Tag } from 'bloomer/lib/elements/Tag'
import { useState } from 'react'
import { animated as a, useSpring } from 'react-spring'
import { CardFooterItem } from 'bloomer/lib/components/Card/Footer/CardFooterItem';

export default function({ vote }) {
  const [flipped, set] = useState(false)

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(800px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 600, friction: 100 },
  })

  return (
    <Card className='vote-card'>
      <CardHeader style={{position: 'sticky'}}>
        <CardHeaderTitle>{vote.productName}</CardHeaderTitle>
        <CardHeaderIcon
          style={{ cursor: 'pointer' }}
          onClick={() => set(state => !state)}>
          <Icon className='fas fa-redo-alt' />
        </CardHeaderIcon>
      </CardHeader>
      <div>
        <a.div
          className='c front'
          style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
          <CardImage
            style={{
              background: `center / contain no-repeat url(${
                process.env.IMAGEHANDLER_URL
              }/300x300/${vote.image})`,
              height: '100%',
            }}
          />
        </a.div>
        <a.div
          className='c back'
          style={{
            opacity,
            transofrm: transform.interpolate(t => `${t} rotateX(180deg)`),
          }}>
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
            className='has-text-centered is-size-6'>
            <span>{vote.content && vote.content.substring(0, 100)} {vote.content && vote.content.length > 100 && ' ... '}</span>
            <br />
            <span>{vote.ingridients && vote.ingridients}</span>
            <br />
            <div
              style={{ display: 'flex', justifyContent: 'space-around' }}
              className='has-text-centered is-size-6'>
              <span>{vote.weight && vote.weight}</span>
              <span>{vote.price && vote.price} руб.</span>
            </div>
          </CardContent>
          <CardFooter>
              <CardFooterItem><Icon className='fas fa-phone' /></CardFooterItem>
              <CardFooterItem><Icon className='fas fa-angle-double-right' /></CardFooterItem>
          </CardFooter>
        </a.div>
      </div>

      <style global jsx>
        {`
          .vote-card {
            position: relative;
            width: 24vw;
            height: 28vw;
            margin-top: 1%;
            overflow-y: hidden;
          }
          @media all and (max-width: 1088px) {
            .vote-card {
              width: 45vw;
              height: 48vw;
              margin-top: 2.5%;
            }
          }
          @media all and (max-width: 599px) {
            .vote-card {
              width: 95vw;
              height: 98vw;
              margin-top: 2.5%;
            }
          }
          .c {
            position: absolute;
            width: 100%;
            height: 100%;
            will-change: transform, opacity;
          }
        `}
      </style>
    </Card>
  )
}
