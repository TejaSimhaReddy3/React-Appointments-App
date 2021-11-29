import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, isStarred} = props
  const {title, date, id, isStar} = appointmentDetails

  const starredImage = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    isStarred(id)
  }

  return (
    <li className="appointmentList">
      <div className="header-container">
        <p className="titles">{title}</p>
        <button
          type="button"
          testid="star"
          className="star-button"
          onClick={onClickStar}
        >
          <img src={starredImage} className="star" alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
