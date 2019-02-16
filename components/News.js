import { Title, Icon } from 'bloomer'
import { Default, BelowDefault, theme } from '../styles/utils'
import NewsItem from '../components/NewsItem'
import { useState, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'

export default ({ news }) => {
  const pages = news.map(item => ({ style }) => (
    <animated.div className='animated' style={{ ...style }}>
      <NewsItem news={item} DTsize='600x600' />
      <Icon isSize='large' className='fa fa-caret-right fa-3x' />
    </animated.div>
  ))

  const [index, set] = useState(0)
  const onClick = useCallback(() => set(state => (state + 1) % news.length), [])
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

  return (
    <React.Fragment>
      <Title
        style={{ margin: '1rem 2rem' }}
        hasTextColor='primary'
        className='is-size-6-mobile is-size-4 has-text-centered-mobile'>
        Наши новости
      </Title>
      <div className='simple-trans-main' onClick={onClick}>
        {transitions.map(({ item, props, key }) => {
          const Page = pages[item]
          return <Page key={key} style={props} />
        })}
        <style jsx>{`
          @media all and (min-width: 960px) {
            :global(figure.figure-media) {
              width: 400px;
              height: 400px;
              overflow: hidden;
            }
            :global(.simple-trans-main) {
              background: ${theme.primaryShadow};
            }
          }
            :global(.simple-trans-main) {
              position: relative;
              height: 60vh;
              width: 100%;
              margin: 0 auto;
              padding: 2rem;
              cursor: pointer;
            }
            @media all and (max-width: 599px) {
              :global(.simple-trans-main) {
                padding: 1rem;
              }
            }
            :global(.animated) {
              cursor: pointer;
              position: absolute;
              width: 90%;
              font-size: 20px;
              letter-spacing: 1.1px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              will-change: transform, opacity;
              text-shadow: 0px 2px 40px #00000020, 0px 2px 5px #00000030;
            }
            @media all and (max-width: 1089px) {
              :global(.animated) {
                font-size: 18px;
              }
            })
        `}</style>
      </div>
    </React.Fragment>
  )
}
