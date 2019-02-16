export default ({ children }) => {
  return (
    <main>
      {children}
      <style jsx>
        {`
          main {
            padding: 0 0 4.25rem;
          }
          @media screen and (min-width: 769px) {
            main {
              padding: 3.25rem 1rem 4.25rem;
            }
          }
        `}
      </style>
    </main>
  )
}
