import React from 'react'

import SearchBar from '../partials/SearchBar'
import Results from '../partials/Results'
import Keyboard from './Keyboard'

var Search = React.createClass({
  getInitialState() {
    return {keyboard: false, searchText: ''}
  },
  _handleSearchChange(terms) {
    this.props.onSearch(terms)
  },
  _handleModelClick(model) {
    this.props.onModelClick(model)
  },
  putKeyboard() {
    this.setState({keyboard: true})
  },
  _handleKeyboardClick(key) {
    let str = this.state.searchText
    switch (key) {
      case '@@enter':
        this.setState({keyboard: false});
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
    this.setState({searchText: str})
    this.props.onSearch(str)
  },
  removeKeyboard() {
    // this.setState({keyboard: false})
  },
  render() {
    return (
      <div>
        <SearchBar text={this.state.searchText} onSearch={this._handleSearchChange} onClick={this.putKeyboard} onUnclick={this.removeKeyboard} placeholder={'Cerca i modelli'}/>
        <Results results={this.props.results} onModelClick={this._handleModelClick}/>
        <Keyboard onKeyClick={this._handleKeyboardClick} active={this.state.keyboard}/>
      </div>
    )
  }
})

export default Search
