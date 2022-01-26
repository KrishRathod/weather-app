import React from "react";

function WeatherDetails(props) {
    /* WeatherDetails component is display none by default */
    /* add or remove WeatherDetails component depends on displayComponent state*/
    /* if displayComponent === false component will be not displayed */
    if (!props.displayComponent) {
        return(
            
            <div className="weather-details">

                { 
                    props.humidity && props.condition && props.wind[0] && props.wind[1] && 
                    <div>
                        <p className="weather-data"><span className="weather-title">Humidity:</span> {props.humidity}</p> 
                        <p className="weather-data"><span className="weather-title">Conditions:</span> {props.condition}</p>
                        <p className="weather-data"><span className="weather-title">Wind:</span> Speed: {props.wind[0]}, Degree: {props.wind[1]}</p>
                    </div>
                }

            </div>
        );
    /* if displayComponent === true component will be displayed */
    } else {
        return(
            
            <div className="weather-details display-component">

                { 
                    props.humidity && props.condition && props.wind[0] && props.wind[1] && 
                    <div>
                        <p className="weather-data"><span className="weather-title">Humidity:</span> {props.humidity}</p> 
                        <p className="weather-data"><span className="weather-title">Conditions:</span> {props.condition}</p>
                        <p className="weather-data"><span className="weather-title">Wind:</span> Speed: {props.wind[0]}, Degree: {props.wind[1]}</p>
                    </div>
                }

            </div>
        );
    }
    
}

export default WeatherDetails;