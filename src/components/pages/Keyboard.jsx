import React from 'react'
import {minimalLayout} from '../KeyboardLayouts'

var Keyboard = React.createClass({
  _handleHover(key) {
    // console.log(event);
    // let str = event.target.value
    this.props.onKeyClick(key)
  },
  render() {
    if (!this.props.active) {
      console.log('keyboard');
      return null
    }
    let layout = minimalLayout
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
            this._handleHover(key)
          }}>{key.toUpperCase()}</div>
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
          <div className="spacebar" onClick={() => {
            this._handleHover('@@spacebar')
          }}>{'SPAZIO'}</div>
          <div className="delete" onClick={() => {
            this._handleHover('@@delete')
          }}>{'CANCELLA'}</div>
        </div>
      </div>
    )
  }
})

export default Keyboard
