import './index.css'
import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="failure-image"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found.</p>
    </div>
  </>
)

export default NotFound
