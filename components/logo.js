import Logo from './SVG/logo'
import {
  Handset,
  SmallHandset,
  Default
} from '../styles/utils'

export default () => (
  <React.Fragment>
    <SmallHandset>
      <Logo width={85} />
    </SmallHandset>
    <Handset>
      <Logo width={90} />
    </Handset>
    <Default>
      <Logo width={140} />
    </Default>
  </React.Fragment>
)
