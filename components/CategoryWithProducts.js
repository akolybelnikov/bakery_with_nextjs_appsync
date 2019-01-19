import { Column, Columns } from "bloomer"
import Link from "next/link"
import CategoryCard from "./CategoryCard"
import ComponentContainer from "./ComponentContainer"
import ProductThumb from "./ProductThumb"

export default ({ category, products }) => {
  return (
    <ComponentContainer>
      <Columns>
        <Column isSize={5}>
          <Link
            href={{ pathname: "/category", query: { name: category.name } }}>
            <a>
              <CategoryCard category={category} />
            </a>
          </Link>
        </Column>
        <Column>
          <Columns isMultiline isMobile style={{ padding: "0 0.5rem" }}>
            {products.map((product, index) => (
              <Column isSize={{ mobile: 6, tablet: 3 }} key={index}>
                <Link
                  href={{
                    pathname: "/product",
                    query: {
                      category: product.category,
                      id: product.productId,
                    },
                  }}>
                  <a>
                    <ProductThumb product={product} />
                  </a>
                </Link>
              </Column>
            ))}
          </Columns>
        </Column>
      </Columns>
    </ComponentContainer>
  )
}
