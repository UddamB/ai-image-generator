import React from 'react'
import './ImageGenerator.css' /* Importing css file */
import default_image from '../Assets/aiart.jpg' /* Importing image from assets folder */

export const ImageGenerator = () => {
  return (
    <div className='ai-image-generator'>
        <div className="header">AI image <span>generator</span></div> {/* Displaying text on homepage*/}
        <div className="img-loading">
          <div className="image"><img src={default_image} alt="" /></div> {/* Displaying image on homepage*/}
        </div>
        <div className="search-box">
          {/* Displaying text box */}
          <input type="text" className='search-input' placeholder='Describe what you want to see...'/>
          {/* Displaying button */}
          <div className="generate-btn">Generate</div>
        </div>
    </div>
  )
}
