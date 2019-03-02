import { Card } from 'bloomer/lib/components/Card/Card'
import { CardContent } from 'bloomer/lib/components/Card/CardContent'
import { CardImage } from 'bloomer/lib/components/Card/CardImage'
import { Media } from 'bloomer/lib/components/Media/Media'
import { MediaContent } from 'bloomer/lib/components/Media/MediaContent'
import { MediaLeft } from 'bloomer/lib/components/Media/MediaLeft'
import { BelowDefault, Default } from '../styles/utils'
import Image from './Image'

export default ({ item }) => {
  return (
    <React.Fragment>
      <Default>
        <Media>
          <MediaLeft>
            <Image
              isSquare
              name={item.image}
              size='150x150'
              alt='Offer image'
              class='offer-media-image'
            />
          </MediaLeft>
          <MediaContent>{item.content}</MediaContent>
        </Media>
      </Default>
      <BelowDefault>
        <Card>
          <CardImage>
            <Image
              isSquare
              name={item.image}
              size='200x200'
              alt='Offer image'
              class='offer-media-image'
            />
          </CardImage>
          <CardContent>{item.content}</CardContent>
        </Card>
      </BelowDefault>
      <style jsx>
        {`
          :global(.media) {
            align-items: center;
            width: 100%;
          }
          :global(.media-content) {
            text-align: center;
          }
          :global(.card) {
            background-color: transparent;
            box-shadow: none;
          }
          :global(.card-image) {
            display: flex;
          }
          :global(.card-image > img) {
            margin: 0 auto;
          }
          :global(.card-content) {
            padding: 1rem 0;
          }
        `}
      </style>
       
    </React.Fragment>
  )
}
