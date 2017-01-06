import React from 'react'
import SearchBar from '../partials/SearchBar'
import Keyboard from './Keyboard'

const NET_N = 5
const pages = {
  VIEW: 0,
  PASS: 1
}

var WifiConfigPage = React.createClass({
  getInitialState() {
    return {pagen: 0, page: pages.VIEW, network: null, password: ''}
  },
  componentWillMount() {
    this.props.onRefresh()
  },
  _handleRefresh() {
    this.setState({pagen: 0})
    this.props.onRefresh()
  },
  _handlePageUp() {
    if (this.state.pagen < Math.floor((this.props.networks.length - 1) / NET_N)) {
      this.setState({
        pagen: ++this.state.pagen
      })
    }
  },
  _handlePageDown() {
    if (this.state.pagen > 0) {
      this.setState({
        pagen: --this.state.pagen
      })
    }
  },
  _handleClickRow(network) {
    this.setState({page: pages.PASS, network: network})

  },
  putKeyboard() {
    this.setState({keyboard: true})
  },
  _handleKeyboardClick(key) {
    let str = this.state.password
    switch (key) {
      case '@@enter':
        this.setState({keyboard: false});
        this.props.onNetworkConnect(this.state.network, this.state.password);
        break
      case '@@spacebar':
        str += ' '
        break
      case '@@delete':
        str = str.slice(0, -1);
        break

      default:
        str += key
    }
    this.setState({keyboardMode: true, password: str})
  },
  render() {
    let toReturn = null
    if (this.state.page === pages.VIEW) {
      let netRows = this.props.networks.map((net, i) => {
        if (i >= NET_N * this.state.pagen && i < NET_N * this.state.pagen + 5) {
          let signal = null
          if (net.signal_level < 30) {
            signal = <div className="signal red">{`scarso`}</div>
          } else if (net.signal_level < 50) {
            signal = <div className="signal orange">{`medio`}</div>
          } else if (net.signal_level < 70) {
            signal = <div className="signal green">{`buono`}</div>
          } else {
            signal = <div className="signal blue">{`eccellente`}</div>
          }
          return (
            <div key={i} className="network-row" onClick={() => this._handleClickRow(net)}>
              <div>
                {net.ssid}
              </div>
              {signal}
            </div>
          )
        }
      })
      let toBotClass = 'to-bot button'
      if (this.state.pagen === 0 || !this.props.scanStatus) {
        toBotClass += ' disabled'
      }
      let toTopClass = 'to-top button'
      if (this.state.pagen === Math.floor((this.props.networks.length - 1) / NET_N) || !this.props.scanStatus) {
        toTopClass += ' disabled'
      }
      let refreshClass = 'refresh button'
      if (!this.props.scanStatus) {
        refreshClass += ' disabled'
      }
      toReturn = (
        <div className="page-container">
          <span className="title">{'Seleziona una rete wifi: '}</span>
          <div className="wifi-container">
            {netRows}
          </div>
          <button className={toTopClass} onClick={this._handlePageUp}>{'S'}</button>
          <button className={toBotClass} onClick={this._handlePageDown}>{'G'}</button>
          <button className={refreshClass} onClick={this._handleRefresh}>{'R'}</button>
        </div>
      )
    } else if (this.state.page === pages.PASS) {
      toReturn = (
        <div className="page-container">

          <span className="title password">{`Inserire la password di "${this.state.network.ssid}":`}</span>
          <SearchBar placeholder={'Password'} onSearch={() => {}} onClick={this.putKeyboard} onUnclick={this.removeKeyboard} text={this.state.password}/>
          <Keyboard onKeyClick={this._handleKeyboardClick} active={this.state.keyboard}/>
        </div>
      )
    }
    return (
      <div className="wifi-config-page">
        {toReturn}
      </div>
    )
  }
})
export default WifiConfigPage
