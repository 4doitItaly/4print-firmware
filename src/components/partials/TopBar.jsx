import React from 'react'

var TopBar = React.createClass({
  getInitialState() {
    return {time: 0}
  },
  componentDidMount() {
    this.time()
  },
  // time() {
  //   setTimeout(() => {
  //     var timeInMss = Date.now()
  //     this.setState({time: timeInMss})
  //     this.time()
  //   }, 1000)
  // },
  // beautifyTime(millis) {
  //   let seconds = Math.floor((millis / 1000) % 60)
  //   let minute = Math.floor((millis / (1000 * 60)) % 60)
  //   let hour = Math.floor((millis / (1000 * 60 * 60)) % 24) + 2
  //
  //   return `${hour}:${minute}`
  // },
  _handleClickOptions(options) {
    this.props.onClickOptions(options)
  },
  _handleClickLogo() {
    this.props.onClickLogo()
  },
  render() {
    return (
      <div className="topbar">
        <div className="logo">
          <img src="res/logo.png" onClick={this._handleClickLogo}></img>
        </div>
        <div>
          {/* {this.beautifyTime(this.state.time)} */}
          {'4PRINT'}
        </div>
        <div className="options">
          <span onClick={this._handleClickOptions}>{'Opzioni'}</span>
        </div>
      </div>
    )
  }
})

export default TopBar
