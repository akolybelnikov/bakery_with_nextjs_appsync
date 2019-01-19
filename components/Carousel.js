import { Default, Handset, SmallHandset, theme } from '../styles/utils'

export const Carousel = ({ autoplay, delay, children }) => {
  return (
    <div
      className='carousel carousel-animated carousel-animate-fade'
      data-autoplay={autoplay}
      data-delay={delay}>
      <div className='carousel-container'>{children}</div>
      <style jsx>
        {`
          .carousel-container {
            position: absolute;
          }
          .carousel {
            height: 40vh;
          }
          @media screen and (max-width: 359px) {
            .carousel {
              height: 45vh;
            }
          }
          @media screen and (min-width: 600px) and (max-width: 768px) {
            .carousel {
              height: 50vh;
            }
          }
          @media screen and (min-width: 769px) and (max-width: 1024px) {
            .carousel {
              height: 25vh;
            }
          }
          @media screen and (max-width: 1023px) and (orientation: landscape) {
            .carousel {
              height: 70vh;
            }
          }
        `}
      </style>
    </div>
  )
}

export const CarouselItem = ({ children }) => {
  return (
    <div className='carousel-item has-background'>
      {children}
      <style jsx>
        {`
          @media screen and (min-width: 825px) {
            div {
              max-height: 40%;
              overflow: hidden;
            }
          }
        `}
      </style>
    </div>
  )
}

export const CarouselTitle = ({ children }) => {
  return (
    <React.Fragment>
      <SmallHandset>
        <div className='title'>
          {children}
          <style jsx>
            {`
              div {
                font-size: 1rem !important;
                line-height: 1.2;
                color: #fff;
                background: ${theme.infoShadow} !important;
                font-weight: 400;
                padding: 0.5em !important;
              }
            `}
          </style>
        </div>
      </SmallHandset>
      <Handset>
        <div className='title'>
          {children}
          <style jsx>
            {`
              div {
                font-size: 1.25rem !important;
                line-height: 1.3;
                color: #fff;
                background: ${theme.infoShadow} !important;
                font-weight: 400;
                padding: 0.5em !important;
              }
            `}
          </style>
        </div>
      </Handset>
      <Default>
        <div className='title'>
          {children}
          <style jsx>
            {`
              div {
                font-size: 1.5rem !important;
                line-height: 1.5;
                color: #fff;
                background: ${theme.infoShadow} !important;
                font-weight: 400;
                padding: 0.5em !important;
              }
            `}
          </style>
        </div>
      </Default>
    </React.Fragment>
  )
}
