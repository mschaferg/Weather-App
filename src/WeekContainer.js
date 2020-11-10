import React, { useEffect, useState } from 'react';
import apiConfig from './apiKeys';
import DayCard from './DayCard';

const WeekContainer = () => {
    const [state, setState] = useState({
        fullData: [],
        dailyData: []
    });

    const [city, setCity] = useState('Smyrna')

    const [input, setInput] = useState('')

    useEffect(() => {
        const loadData = async () => {
            const weatherURL = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiConfig.owmKey}`);
            const data = await weatherURL.json();
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("21:00:00"));
            setState({
                fullData: data.list,
                dailyData: dailyData
            })
        };
        loadData();
    }, [city])

    console.log(state);

    const formatDayCards = () => {
        return state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
    };

    const handleChange = event => {
        setInput(event.target.value);
        console.log(input)
    }

    const handleSubmit = event => {
        setCity(input);
        event.preventDefault();
        event.target.reset();
    }

    return (
        <div className="container">
            <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="City" onChange={handleChange} />
                <input type="submit" />
            </form>
            <h5 className="display-5 text-muted">{city}</h5>
            <div className="row justify-content-center">
                {formatDayCards()}
            </div>
        </div >
    )
}

export default WeekContainer;