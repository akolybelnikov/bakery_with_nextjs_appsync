import { Icon, Level, LevelItem } from 'bloomer'
import Link from 'next/link'
import { theme } from '../styles/utils'
import FacebookIcon from './SVG/Facebook'
import InstagramIcon from './SVG/Instagram'

const MobileFooter = ({ isAuthenticated }) => {
  return (
    <div className='mobile-footer'>
      <Level className='mobile-footer-nav' isMobile='true'>
        <LevelItem
          aria-label='Facebook link'
          href='https://www.facebook.com/CONFERTRU.RU'
          target='_blank'
          rel='noopener noreferrer'>
          <FacebookIcon width='24px' />
        </LevelItem>
        <LevelItem
          aria-label='Instagram link'
          href='https://www.instagram.com/confertru.ru'
          target='_blank'
          rel='noopener noreferrer'>
          <InstagramIcon width='24px' />
        </LevelItem>
        <LevelItem>
          <Link prefetch href='/contact'>
            <a aria-label='Contact page link' className='has-text-success'><Icon className='fas fa-map-signs fa-lg' /></a>
          </Link>
        </LevelItem>
        {isAuthenticated && (
          <LevelItem>
            <Link prefetch href='/user'>
              <a aria-label='User profile page link' className='has-text-success'><Icon className='fas fa-user-circle fa-lg' /></a>
            </Link>
          </LevelItem>
        )}
        {!isAuthenticated && (
          <LevelItem>
            <Link prefetch href='/authenticate'>
              <a aria-label='User authentication page link' className='has-text-success'><Icon className='fas fa-sign-in-alt fa-lg' /></a>
            </Link>
          </LevelItem>
        )}
      </Level>
      <style jsx>
        {`
          :global(.mobile-footer) {
            transition: all 0.5s ease-in-out;
            position: fixed;
            right: 0;
            margin: 0 auto;
            left: 0;
            background-color: ${theme.primaryHalf};
            bottom: 0;
          }
          :global(.mobile-footer-nav) {
            padding: 0.8rem 0 !important;
            align-items: flex-start !important;
          }
        `}
      </style>
    </div>
  )
}

export default MobileFooter
