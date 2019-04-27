import { Icon, Level, LevelItem } from 'bloomer'
import { Touch } from '../styles/utils'

export default () => {
  return (
    <Level className='contact-level' style={{ marginBlockStart: '1rem' }}>
      <LevelItem>
        <p>
          <strong>Позвонить:</strong>
        </p>
        <br />
        <a
          style={{ marginBottom: '2rem', borderRadius: '4px' }}
          className='button is-success'
          href='tel:+79269823572'
          target='_self'
          aria-label='telephone number'>
          <span>+7 (926) 982-35-72</span>
          <Icon className='fas fa-phone' />
        </a>
        <a
          style={{ marginBottom: '2rem', borderRadius: '4px' }}
          className='button is-success'
          href='tel:+79266298726'
          target='_self'
          aria-label='telephone number'>
          <span>+7 (926) 629-87-26</span>
          <Icon className='fas fa-phone' />
        </a>
      </LevelItem>
      <LevelItem>
        <p>
          <strong>Отправить эл. сообщение:</strong>
        </p>
        <br />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a
            style={{ marginBlockEnd: '1rem', borderRadius: '4px' }}
            className='button is-success'
            href='mailto:confert76@gmail.com?Subject=Контакт со службой поддержки'
            target='_self'
            aria-label='email address'>
            <span>confert76@gmail.com</span>
            <Icon className='fas fa-envelope' />
          </a>
        </div>
      </LevelItem>
      <Touch>
        <LevelItem>
          <p>
            <strong>Наш адрес:</strong>
          </p>
          <br />
          <p>109377, г.Москва</p>
          <p>Рязанский проспект, 58/1</p>
        </LevelItem>
        <LevelItem>
          <p>
            <strong>Наши часы работы:</strong>
          </p>
          <br />
          <p>с понедельника по субботу:</p>
          <p> с 8.00 до 20.00</p>
          <p>в воскресенье: с 9.00 до 18.00</p>
        </LevelItem>
      </Touch>

      <style jsx>
        {`
          :global(.level) {
          }
          :global(.level-item) {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: 1rem 0;
          }
          @media screen and (max-width: 1088px) {
            :global(.contact-level) {
              flex-direction: column;
              align-items: center;
            }
          }
        `}
      </style>
    </Level>
  )
}
