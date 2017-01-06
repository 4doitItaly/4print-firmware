import React from 'react'
import {lettersLayout, numandsymLayout, numandsymaltLayout} from '../KeyboardLayouts'

var Keyboard = React.createClass({
  getInitialState() {
    return {uppercase: false, page: 0}
  },
  _handleHover(key) {
    this.props.onKeyClick(key)
  },
  render() {
    if (!this.props.active) {
      return null
    }
    let layouts = [lettersLayout, numandsymLayout, numandsymaltLayout]
    let layout = layouts[this.state.page]

    let kb = layout.map((row, index) => {
      let keys = row.map((key) => {
        if (key.indexOf('@@') != -1) {
          return (
            <div key={key} className="button big" onClick={() => {
              this._handleHover(key)
            }}>{key.slice(2).toUpperCase()}</div>
          )
        }
        return (
          <div key={key} className="button" onClick={() => {
            this._handleHover(this.state.uppercase
              ? key.toUpperCase()
              : key.toLowerCase())
          }}>{this.state.uppercase
              ? key.toUpperCase()
              : key}</div>
        )
      })
      return (
        <div key={index} className="row">
          <div className="big"></div>
          {keys}
          <div className="big"></div>
        </div>
      )
    })

    return (
      <div className="keyboard">
        {kb}
        <div className="row">
          <div className="shift" onClick={() => {
            this.setState({
              uppercase: !this.state.uppercase
            })
          }}>
            {'SHIFT'}
          </div>
          <div className="symbols" onClick={() => {
            this.setState({
              page: (this.state.page + 1) % 3
            })
          }}>
            {'!#&'}
          </div>
          <div className="spacebar" onClick={() => {
            this._handleHover('@@spacebar')
          }}>{'SPAZIO'}</div>
          <div className="delete" onClick={() => {
            this._handleHover('@@enter')
          }}>{'INVIO'}</div>
        </div>
      </div>
    )
  }
})

export default Keyboard
