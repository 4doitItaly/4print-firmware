import React from 'react'

var SearchBar = React.createClass({
  getInitialState() {
    return {}
  },
  _handleSearch(event) {
    let str = event.target.value
    if (this.props.onSearch) {
      this.props.onSearch(str)
    }
  },
  _handleEnter(){
    this.props.onClick()
  },
  _handleLeave(){
    this.props.onUnclick()
  },
  render() {
    return (
      <div className="searchbar-container">
        <input className="text-search" type="text" placeholder={this.props.placeholder}
        onClick={this._handleEnter} onChange={this._handleSearch} value={this.props.text}/>
      </div>
    )
  }
})

export default SearchBar
