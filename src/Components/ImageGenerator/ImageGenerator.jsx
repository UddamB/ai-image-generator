import React, { useRef, useState } from 'react'
import './ImageGenerator.css' // Importing css file 
import default_image from '../Assets/aiart.jpg' // Importing image from assets folder 


export const ImageGenerator = () => {

    // Initializing user state to update image on homepage 
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);  

    // Executing function when the 'Generate' button is clicked 
    const imageGenerator = async () =>{
      if(inputRef.current.value===""){ 
        return 0; // If no text is inputted in text field, we return 0 
      }

      // Executing function to fetch data from api
      const response = await fetch(
        "https://api.openai.com/v1/images/generations", //OpenAI api link
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization:
            "Bearer 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", //api key
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
    }

  return (
    <div className='ai-image-generator'>
        {/* Displaying text on homepage*/}
        <div className="header">AI image <span>generator</span></div> 
        <div className="img-loading">
          {/* Displaying image on homepage*/}
          <div className="image"><img src={image_url==="/"?default_image:image_url} alt="" /></div> 
        </div>
        <div className="search-box">
          {/* Displaying text box */}
          <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see...'/>
          {/* When button is clicked, imageGenerator() is executed*/}
          <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div> 
        </div>
    </div>
  )
}
