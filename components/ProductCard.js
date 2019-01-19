import {
  Card,
  CardContent,
  CardHeader,
  CardHeaderTitle,
  CardImage,
  Icon,
} from 'bloomer'
import LazyLoad from 'react-lazy-load'
import Image from './Image'

export default ({ product }) => (
  <LazyLoad height={475} offsetBottom={300} offsetTop={0}>
    <Card className='fadeIn'>
      <CardHeader
        style={{ display: 'flex', alignItems: 'center', minHeight: '6rem' }}>
        <CardHeaderTitle>{product.productName}</CardHeaderTitle>
        <Icon
          className='fas fa-chevron-right has-text-primary'
          style={{ marginRight: '5px' }}
        />
      </CardHeader>
      <CardImage>
        <figure className='image is-square'>
          <Image
            style={{ minWidth: '100%' }}
            size='600x600'
            name={product.image}
            alt='product image'
          />
        </figure>
      </CardImage>
      <CardContent
        style={{ display: 'flex', justifyContent: 'space-around' }}
        className='has-text-centered is-size-6'>
        <span>{product.weight && product.weight}</span>
        <span>{product.price && product.price} руб.</span>
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
      `}</style>
    </Card>
  </LazyLoad>
)
