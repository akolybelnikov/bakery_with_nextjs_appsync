export default ({ children }) => {
  return (
    <main>
      {children}
      <style jsx>
        {`
          main {
            padding: 0 0 4.25rem 0;
          }
          @media screen and (min-width: 769px) {
            main {
              padding: 3.25rem 0 4.25rem 0;
            }
          }
        `}
      </style>
    </main>
  )
}
