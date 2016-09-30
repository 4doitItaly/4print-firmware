import React from 'react'

import SearchBar from '../partials/SearchBar'
import Results from '../partials/Results'

var Search = React.createClass({
  _handleSearchChange(terms) {
    this.props.onSearch(terms)
  },
  _handleModelClick(model) {
    this.props.onModelClick(model)
  },
  render() {
    return (
      <div>
        <SearchBar onSearch={this._handleSearchChange}/>
        <Results results={this.props.results} onModelClick={this._handleModelClick}/>
      </div>
    )
  }
})

export default Search
