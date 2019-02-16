import ProgressiveImage from 'react-progressive-image'

export default ({ name, size, alt, className }) => {
  return (
    <ProgressiveImage
      src={`${process.env.IMAGEHANDLER_URL}/${size}/${name}`}
      placeholder={`${`${process.env.IMAGEHANDLER_URL}/15x15/${name}`}`}>
      {(currentSrc, loading) => (
        <React.Fragment>
          <img
            src={currentSrc}
            alt={alt}
            className={loading ? `${className} loading-img` : className}
          />
          <noscript>
            <img
              src={`${process.env.IMAGEHANDLER_URL}/${size}/${name}`}
              alt={alt}
              className={className}
            />
          </noscript>
          <style jsx>
            {`
              @media screen and (min-width: 600px) {
                img {
                  min-width: 100%;
                }
              }
              img {
                opacity: 1;
                transition: opacity 0.25s ease-in;
              }
              :global(.loading-image) {
                opacity: 0.5;
              }
            `}
          </style>
        </React.Fragment>
      )}
    </ProgressiveImage>
  )
}
