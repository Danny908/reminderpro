import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, clearReminders, updateRemindersStatus} from '../actions';
import moment from 'moment';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);
  }
  deleteReminder(id) {
    this.props.deleteReminder(id);
  }
  completeReminder(id) {
    this.props.updateRemindersStatus('DONE', id);
  }
  clearReminders() {
    this.props.clearReminders();
  }

  checkClassStatus(index) {
    let alert;
    if (this.props.reminders[index].status === 'TODO') {
      alert = 'alert alert-primary';
    }
    if (this.props.reminders[index].status === 'EXPIRED') {
      alert = 'alert alert-danger';
    }
    if (this.props.reminders[index].status === 'DONE') {
      alert = 'alert alert-success';
    }
    return `${alert} list-group-item`
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
        <ul className="list-group col-4">
          {
            reminders.map((reminder, index) => {
              return(
                <li key={reminder.id} className={this.checkClassStatus(index)}>
                  <div className="list-item">
                    {reminder.text}
                    <br/>
                    <em>{moment(new Date(reminder.dueDate)).format('MMMM Do YYYY, h:mm:ss a')}</em>
                  </div>
                  <div className="list-item">
                    <span className="complete-button" onClick={_ =>this.completeReminder(reminder.id)}>
                      &#x02713;
                    </span>
                    <span className="delete-button" onClick={_ =>this.deleteReminder(reminder.id)}>
                      &#x2715;
                    </span>
                  </div>
                </li>
              )
            })
          }
        </ul>
    )
  }

  componentDidMount() {
    setInterval(_ => {
      this.props.updateRemindersStatus();
    }, 1000);
  }
  render() {
    return(
      <div className="App">
        <h1 className="title">
          Reminder Pro
        </h1>
        <div className="data">
          <div>
            <input 
              type="text"
              className="form-control"
              placeholder="I have to..."
              onChange={e => this.setState({text: e.target.value})}/>
            <input 
              type="datetime-local"
              className='form-control'
              onChange={e => this.setState({dueDate: e.target.value})}/>
          </div>
          <button 
            type="button" 
            className="btn btn-success"
            onClick={_ => this.addReminder()}>
            Add Reminder
          </button>
          <div className="list-wrapper">
            {this.renderReminders()}
          </div>
          <button 
            type="button" 
            className="btn btn-danger"
            onClick={_ => this.clearReminders()}>
            Clear Reminders
          </button>
        </div>
      </div>
    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({addReminder}, dispatch);
// }

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders, updateRemindersStatus})(App);