import React from 'react'
import ReactDOM from 'react-dom';

import {connect} from 'react-redux';

import Search from './Search'
import ViewModel from './ViewModel'
import InfoPage from './InfoPage'
import OptionsPage from './OptionsPage'
import TopBar from '../partials/TopBar'

import * as SearchActions from '../../actions/SearchActions'
import * as PrinterActions from '../../actions/PrinterActions'
import * as UpdaterActions from '../../actions/UpdaterActions'

let config = require('../../../config')

let pages = {
  SEARCH: 0,
  VIEW_MODEL: 1,
  INFO_PAGE: 2,
  OPTIONS: 3
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
  _handleClickLogo() {
    this.setState({page: pages.SEARCH})
  },
  _handleClickPrint(model) {
    this.props.onPrint(model.gcode)
  },
  _handleClickOptions() {
    this.setState({
      page: this.state.page == pages.OPTIONS
        ? pages.SEARCH
        : pages.OPTIONS
    })
  },
  _handleChangedOption(option) {
    switch (option.context) {
      case 'material':
        if (option.command === 'load') {
          this.props.onLoadMaterial()
        } else if (option.command === 'unload') {
          this.props.onUnloadMaterial()
        }
        break
      case 'axes':
        if (option.command === 'home') {
          this.props.onAutoHome()
        }
        break
      case 'update':
        if (option.command === 'update') {
          this.props.onUpdate()
        } else if (option.command === 'updateGcodes') {
          this.props.onUpdateGcodes()
        }
        break;
    }
  },
  render() {
    console.log('+++++++ MP props +++++++');
    console.log(this.props);
    console.log('++++++++++++++++++++++++');
    let page = (
      <div>
        <Search onSearch={this._handleSearchChange} onModelClick={this._handleModelClick} results={this.props.results}/>
      </div>
    )

    /*
  stampante in connessione
*/
    if (this.props.connectionStatus === 'disconnected' && this.props.currentOperation === 'connection' && this.props.currentOperation === 'pending') {
      page = <InfoPage message={'Connessione alla stampante in corso...'}/>
    } else
    /*
  errore di connessione della stampante
*/
    if (config.environment === 'production' && this.props.connectionStatus === 'disconnected' && this.props.currentOperation === 'connection' && this.props.currentOperationStatus === 'complete') {
      let buttons = [
        {
          message: 'Riprova',
          action: this.props.connect
        }
      ]
      page = <InfoPage message={'Impossibile connettersi alla stampante'} info={this.props.error} buttons={buttons}/>
    } else
    /*
    stampa in corso...
    */
    if (this.props.currentOperation === 'printing' && this.props.currentOperationStatus === 'pending') {
      let buttons = [
        {
          message: 'Annulla',
          action: this.props.onUnprint
        }
      ]
      page = <InfoPage message={'Stampa in corso...'} buttons={buttons}/>
    } else
    /*
  annullamento stampa
*/
    if (this.props.currentOperation === 'unprint' && this.props.currentOperationStatus === 'pending') {
      page = <InfoPage message={'Annullamento stampa.'}/>
    } else
    /*
    Caricamento filo
    */
    if (this.props.currentOperation === 'loading_material' && this.props.currentOperationStatus === 'pending') {
      page = <InfoPage message={'Caricamento filo.'} info={'Inserire il filo sul lato sinistro della stampante e poi premere fino a che il processo non sarà terminato.'}/>
    } else
    /*
    Rimozione filo
    */
    if (this.props.currentOperation === 'unloading_material' && this.props.currentOperationStatus === 'pending') {
      page = <InfoPage message={'Rimozione filo.'} info={'Tirare delicatamente il filo sul lato sinistro della stampante finc\'è non viene via completamente.'}/>
    } else
    /*
    AutoHome
    */
    if (this.props.currentOperation === 'autohome' && this.props.currentOperationStatus === 'pending') {
      page = <InfoPage message={'Riposizionamento degli assi.'} info={'Attendere...'}/>
    } else
    /*
    Update
    */
    if (this.props.currentOperation === 'update' && this.props.currentOperationStatus === 'pending') {
      page = <InfoPage message={'Preparazione all\'aggiornamento.'} info={'Attendere...'}/>
    } else
    /*
    Scaricamento aggiornamento
    */
    if (this.props.currentOperation === 'downloading_update' && this.props.currentOperationStatus === 'pending') {
      page = <InfoPage message={'Download dell\'aggiornamento.'} info={`Scaricato il ${this.props.extra.downloaded || 0}%`}/>
    } else
    /*
    Installazione aggiornamento
    */
    if (this.props.currentOperation === 'installing_update' && this.props.currentOperationStatus === 'pending') {
      page = <InfoPage message={'Installazione dell\'aggiornamento.'} info={'Attendere...'}/>
    } else
    /*
    Installazione aggiornamento files
    */
    if (this.props.currentOperation === 'update_files' && this.props.currentOperationStatus === 'pending') {
      if (this.props.extra.total === -1) {
        page = <InfoPage message={'Aggiornamento della libreria.'} info={`Calcolo aggiornamento in corso...`}/>
      } else {
        page = <InfoPage message={'Aggiornamento della libreria.'} info={`Scaricati ${this.props.extra.downloaded} di ${this.props.extra.total}`}/>
      }
    } else
    /*
    Pagina visualizzazione modello
    */
    if (this.state.page === pages.VIEW_MODEL) {
      page = <ViewModel model={this.state.currentModel} onReturn={this._handleReturn} onPrint={this._handleClickPrint}/>
    } else
    /*
    pagina opzioni
    */
    if (this.state.page === pages.OPTIONS) {
      page = <OptionsPage onChangedOption={this._handleChangedOption} printerStatus={this.props.connectionStatus !== 'disconnected'}/>
    }
    //
    //     /*
    // ---------------------------
    // */
    //     if (this.props.updateStatus === 'downloading_update' && this.props.updateOperationStatus === 'pending') {
    //       page = (
    //         <div>
    //           <InfoPage message={'Download dell\'aggiornamento in corso...'} info={this.props.updateError}/>
    //         </div>
    //       )
    //     } else if (this.props.updateStatus === 'installing_update' && this.props.updateOperationStatus === 'pending') {
    //       page = (
    //         <div>
    //           <InfoPage message={'Installazione dell\'aggiornamento in corso...'} info={this.props.updateError}/>
    //         </div>
    //       )
    //     } else if (this.props.updateStatus === 'update' && this.props.updateOperationStatus === 'completed') {
    //       page = (
    //         <div>
    //           <InfoPage message={'Aggiornamento della stampante completato. Spegnere e riaccendere la stampante'} info={this.props.updateError}/>
    //         </div>
    //       )
    //     } else if (this.state.page === pages.OPTIONS) {
    //       page = (
    //         <div>
    //           <OptionsPage onChangedOption={this._handleChangedOption} printerStatus={this.props.printerStatus !== 'disconnected'}/>
    //         </div>
    //       )
    //     } else if (this.props.printerStatus === 'disconnected' && !devStatus) {
    //       let buttons = [
    //         {
    //           message: 'Riprova',
    //           action: this.props.connect
    //         }
    //       ]
    //       page = (
    //         <div>
    //           <InfoPage message={'Impossibile connettersi alla stampante'} info={this.props.error} buttons={buttons}/>
    //         </div>
    //       )
    //     } else if (this.state.page === pages.VIEW_MODEL) {
    //       page = (
    //         <div>
    //           <ViewModel model={this.state.currentModel} onReturn={this._handleReturn} onPrint={this._handleClickPrint}/>
    //         </div>
    //       )
    //     }
    return (
      <div>
        <TopBar onClickOptions={this._handleClickOptions} onClickLogo={this._handleClickLogo}/>
        <div className="page">
          {page}
        </div>
      </div>
    )

  }
})

function mapStateToProps(state) {
  console.log('((((((((((((((((((((((state))))))))))))))))))))))')
  console.log(state);
  console.log('(((((((((((((((((((((((())))))))))))))))))))))))');
  return {
    connectionStatus: state.connectionStatus,
    currentOperationStatus: state.currentOperationStatus,
    currentOperation: state.currentOperation,
    currentPrint: state.currentPrint,
    error: state.error,
    results: state.results,
    extra: state.extra
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSearch: (terms) => SearchActions.searchFile(terms, dispatch),
    connect: () => PrinterActions.connect(dispatch),
    onUnprint: () => PrinterActions.unprint(dispatch),
    onPrint: (gcode) => PrinterActions.print(gcode, dispatch),
    onLoadMaterial: () => PrinterActions.loadMaterial(dispatch),
    onUnloadMaterial: () => PrinterActions.unloadMaterial(dispatch),
    onAutoHome: () => PrinterActions.autoHome(dispatch),
    onUpdate: () => UpdaterActions.update(dispatch),
    onUpdateGcodes: () => UpdaterActions.updateGcodes(dispatch)
  };
}

var MainPageApp = connect(mapStateToProps, mapDispatchToProps)(MainPage)
export default MainPageApp
