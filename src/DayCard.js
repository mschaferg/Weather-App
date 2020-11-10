import React from 'react';
var moment = require('moment');

const DayCard = ({ reading }) => {
    let newDate = new Date();
    const weekday = reading.dt * 1000;
    newDate.setTime(weekday);

    const imgURL = `owf owf-${reading.weather[0].id}-d owf-4x`;

    return (
        <div className="col-auto">
            <div className="card">
                <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
                <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
                <i className={imgURL}></i>
                <h2>{Math.round(reading.main.temp)} °F</h2>
                <div className="card-body">
                    <p className="card-text">{reading.weather[0].description}</p>
                </div>
            </div>
        </div>
    )
}


export default DayCard