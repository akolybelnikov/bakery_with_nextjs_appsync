import { Card } from 'bloomer/lib/components/Card/Card'
import { CardContent } from 'bloomer/lib/components/Card/CardContent'
import { CardImage } from 'bloomer/lib/components/Card/CardImage'
import { CardFooter } from 'bloomer/lib/components/Card/Footer/CardFooter'
import { CardFooterItem } from 'bloomer/lib/components/Card/Footer/CardFooterItem'
import { CardHeader } from 'bloomer/lib/components/Card/Header/CardHeader'
import { CardHeaderIcon } from 'bloomer/lib/components/Card/Header/CardHeaderIcon'
import { CardHeaderTitle } from 'bloomer/lib/components/Card/Header/CardHeaderTitle'
import { Icon } from 'bloomer/lib/elements/Icon'
import Link from 'next/link'
import { useState } from 'react'
import { animated as a, useSpring } from 'react-spring'
import { BelowDefault, Default } from '../styles/utils'

export default function({ vote }) {
  const [flipped, set] = useState(false)

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(800px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 600, friction: 100 },
  })

  return (
    <div className='vote-item'>
      <a.div
        className='c front'
        style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
        <Card className='vote-card'>
          <CardHeader>
            <CardHeaderTitle>{vote.productName}</CardHeaderTitle>
            <CardHeaderIcon
              style={{ cursor: 'pointer' }}
              onClick={() => set(state => !state)}>
              <Icon className='fas fa-redo-alt' />
            </CardHeaderIcon>
          </CardHeader>
          <CardImage
            style={{
              background: `center / contain no-repeat url(${
                process.env.IMAGEHANDLER_URL
              }/300x300/${vote.image})`,
              height: '100%',
            }}
          />
        </Card>
      </a.div>
      <a.div
        className='c back'
        style={{
          opacity,
          transofrm: transform.interpolate(t => `${t} rotateX(180deg)`),
        }}>
        <Card className='vote-card'>
          <CardHeader>
            <CardHeaderTitle>{vote.productName}</CardHeaderTitle>
            <CardHeaderIcon
              style={{ cursor: 'pointer' }}
              onClick={() => set(state => !state)}>
              <Icon className='fas fa-redo-alt' />
            </CardHeaderIcon>
          </CardHeader>
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
            className='has-text-centered is-size-6'>
            <Default>
              <span>
                {vote.content && vote.content.substring(0, 300)}
                {vote.content && vote.content.length > 300 && ' ... '}
              </span>
            </Default>
            <BelowDefault>
              <span>
                {vote.content && vote.content.substring(0, 100)}
                {vote.content && vote.content.length > 100 && ' ... '}
              </span>
            </BelowDefault>
            <br />
            {vote.ingridients && <span>{vote.ingridients}</span>}
            <br />
            <div
              style={{ display: 'flex', justifyContent: 'space-around' }}
              className='has-text-centered is-size-6'>
              {vote.weight && <span>Вес: {vote.weight}</span>}
              {vote.price && <span>Цена: {vote.price} руб.</span>}
            </div>
          </CardContent>
          <CardFooter
            style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <CardFooterItem>
              <a
                style={{ borderRadius: '4px' }}
                className='button is-primary is-outlined'
                href='tel:+79266298726'
                target='_self'
                aria-label='telephone number'
                isColor='primary'
                isOutlined>
                <span>Заказать</span>
                <Icon className='fas fa-phone' />
              </a>
            </CardFooterItem>
            <CardFooterItem>
              <Link
                href={{
                  pathname: '/product',
                  query: {
                    category: vote.category,
                    id: vote.productId,
                  },
                }}>
                <a
                  style={{ borderRadius: '4px' }}
                  className='button is-primary is-outlined'>
                  <span>Посмотреть</span>
                  <Icon className='fas fa-angle-double-right' />
                </a>
              </Link>
            </CardFooterItem>
          </CardFooter>
        </Card>
      </a.div>
      <style global jsx>
        {`
          .vote-item {
            position: relative;
            width: 24vw;
            height: 28vw;
            margin-top: 1%;
            overflow: hidden;
          }
          @media all and (max-width: 1088px) {
            .vote-item {
              width: 45vw;
              height: 48vw;
              margin-top: 2.5%;
            }
          }
          @media all and (max-width: 599px) {
            .vote-item {
              width: 95vw;
              height: 110vw;
              margin-top: 2.5%;
            }
          }
          .c {
            position: absolute;
            width: 100%;
            height: 100%;
            will-change: transform, opacity;
          }
          .vote-card {
            height: 100%;
          }
        `}
      </style>
    </div>
  )
}
