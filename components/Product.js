import { BelowDefault, Default } from '../styles/utils'
import ProductCard from './ProductCard'
import ProductMedia from './ProductMedia'

export default ({ product }) => {
  return (
    <React.Fragment>
      <BelowDefault>
        <ProductMedia product={product} />
      </BelowDefault>
      <Default>
        <ProductCard product={product} />
      </Default>
    </React.Fragment>
  )
}
