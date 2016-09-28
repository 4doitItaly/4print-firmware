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
   render() {
      return (
         <div className="searchbar-container">
            <input className="text-search" type="text" placeholder="Cerca i modelli" onKeyUp={this._handleSearch}/>
         </div>
      )
   }
})

export default SearchBar
