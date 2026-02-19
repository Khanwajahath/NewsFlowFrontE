import { useEffect, useState } from "react"

export   function Weather(){
    const [weatherData,setWeatherData]=useState({ });
    const [hourly,setHourly]=useState(false);
    const [activebtn,setActivebtn]=useState("bg-transparent")
    useEffect(()=>{
        fetch("https://news-flow-backend.vercel.app/api/weather")
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            setWeatherData(data)})
    },[])

const weatherIconMap = {
  clear: "https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/fill/svg/clear-day.svg",
  partlyCloudy: "https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/fill/svg/partly-cloudy-day.svg",
  cloudy: "https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/fill/svg/cloudy.svg",
  rain: "https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/fill/svg/rain.svg",
  snow: "https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/fill/svg/snow.svg",
  fog: "https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/fill/svg/fog.svg",
};
const normalizeCondition = (condition = "") => {
  const c = condition.toLowerCase();

  if (c.includes("clear")) return "clear";
  if (c.includes("part")) return "partlyCloudy";
  if (c.includes("cloud")) return "cloudy";
  if (c.includes("rain")) return "rain";
  if (c.includes("snow")) return "snow";
  if (c.includes("fog")) return "fog";

  return "clear"; // fallback
};



    return (
        <div className="bg-black mt-3 rounded-3xl p-3 w-3/4 md:w-1/4 text-white ">
     
            <div>
                <h5 className="mb-2">{weatherData.address}</h5>
                <span className="mb-2 font-bold">{weatherData.description}</span>
                <div>
                    <div className="flex-col mb-3">
                        <button onClick={()=>setHourly(true)}
                            className={`${activebtn }hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}>Hourly</button>
                        <button 
                        className={`${activebtn } hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`} onClick={()=>setHourly(false)} >Daily</button>
                    </div>
                    <div className=" flex gap-2 flex-wrap overflow-hidden" id="data">
                    {
                        hourly?
                        weatherData.days?.slice(0,6).map((item,i)=>{
                            const iconKey = normalizeCondition(item.conditions);
                        return (
                            <div key={i} className="flex flex-col items-center gap-1 w-18">
                            <span>{item.temp}°</span>

                            <img
                                src={weatherIconMap[iconKey]}
                                alt={item.conditions}
                                className="w-10 h-10 block"
                            />

                            <span className="text-xs text-white-500">
                                {item.conditions}
                            </span>
                            </div>
                        );
                        }):
                        weatherData?.days?.[0]?.hours?.slice(0, 6).map((item, i) => {
                        const iconKey = normalizeCondition(item.conditions);
                        return (
                            <div key={i} className="flex flex-col items-center gap-1 w-18">
                            <span>{item.temp}°</span>

                            <img
                                src={weatherIconMap[iconKey]}
                                alt={item.conditions}
                                className="w-10 h-10 block"
                            />

                            <span className="text-xs text-white-500">
                                {item.conditions}
                            </span>
                            </div>
                        );
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}