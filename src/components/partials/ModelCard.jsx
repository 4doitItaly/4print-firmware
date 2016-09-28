import React from 'react'

var ModelCard = React.createClass({
   _handleClick() {
      this.props.onCardClick(this.props.model)
   },
   render() {
      return (
         <div className="col-xs-4 model">
            <div className="model-container" onClick={this._handleClick}>
               <div className="photo">
                  <img className="image" src={this.props.model.img}/>
               </div>
               <div className="name-container">
                  <span className="name">{this.props.model.name}</span>
               </div>
            </div>
         </div>
      )
   }
})

export default ModelCard
