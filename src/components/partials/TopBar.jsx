import React from 'react'

var TopBar = React.createClass({
  getInitialState() {
    return {time: 0}
  },
  componentDidMount() {},
  _handleClickOptions(options) {
    this.props.onClickOptions(options)
  },
  _handleClickLogo() {
    this.props.onClickLogo()
  },
  render() {
    let connection = this.props.network.connected === true || this.props.network.connected === 'connected'
      ? 'connesso'
      : 'disconnesso'

    return (
      <div className="topbar">
        <div className="logo">
          <img src="res/logo.png" onClick={this._handleClickLogo}></img>
        </div>
        <div className="center">
          {'4PRINT'}
        </div>
        <div className="right-components">
          <div className="network">
            {connection}
          </div>
          <div className="options">
            <span onClick={this._handleClickOptions}>{'Opzioni'}</span>
          </div>
        </div>
      </div>
    )
  }
})

export default TopBar
