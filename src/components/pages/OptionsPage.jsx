import React from 'react'

var OptionsPage = React.createClass({
  _handleClickLoad() {
    this.props.onChangedOption({context: 'material', command: 'load'})
  },
  _handleClickUnload() {
    this.props.onChangedOption({context: 'material', command: 'load'})
  },
  _handleClickHome() {
    this.props.onChangedOption({context: 'axes', command: 'home'})
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
        <h3 className="opts">
          {'Sposta Assi'}
        </h3>
        <div className="buttons">
          <button onClick={this._handleClickHome}>{'Home'}</button>
        </div>
      </div>
    )
  }
})

export default OptionsPage