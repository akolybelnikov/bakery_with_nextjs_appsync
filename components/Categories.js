import { Column, Columns, Title } from 'bloomer'
import Link from 'next/link'
import CategoryCard from './CategoryCard'
import LazyLoad from 'react-lazy-load'

export default ({ categories }) => {
  return (
    <React.Fragment>
      <Title
        style={{ margin: '1rem' }}
        hasTextColor='primary'
        className='is-size-6-mobile is-size-4 has-text-centered-mobile'>
        Наш ассортимент
      </Title>
      <Columns>
        {categories.length &&
          categories.map((category, index) => (
            <Column key={index} isSize={{ mobile: 12, tablet: 4, default: 4 }}>
              <LazyLoad offsetVertical={100}>
                <Link
                  href={{
                    pathname: '/category',
                    query: { name: category.name },
                  }}>
                  <a>
                    <CategoryCard category={category} />
                  </a>
                </Link>
              </LazyLoad>
            </Column>
          ))}
      </Columns>
    </React.Fragment>
  )
}
