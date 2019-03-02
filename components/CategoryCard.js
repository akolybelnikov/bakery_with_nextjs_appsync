import { Card, CardHeader, CardHeaderTitle, CardImage, Icon } from 'bloomer'
import Image from './Image'

export default props => {
  const { category } = props

  return (
    <Card className='category-card zoomIn'>
      <CardHeader style={{ alignItems: 'center', padding: '0 0.5rem', minHeight: '4.5rem' }}>
        <CardHeaderTitle>{category.title}</CardHeaderTitle>
        <Icon className='fas fa-chevron-right' />
      </CardHeader>
      <CardImage>
        <figure className='image is-square'>
          <Image
            size='600x600'
            name={category.image}
            alt='product category image'
          />
        </figure>
      </CardImage>
      <style jsx>{`
        :global(div.card.category-card) {
          cursor: pointer;
        }
        @-webkit-keyframes zoomIn {
          from {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes zoomIn {
          from {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
          }

          50% {
            opacity: 1;
          }
        }
        :global(.card.zoomIn) {
          -webkit-animation-name: zoomIn;
          animation-name: zoomIn;
          animation-duration: 0.6s;
        }
      `}</style>
    </Card>
  )
}
