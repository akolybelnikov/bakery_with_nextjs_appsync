import { Column, Columns, Title } from "bloomer"
import Link from "next/link"
import CategoryCard from "./CategoryCard"

export default ({ categories }) => {
  return (
    <React.Fragment>
      <Title
        style={{ margin: "1rem" }}
        hasTextColor="primary"
        className="is-size-5-mobile is-size-3 has-text-centered-mobile">
        Наш ассортимент
      </Title>
      <Columns>
        {categories.length &&
          categories.map((category, index) => (
            <Column key={index}>
              <Link
                href={{
                  pathname: "/category",
                  query: { name: category.name },
                }}>
                <a>
                  <CategoryCard category={category} />
                </a>
              </Link>
            </Column>
          ))}
      </Columns>
    </React.Fragment>
  )
}
