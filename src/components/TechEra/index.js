import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiContants = {
  inProgress: 'IN_PROGRESS',
  onSuccess: 'ON_SUCCESS',
  onFailure: 'ON_FAILURE',
  initial: 'INTIAL',
}
class TechEra extends Component {
  state = {isSuccess: apiContants.initial, jsonList: []}

  componentDidMount() {
    this.GetDetails()
  }

  GetDetails = async () => {
    this.setState({isSuccess: apiContants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const jsData = await response.json()
      const updatedData = jsData.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({jsonData: updatedData, isSuccess: apiContants.onSuccess})
    } else if (response.ok !== true) {
      this.setState({isSuccess: apiContants.onFailure})
    }
  }

  RenderCourses = () => {
    const {jsonData, isSuccess} = this.state
    switch (isSuccess) {
      case apiContants.inProgress:
        return (
          <div data-testid="loader">
            <Loader type="Oval" />
          </div>
        )
      case apiContants.onSuccess:
        return (
          <ul className="list">
            {jsonData.map(each => (
              <Link key={each.id} to={`/courses/${each.id}`} className="link">
                <li key={each.id} className="list-item">
                  <img src={each.logoUrl} className="logo" alt={each.name} />
                  <p className="course-name">{each.name}</p>
                </li>
              </Link>
            ))}
          </ul>
        )
      case apiContants.onFailure:
        return (
          <div className="failure-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
              alt="failure view"
              className="failure-image"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for.</p>
            <button
              className="retry-button"
              type="button"
              onClick={this.GetDetails}
            >
              Retry
            </button>
          </div>
        )

      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <Header />
        <h1 className="course-heading">Courses</h1>
        {this.RenderCourses()}
      </div>
    )
  }
}
export default TechEra
