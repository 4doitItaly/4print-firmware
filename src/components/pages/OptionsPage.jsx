import React from 'react'

var OptionsPage = React.createClass({
  _handleClickLoad() {
    this.props.onChangedOption({context: 'material', command: 'load'})
  },
  _handleClickUnload() {
    this.props.onChangedOption({context: 'material', command: 'load'})
  },
  render() {
    return (
      <div className="options-page">
        <h3 className="opts">
          {'Operazioni Filo'}
        </h3>
        <div className="buttons">
          <button onClick={this._handleClickLoad}>{'Inserisci'}</button>
          <button onClick={this._handleClickUnload}>{'Rimuovi'}</button>
        </div>

      </div>
    )
  }
})

export default OptionsPage
