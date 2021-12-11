import React from 'react'
import '../App.css'

function LoadingSpinner(){
    return(
        <div className='loading'>
        <div className="spin-container">
          <div className="lds-circle">
            <div></div>
          </div>
        </div>
      </div>
    )
}

export default LoadingSpinner