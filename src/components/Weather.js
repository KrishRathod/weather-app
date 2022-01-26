import React from "react";

function Weather(props) {
    /* Weather component is display none by default */
    /* add or remove Weather component depends on displayComponent state*/
    /* if displayComponent === false component will be not displayed */
    if (!props.displayComponent) {
        return(
            <section className="weather-wrapper">
                {/* add conditional operator for only rendering data if user click submit btn */}
    
                { 
                    props.city && props.country  && props.temperture && 
                    <div className="main-data">
                        <p className="temp">{props.temperture}<sup className="degree">o</sup></p>
                        <div className="vertical-line"></div>
                        <p className="location"> {props.city}, {props.country}</p>
                    </div>
    
                }
    
                { props.icon && <img className="weather-icon" alt={props.condition} src={`https://openweathermap.org/img/w/${props.icon}.png`} />}
    
                {props.error && <p role="alert" className="error">{props.error}</p>}

                {props.incorrctCountryNameError && <p role="alert" className="error">{props.incorrctCountryNameError}</p>}
    
            </section>
        );
    /* if displayComponent === true component will be displayed */
    } else {
        return(
            <section className="weather-wrapper display-component">
                {/* add conditional operator for only rendering data if user click submit btn */}
    
                { 
                    props.city && props.country  && props.temperture && 
                    <div className="main-data">
                        <p className="temp">{props.temperture}<sup className="degree">o</sup></p>
                        <div className="vertical-line"></div>
                        <p className="location"> {props.city}, {props.country}</p>
                    </div>
    
                }
    
                { props.icon && <img className="weather-icon" alt={props.condition} src={`https://openweathermap.org/img/w/${props.icon}.png`} />}
    
                {props.error && <p role="alert" className="error">{props.error}</p>}

                {props.incorrctCountryNameError && <p role="alert" className="error">{props.incorrctCountryNameError}</p>}
    
            </section>
        );
    
    }
    
}

export default Weather;