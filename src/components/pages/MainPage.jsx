import React from 'react'
import ReactDOM from 'react-dom';

import {connect} from 'react-redux';

import Search from './Search'
import ViewModel from './ViewModel'
import InfoPage from './InfoPage'

import * as SearchActions from '../../actions/SearchActions'
import * as PrinterActions from '../../actions/PrinterActions'

let pages = {
  SEARCH: 0,
  VIEW_MODEL: 1,
  ERROR_PAGE: 2,
  INFO_PAGE: 3
}

var MainPage = React.createClass({
  getInitialState() {
    return {page: pages.SEARCH}
  },
  componentWillMount() {
    this.props.connect()
    this.props.onSearch('')
  },
  _handleSearchChange(terms) {
    this.props.onSearch(terms)
  },
  _handleModelClick(model) {
    this.setState({page: pages.VIEW_MODEL, currentModel: model})
  },
  _handleReturn() {
    this.setState({page: pages.SEARCH})
  },
  _handleClickPrint(model) {
    this.props.onPrint(model.gcode)
  },
  render() {
    console.log('+++++++++++++++');
    console.log(this.props);

    let page = (
      <div>
        <Search onSearch={this._handleSearchChange} onModelClick={this._handleModelClick} results={this.props.results}/>
      </div>
    )
    if (this.props.printerStatus === 'disconnected' && this.props.operationStatus === 'pending') {
      page = (
        <div>
          <InfoPage message={'Connessione alla stampante in corso'}/>
        </div>
      )

    } else if (this.props.printerStatus === 'disconnected') {
      let buttons = [
        {
          message: 'Riprova',
          action: this.props.connect
        }
      ]
      page = (
        <div>
          <InfoPage message={'Impossibile connettersi alla stampante'} info={this.props.error} buttons={buttons}/>
        </div>
      )

    } else if (this.props.printerStatus === 'printing') {
      let buttons = [
        {
          message: 'Annulla',
          action: this.props.onUnprint
        }
      ]
      page = (
        <div>
          <InfoPage message={'Stampa in corso'} buttons={buttons}/>
        </div>
      )
    } else if (this.state.page === pages.VIEW_MODEL) {
      page = (
        <div>
          <ViewModel model={this.state.currentModel} onReturn={this._handleReturn} onPrint={this._handleClickPrint}/>
        </div>
      )
    }

    return page

  }
})

function mapStateToProps(state) {
  return {results: state.search.results, printerStatus: state.printer.status, operationStatus: state.printer.operationStatus, error: state.printer.error}
}

function mapDispatchToProps(dispatch) {
  return {
    onSearch: (terms) => SearchActions.searchFile(terms, dispatch),
    connect: () => PrinterActions.connect(dispatch),
    onUnprint: () => PrinterActions.unprint(dispatch),
    onPrint: (gcode) => PrinterActions.print(gcode, dispatch)
  };
}

var MainPageApp = connect(mapStateToProps, mapDispatchToProps)(MainPage)
export default MainPageApp
