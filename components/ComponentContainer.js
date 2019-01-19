export default ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>
        {`
          div {
            padding: 0 0 4.25rem 0;
          }
          @media screen and (min-width: 769px) {
            div {
              padding: 3.25rem 0;
            }
          }
        `}
      </style>
    </div>
  )
}
