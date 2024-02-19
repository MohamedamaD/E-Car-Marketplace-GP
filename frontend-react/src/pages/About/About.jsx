import React from "react";
import "./About.scss";
import {about_head,about_middel,about_tail,images} from "../../constants";
import { Link } from 'react-router-dom';
export const About = () => {
  return (
    <div id="about-page">
      <div className="about-container container">
              
       <div className="header_container">
          {about_head.map((item, index) => (
          <Link  key={index+item.headerContent}>
            {index !== 1 && ( 
            <div className="head">
               <img src={item.imageUrl} alt="About Image" />
              <div className="pragraph" >
              <h1>{item.headerContent}</h1>
              <p >{item.paragraphContent}</p>
              </div>
           
            </div>
            )}
            {index === 1 && ( 
            <div className="head" >
            <div className="pragraph" >
            <h1>{item.headerContent}</h1>
            <p >{item.paragraphContent}</p>
            </div>
            <img src={item.imageUrl} alt="About Image" />
            </div>
            )}
          </Link >
          
         ))} 
       </div>
       <div className="middel_cotainer">
            <h1>ما الشىء الذى يجعلنا مميزين ؟</h1>
            <div className="middel">
            {about_middel.map((item, index) => (
            <Link key={index + item.headerContent}>
              <div className="image_container">
                {index !== 0 && ( 
                  <div className="arrow">
                    <div className="ima">
                    <img src={item.imageUrl} alt="About Image" />
                    <p style={{ color: 'white' }}>{item.content}</p>
                    </div>
                   <div className="arrow_photo"><img src={images.arrow_about} alt="arrow Image" /></div>
                  </div>
                )}
                {index === 0 && ( 
                  <div className="arrow">
                    <div className="ima">
                  <img src={item.imageUrl} alt="About Image" />
                  <p style={{ color: 'white' }}>{item.content}</p>
                  </div>
                  </div>
                )}
                
              </div>
            </Link>
          ))}

           </div>
       </div> 

       <div className="tail_container">
         <h1>قيمنا</h1>
         <div className="tail">
            {about_tail.map((item, index) => (
            <Link key={index + item.titel}>
               
                <h2 className="number">{item.number}</h2>
                <h2>{item.titel}</h2>
                <p className="prag">{item.pragraph} </p>
        
            </Link>
          ))}

           </div>    
      </div>

      </div>
      </div>
  );
};
