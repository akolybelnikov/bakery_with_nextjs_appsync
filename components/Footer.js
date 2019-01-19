import { Content, Footer, Icon, Level, LevelItem, Notification } from 'bloomer';
import Link from 'next/link';
import FacebookIcon from './SVG/Facebook';
import InstagramIcon from './SVG/Instagram';

export default props => {
  const { isAuthenticated } = props
  return (
    <Footer>
      <Level isMobile className='footer-level'>
        <LevelItem
          aria-label='Facebook link'
          href='https://www.facebook.com/CONFERTRU.RU'
          target='_blank'
          rel='noopener noreferrer'>
          <FacebookIcon width='36px' />
        </LevelItem>
        <LevelItem
          aria-label='Instagram link'
          href='https://www.instagram.com/confertru.ru'
          target='_blank'
          rel='noopener noreferrer'>
          <InstagramIcon width='36px' />
        </LevelItem>
        <LevelItem className='has-text-info'>
          <Link prefetch href='/contact'>
            <Icon className='fas fa-map-pin fa-2x footer-icon' />
          </Link>
        </LevelItem>
        {isAuthenticated && (
          <LevelItem className='has-text-primary'>
            <Link prefetch href='/user'>
              <Icon className='fas fa-user-circle fa-2x footer-icon' />
            </Link>
          </LevelItem>
        )}
        {!isAuthenticated && (
          <LevelItem className='has-text-primary'>
            <Link prefetch href='/authenticate'>
              <Icon className='fas fa-sign-in-alt fa-2x footer-icon' />
            </Link>
          </LevelItem>
        )}
      </Level>
      <Content
        hasTextAlign='centered'
        hasTextColor='info'
        className='footer-content'>
        <p>
          Услуги разработчика:
          <span>
            <a
              href='https://github.com/akolybelnikov'
              target='_blank'
              rel='noopener noreferrer'>
              Андрей Колыбельников.
            </a>
          </span>
          | <span>Программный код страницы защищён лицензией:</span>
          <span>
            <a
              href='https://opensource.org/licenses/mit-license.php'
              target='_blank'
              rel='noopener noreferrer'>
              MIT
            </a>
          </span>
        </p>
        <p className='copyright'>
          <span>
            <a
              href='https://www.copyright.ru/'
              target='_blank'
              rel='noopener noreferrer'>
              Copyright
            </a>
          </span>
          <span>
            <a
              href='https://www.copyright.ru/ru/documents/zashita_avtorskih_prav/znak_ohrani_avtorskih_i_smegnih_prav/'
              target='_blank'
              rel='noopener noreferrer'>
              ©
            </a>
          </span>
          <strong>Все Булочки Тут</strong>
          <span>
            <a
              href='https://www.copyright.ru/documents/zashita_prav_internet/copyright_in_site/'
              target='_blank'
              rel='noopener noreferrer'>
              2019
            </a>
          </span>
          |
          <span>
            <a
              href='https://www.copyright.ru/ru/documents/registraciy_avtorskih_prav/'
              target='_blank'
              rel='noopener noreferrer'>
              Все права защищены
            </a>
          </span>
          <span>
            <a
              href='http://copyright.ru'
              target='_blank'
              rel='noopener noreferrer'>
              <img
                src='http://copyright.ru/images/TMCIMG/copyright_2.gif'
                alt='www.copyright.ru'
                title='Copyright защита прав'
              />
            </a>
          </span>
        </p>
        <Level style={{ overflow: 'hidden' }}>
          <LevelItem>
            <Notification className='has-text-left footer-note'>
              <strong>Наш адрес:</strong>
              <span>109377, г.Москва</span>
              <span>Рязанский проспект, 58/1</span>
            </Notification>
          </LevelItem>
          <LevelItem>
            <Notification className='has-text-left footer-note'>
              <strong>Наши номера телефона:</strong>
              <span>+7 (926) 982-35-72</span>
              <span>+7 (926) 629-87-26</span>
            </Notification>
          </LevelItem>
          <LevelItem>
            <Notification className='has-text-left footer-note'>
              <strong>Наши часы работы:</strong>
              <span>с понедельника по субботу: с 8.00 до 20.00</span>
              <span>в воскресенье: с 9.00 до 18.00</span>
            </Notification>
          </LevelItem>
        </Level>
      </Content>
      <style jsx>
        {`
          p > span {
            margin: 0 5px;
          }
          :global(.footer-content) {
            margin-top: 3.5rem !important;
          }
          :global(.footer-note) {
            display: flex;
            flex-direction: column;
          }
          .copyright {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          :global(svg.footer-icon) {
            cursor: pointer;
          }
        `}
      </style>
    </Footer>
  )
}
