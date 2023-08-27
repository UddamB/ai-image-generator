import React, { useRef, useState } from 'react'
import './ImageGenerator.css' // Importing css file 
import default_image from '../Assets/aiart.jpg' // Importing image from assets folder 
//import {REACT_APP_API_KEY} from './creds.jsx'
export const ImageGenerator = () => {

    // Initializing user state to update image on homepage 
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);

    // Initializing user state to update loading bar and loading text
    const [loading, setLoading] = useState(false);  

    // Executing function when the 'Generate' button is clicked 
    const imageGenerator = async () =>{
      if(inputRef.current.value===""){ 
        return 0; // If no text is inputted in text field, we return 0 
      }

      setLoading(true); //Display loading bar
      // Executing function to fetch data from api
      const response = await fetch(
        "https://api.openai.com/v1/images/generations", //OpenAI api link
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization:
            REACT_APP_API_KEY, //api key
            "User-Agent":"Chrome",
          },
          body:JSON.stringify({
            prompt:`${inputRef.current.value}`, //Provides text written in input field
            n:1, //1 image needed
            size:"512x512",
          }),
        }
      );
      let data = await response.json(); //Initializing data as response data using json() 
      let data_array = data.data;
      setImage_url(data_array[0].url) //setting image url to image url from api
      setLoading(false); //Hide loading bar
    }

  return (
    <div className='ai-image-generator'>
      {/* Displaying text on homepage */}
      <div className="header">AI Image <span>Generator</span></div> 
      <div class="subheader">
      <h1>Turn imagination into art.</h1>
      </div>
      <div class="subtext">
      {/* Displaying subtext on homepage */}
      <p>Created using the OpenAI API, our AI image generator brings imagination <br></br> to life, producing stunning art, illustrations, and images in seconds.
      <br></br>Unleash creativity and express yourself in new ways with the power of AI.</p>
      </div>
      <div class="name">
      <p>Made by <span>Uddam</span> Bhathal</p>
      </div>
      <a href="https://www.linkedin.com/in/uddam-bhathal/" class="name"></a>
      <div className="img-loading">
        {/* Displaying image on homepage */}
        <div className="image"><img src={image_url==="/"?default_image:image_url} alt="" /></div> 
        <div className="loading">
            {/* Displaying loading bar on homepage */}
            <div className={loading?"loading-bar-full":"loading-bar"}></div>
            <div className={loading?"loading-text":"display-none"}>Loading....</div>
        </div>
      </div>
      {/* Displaying second subtext on homepage */}
      <div className="secondsubtext">
        <p>Simply enter a few words, and watch AI transform text into incredible art.</p>
      </div>
      <div className="search-box">
        {/* Displaying text box */}
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see...'/>
        {/* When button is clicked, imageGenerator() is executed */}
        <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div> 
      </div>
  </div>
  )
}
