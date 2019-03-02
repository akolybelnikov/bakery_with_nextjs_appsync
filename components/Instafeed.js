import axios from 'axios'
import { Card } from 'bloomer/lib/components/Card/Card'
import { CardContent } from 'bloomer/lib/components/Card/CardContent'
import { CardImage } from 'bloomer/lib/components/Card/CardImage'
import { CardHeader } from 'bloomer/lib/components/Card/Header/CardHeader'
import { Title } from 'bloomer/lib/elements/Title'
import { Column } from 'bloomer/lib/grid/Column'
import { Columns } from 'bloomer/lib/grid/Columns'
import { Fragment, useEffect, useState } from 'react'
import Moment from 'react-moment'
import { theme } from '../styles/utils'
import { CardHeaderTitle } from 'bloomer/lib/components/Card/Header/CardHeaderTitle'
import { CardHeaderIcon } from 'bloomer/lib/components/Card/Header/CardHeaderIcon'
import { Icon } from 'bloomer/lib/elements/Icon'
import LazyLoad from 'react-lazy-load'

export default () => {
  const [data, setData] = useState({ data: [] })

  const fetchData = async () => {
    const result = await axios(
      `https://api.instagram.com/v1/users/${
        process.env.INSTAGRAM_USER_ID
      }/media/recent/?access_token=${
        process.env.INSTAGRAM_ACCESS_TOKEN
      }&&count=4`,
    )
    console.log(result.data.data)
    setData(result.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Fragment>
      <Title
        style={{ margin: '1.5rem 0', color: theme.primary, textAlign: 'center' }}
        className='is-size-6-mobile is-size-4 has-text-centered-mobile'>
        Мы на Инстаграм
      </Title>
      <Columns isCentered style={{ margin: '1%', overflow: 'scroll' }}>
        {data.data.length &&
          data.data.map((post, i) => (
            <Column key={i} isSize={{ default: 3, tablet: 2 }}>
              <LazyLoad offsetBottom={300} offsetTop={0}>
                <Card>
                  <CardHeader>
                    <CardHeaderTitle>
                      <Moment unix locale='ru' format='LL'>
                        {post.created_time}
                      </Moment>
                    </CardHeaderTitle>
                    <CardHeaderIcon
                      href={post.link}
                      target='_blank'
                      rel='noopener noreferrer'>
                      <Icon
                        className='fab fa-instagram fa-2x'
                        style={{ color: theme.success }}
                      />
                    </CardHeaderIcon>
                  </CardHeader>
                  <CardImage>
                    <figure className='image'>
                      <img
                        src={post.images.standard_resolution.url}
                        alt='instagram post image'
                      />
                    </figure>
                  </CardImage>
                  <CardContent>
                    <p style={{ wordBreak: 'break-word' }}>
                      {post.caption && post.caption.text.substring(0, 200)}
                    </p>
                  </CardContent>
                </Card>
              </LazyLoad>
            </Column>
          ))}
      </Columns>
      <style jsx>
        {`
          @media screen and (min-width: 600px) {
            img {
              min-width: 100%;
            }
          }
          img {
            opacity: 1;
            transition: opacity 0.25s ease-in;
          }
          :global(.loading-image) {
            opacity: 0.5;
          }
        `}
      </style>
    </Fragment>
  )
}
