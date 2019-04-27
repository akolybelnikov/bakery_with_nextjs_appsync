export default ({ children }) => {
  return (
    <main>
      {children}
      <style jsx>
        {`
          main {
            padding: 7.5rem 0.5rem 2rem;
            overflow-x: hidden;
          }
          @media screen and (max-width: 1088px) {
            main {
              padding: 7.5rem 0;
            }
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
