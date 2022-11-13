import React, { useEffect, useState } from 'react'

export default function Home() {
    const [city, setcity] = useState(null);
    const [search, setSearch] = useState("mumbai");

    const getCurrentDay = () => {
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        let currentTime = new Date();
        let day = weekday[currentTime.getDay()];
        return day;
      };

      const getCurrentTime = () => {
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ];

        var now = new Date();
        var month = months[now.getMonth() ];
        var date = now.getDate();

        let hours = now.getHours();
        let mins = now.getMinutes();

        let periods = "AM";

        if (hours > 11) {
          periods = "PM";
          if (hours > 12) hours -= 12;
        }
        if (mins < 10) {
          mins = "0" + mins;
        }

        return `${month} ${date} | ${hours}:${mins}${periods}`;
      };

    useEffect(() => {
        fetchApi()
    }, [search])
    const fetchApi = async () => {
        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=2515c4074a21823328b4a6be1ad39bb7`)
        data = await data.json()
        setcity(data.main)
    }
    return (
        <>
            <div className="box">
                <div className="wave -one"></div>
                <div className="wave -two"></div>
                <div className="wave -three"></div>
                <div className="mainInput">
                    <div className='inputBox'>
                        <input type="search" onChange={(e) => { setSearch(e.target.value) }} placeholder='Enter City Name' value={search} />
                    </div>
                </div>
                {city ? (<div id="weathercon">
                    <i className="fas fa-sun" ></i>
                </div>) : null}
                {!city ? (<h1 className='noData'>No data found</h1> ) : (<div className="info">
                    <h2 className="location">
                        <i className="fas fa-street-view" ></i>{search}
                    </h2>
                    <p id="date">{`${getCurrentDay()} | ${getCurrentTime()}`}</p>
                    {/* <p id="date">WED | nov 23 | 10:49AM</p> */}
                    <h1 className="temp">{city.temp}&deg;C</h1>
                    <h3 className="tempmin_max">
                        Min {city.temp_min}&deg;C | Max {city.temp_max}&deg;C
                    </h3>
                </div>)}

            </div>
        </>
    )
}
