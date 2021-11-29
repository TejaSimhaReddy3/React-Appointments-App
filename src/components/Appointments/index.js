import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItems from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    isFilterActive: '',
    appointmentsList: [],
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateTime = event => {
    this.setState({dateInput: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state
    const formatDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formatDate,
      isStar: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  toggleIsStarred = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  filteredAppointmentLists = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive === true) {
      return appointmentsList.filter(
        eachFilteredAppointment => eachFilteredAppointment.isStar === true,
      )
    }
    return appointmentsList
  }

  isStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachList => {
        if (id === eachList.id) {
          return {...eachList, isStar: !eachList.isStar}
        }
        return eachList
      }),
    }))
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const isClicked = isFilterActive ? 'changeBtn' : 'normalBtn'
    const filteredAppointments = this.filteredAppointmentLists()
    return (
      <div className="bg-container">
        <div className="content-container">
          <div className="form-img-container">
            <form className="form" onSubmit={this.onSubmitForm}>
              <h1 className="mainHeading">Add Appointment</h1>
              <label htmlFor="title" className="title">
                TITLE
              </label>
              <input
                type="text"
                value={titleInput}
                onChange={this.onChangeTitle}
                placeholder="Title"
                id="title"
                className="inputText"
              />
              <label htmlFor="dateTime" className="title">
                DATE
              </label>
              <input
                type="date"
                id="dateTime"
                className="inputText"
                value={dateInput}
                onChange={this.onChangeDateTime}
              />
              <button className="submitButton" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appoint-img"
            />
          </div>
          <hr className="formComplete" />
          <div className="appointment-starContainer">
            <h1 className="belowHead">Appointments</h1>
            <button
              className={`starButton ${isClicked}`}
              type="button"
              onClick={this.toggleIsStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointmentsList">
            {filteredAppointments.map(eachList => (
              <AppointmentItems
                key={eachList.id}
                appointmentDetails={eachList}
                isStarred={this.isStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
