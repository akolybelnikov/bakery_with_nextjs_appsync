import { Button, Icon, Media, MediaContent, MediaLeft, MediaRight } from 'bloomer';
import Image from './Image';

export default ({ product }) => (
  <Media className='fadeIn' style={{ alignItems: 'center' }}>
    <MediaLeft>
      <figure className='image product-media'>
        <Image
          style={{ minWidth: '100%' }}
          className='media-image'
          name={product.image}
          size='200x200'
          alt='product image'
        />
      </figure>
    </MediaLeft>
    <MediaContent>
      <p className='has-text-left is-size-7'>{product.productName}</p>
      <p
        className='is-size-7 has-text-primary'
        style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{product.weight && product.weight}</span>|
        <span>{product.price && product.price} руб.</span>
      </p>
    </MediaContent>
    <MediaRight
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
      }}>
      <Button isColor='primary' style={{ margin: '0 10px' }}>
        <Icon className='fas fa-arrow-right' />
      </Button>
    </MediaRight>
    <style jsx>{`
      :global(figure.product-media) {
        width: 100px;
        height: 100px;
        overflow: hidden;
      }
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
      :global(.media.fadeIn) {
        -webkit-animation-name: fadeIn;
        animation-name: fadeIn;
        animation-duration: 0.3s;
      }
    `}</style>
  </Media>
)
