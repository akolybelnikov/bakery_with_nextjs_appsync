import { Notification, Delete } from 'bloomer'

export default props => (
  <Notification className='aws-error' isColor='primary'>
    <p>{props.notification}</p>
    <Delete onClick={props.dismiss} />
    <style jsx>{`
      :global(.aws-error) {
        position: fixed;
        max-height: 100px;
        width: 320px;
        top: 5.5rem;
        right: 50%;
        margin-right: -160px;
        z-index: 20;
      }
      @media all and (min-width: 768px) {
        :global(.aws-error) {
          top: 7.5rem;
          width: 640px;
          margin-right: -320px;
        }
      }
    `}</style>
  </Notification>
)
