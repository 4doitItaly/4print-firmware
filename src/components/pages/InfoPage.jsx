import React from 'react'

var InfoPage = React.createClass({
  render() {
    let buttons = null
    if (this.props.buttons) {
      buttons = this.props.buttons.map((btn, index) => {
        return <button onClick={btn.action} key={index}>{btn.message}</button>
      })
    }
    console.log(buttons);
    return (
      <div className="info-page">
        <span>
          {this.props.message}
        </span>
        <span>
          {this.props.info}
        </span>
        <div>
          {buttons}
        </div>
      </div>
    )
  }
})

export default InfoPage
