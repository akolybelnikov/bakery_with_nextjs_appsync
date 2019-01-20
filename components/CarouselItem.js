export default ({ size, name, children }) => {
    return (
      <div>
          {children}
        <style jsx>
          {`
            div {
                background: center / cover no-repeat url(${process.env.IMAGEHANDLER_URL}/${size}/${name});
                height: 40vh;
                position: relative;
            }
          `}
        </style>
      </div>
    )
  }