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

class CourseItemDetails extends Component {
  state = {isSuccess: apiContants.initial, jsonList: []}

  componentDidMount() {
    this.GetDetails()
  }

  GetDetails = async () => {
    this.setState({isSuccess: apiContants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const jsData = await response.json()
      const updatedData = {
        id: jsData.course_details.id,
        description: jsData.course_details.description,
        imageUrl: jsData.course_details.image_url,
        name: jsData.course_details.name,
      }
      this.setState({jsonData: updatedData, isSuccess: apiContants.onSuccess})
    } else if (response.ok !== true) {
      this.setState({isSuccess: apiContants.onFailure})
    }
  }

  RenderSuccessView = () => {
    const {jsonData} = this.state
    const {imageUrl, name, description} = jsonData

    return (
      <div className="course-details">
        <img src={imageUrl} alt={name} className="course-details-image" />
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
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
        return this.RenderSuccessView()
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
              onClick={this.GetDetails()}
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
export default CourseItemDetails
