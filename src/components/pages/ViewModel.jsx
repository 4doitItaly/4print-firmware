import React from 'react'

var ViewModel = React.createClass({
   _handleClickReturn() {
      this.props.onReturn()
   },
   _handleClickPrint(){
     this.props.onPrint(this.props.model)
   },
   render() {
     console.log(this.props.model);

      return (
         <div className="view-model">
            <div className="topbar row">
               <div className="return-button col-xs-1">
                  <button className="return" onClick={this._handleClickReturn}>{'<'}</button>
               </div>
               <div className="title col-xs-11">
                  <span>{this.props.model.name}</span>
               </div>
            </div>
            <div className="view row">
               <div className="img col-xs-8">
                  <img className="img-view" src={this.props.model.img}></img>
               </div>
               <div className="meta col-xs-4">
                  <div className="description">{'bla bla bla'}</div>
                  <div className="buttons">
                     <div className="print" onClick={this._handleClickPrint}>
                        <button >{'Stampa'}</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
})

export default ViewModel
