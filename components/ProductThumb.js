import { Card, CardContent, CardImage, Icon } from 'bloomer'
import { NonTouch, Touch } from '../styles/utils'
import Image from './Image'

export default ({ product }) => (
  <Card className='fadeIn'>
    <CardImage>
      <figure className='image is-square'>
        <Touch>
          <Image
            style={{ minWidth: '100%' }}
            name={product.image}
            size='400x400'
            alt='product image'
          />
        </Touch>
        <NonTouch>
          <Image
            style={{ minWidth: '100%' }}
            name={product.image}
            size='200x200'
            alt='product image'
          />
        </NonTouch>
      </figure>
    </CardImage>
    <CardContent
      className='is-size-7'
      style={{ display: 'flex', padding: '0.5rem' }}>
      <span>{product.productName}</span>
      <Icon
        className='fas fa-chevron-right has-text-primary'
        style={{ marginRight: '5px' }}
      />
    </CardContent>
    <style jsx>{`
      :global(img.media-image) {
        left: 50%;
        top: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
      }
      @-webkit-keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      :global(.card.fadeIn) {
        -webkit-animation-name: fadeIn;
        animation-name: fadeIn;
        animation-duration: 0.6s;
      }
      @-webkit-keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      :global(.fadeIn) {
        -webkit-animation-name: fadeIn;
        animation-name: fadeIn;
        animation-duration: 0.6s;
      }
    `}</style>
  </Card>
)
