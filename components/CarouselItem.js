export default ({ size, name, children }) => {
  return (
    <div>
      {children}
      <style jsx>
        {`
          div {
            background: center / cover no-repeat
              url(${process.env.IMAGEHANDLER_URL}/${size}/${name});
            height: 40vh;
            position: relative;
          }
          @media all and (max-width: 899px) and (orientation: landscape) {
            div {
              height: 80vh;
            }
          }
        `}
      </style>
    </div>
  )
}
