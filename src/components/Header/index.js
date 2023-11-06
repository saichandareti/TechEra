import './index.css'
import {withRouter, Link} from 'react-router-dom'

const Header = () => (
  <div className="header-con">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="logo-image"
      />
    </Link>
  </div>
)
export default withRouter(Header)
