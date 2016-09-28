import React from 'react'
import ModelCard from './ModelCard'

var Results = React.createClass({
   getInitialState() {
      return {}
   },
   _handleCardClick(model) {
      this.props.onModelClick(model)
   },
   render() {

      let models = this.props.results.map((result, i) => {
         return (<ModelCard key={i} model={result} onCardClick={this._handleCardClick}/>)
      })

      return (
         <div className="col-xs-12 container">
            <div className="col-xs-12 row">
               {models}
            </div>
         </div>
      )
   }
})

export default Results
