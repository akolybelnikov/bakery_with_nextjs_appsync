import {
  Card,
  CardContent,
  CardImage,
  Media,
  MediaContent,
  MediaLeft,
  MediaRight,
} from 'bloomer'
import { BelowDefault, Default, theme } from '../styles/utils'
import Image from './Image'
import Moment from 'react-moment'

export default ({ news, DTsize, MBsize }) => {
  return (
    <React.Fragment>
      {news && (
        <Default>
          <Media>
            <MediaLeft>
              <figure className='image figure-media'>
                <Image
                  style={{ minWidth: '100%' }}
                  className='media-image'
                  name={news.image}
                  size={DTsize}
                  alt='news image'
                />
              </figure>
            </MediaLeft>
            <MediaContent>
              <p className='news-content'>{news.content}</p>
              <p
                style={{
                  marginTop: '0.5rem',
                  borderTop: `1px solid ${theme.primaryHalf}`,
                  color: `${theme.primaryHalf}`,
                  paddingTop: '0.5rem',
                }}>
                <Moment unix locale='ru' format='LL'>
                  {news.createdAt / 1000}
                </Moment>
              </p>
            </MediaContent>
            <MediaRight />
          </Media>
        </Default>
      )}
      {news && (
        <BelowDefault>
          <Card style={{background: `center center / cover no-repeat url(${process.env.IMAGEHANDLER_URL}/650x650/${news.image})`}}>
            {/* <CardImage>
              <figure className='image figure-card'>
                <Image
                  className='media-image'
                  name={news.image}
                  size='600x600'
                  alt='news image'
                />
              </figure>
            </CardImage> */}
            <CardContent className='media-content news-item'>
              <p>{news.content}</p>
              <p
                style={{
                  marginTop: '0.5rem',
                  borderTop: `1px solid ${theme.success}`,
                  paddingTop: '0.5rem',
                }}>
                <Moment unix locale='ru' format='LL'>
                  {news.createdAt / 1000}
                </Moment>
              </p>
            </CardContent>
          </Card>
        </BelowDefault>
      )}
      <style jsx>{`
        :global(figure.figure-media) {
          width: 200px;
          height: 200px;
          overflow: hidden;
        }
        :global(figure.figure-card) {
          width: 100%;
          height: 100vw;
          overflow: hidden;
        }
        :global(img.media-image) {
          left: 50%;
          top: 50%;
          position: absolute;
          transform: translate(-50%, -50%);
        }
        :global(.media-content.news-item) {
          text-align: justify;
          text-justify: inter-word;
          background: rgba(255,255,255,.4)
        }
        p.news-content {
          margin-bottom: 1rem;
        }
        @media all and (max-width: 599px) {
          :global(.media-content) {
            font-size: 15px !important;
            text-align: left;
          }
        })
      `}</style>
    </React.Fragment>
  )
}
