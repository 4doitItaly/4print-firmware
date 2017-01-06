import React from 'react'
// import {version} from '../../package.json'

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
  _handleClickUpdate(){
    this.props.onChangedOption({context: 'update', command: 'update'})
  },
  _handleClickUpdateGcodes(){
    this.props.onChangedOption({context: 'update', command: 'updateGcodes'})
  },
  _handleCllickWifi(){
    this.props.onChangedOption({context: 'network', command: 'show_page'})
  },
  render() {
    let buttonsPrinter = ''
    if(!this.props.printerStatus) buttonsPrinter = 'disabled'
    return (
      <div className="options-page">
        <h3 className="opts">
          {'Operazioni Filo'}
        </h3>
        <div className="buttons">
          <button className={buttonsPrinter} onClick={this._handleClickLoad} disabled={!this.props.printerStatus}>{'Inserisci'}</button>
          <button className={buttonsPrinter} onClick={this._handleClickUnload} disabled={!this.props.printerStatus}>{'Rimuovi'}</button>
        </div>
        <h3 className="opts">
          {'Sposta Assi (Home)'}
        </h3>
        <div className="buttons">
          <button className={buttonsPrinter} onClick={this._handleClickHome} disabled={!this.props.printerStatus}>{'Home'}</button>
        </div>
        <h3 className="opts">
          {'Configurazione rete wifi'}
        </h3>
        <div className="buttons">
          <button onClick={this._handleCllickWifi}>{'Configura'}</button>
        </div>
        <h3 className="opts">
          {'Aggiornamento'}
        </h3>
        <div className="buttons">
          <button onClick={this._handleClickUpdate}>{'Aggiorna Software'}</button>
          <button onClick={this._handleClickUpdateGcodes}>{'Aggiorna Libreria'}</button>
        </div>
        <div className="version">
          {`ver. ${process.env.npm_package_version}`}
        </div>
      </div>
    )
  }
})

export default OptionsPage
