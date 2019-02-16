export default ({ children }) => {
  return (
    <main>
      {children}
      <style jsx>
        {`
          main {
            padding: 7.5rem 0.5rem;
          }
          @media screen and (max-width: 599px) {
            main {
              padding: 5.5rem 0;
            }
          }
        `}
      </style>
    </main>
  )
}
