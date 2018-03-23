import React from 'react'

import style from './style.less'
class ClockDemo extends React.Component {
    constructor() {
      super()
      this.state = {
        date: {}
      }
    }
    componentWillMount() {
      var func = function() {
        this.setState({
          date: new Date()
        })
      }.bind(this)
      func()
      setInterval(func, 1000)
    }
    render() {
      var date = this.state.date
      var minutes = date.getMinutes()
      var seconds = date.getSeconds()
  
      var hour = (date.getHours()) % 12 * (360 / 12) + (360 / 12) * (minutes / 60)
      var minute = minutes * (360 / 60) + (360 / 60) * (seconds / 60)
      var second = seconds * (360 / 60)
      return (
        <div className="style">
          {/* <img className="backgroundImg" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1988922771,3229790596&fm=27&gp=0.jpg" /> */}
          
          <div className="container clr">
            <div className="clockMinuteLine" style={{transform: 'rotateZ('+ minute +'deg)'}}></div>
            <div className="clockHourLine" style={{transform:  'rotateZ('+ hour +'deg)'}}></div>
            <div className="clockSecondLine" style={{transform: 'rotateZ('+ second +'deg)'}}></div>
          </div>
         
        </div>
      )
    }
  }
  
  export default ClockDemo;