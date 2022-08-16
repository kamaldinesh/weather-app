import React,{useEffect , useState} from 'react'

export default function Weather_content() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState(null);
  const [icon,setIcon] = useState(null);
  
  
  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=1ccd9cc89e75fb84aa938355569bda41`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCity(resJson.main);
   

      if(resJson.weather[0].main === 'Haze'||resJson.weather[0].main === 'Clouds')
        setIcon(<i class="fa-solid fa-cloud"></i>);
      else if (resJson.weather[0].main === 'Clear')
        setIcon(<i class="fa-solid fa-sun"></i>);
      else if (resJson.weather[0].main === 'Dust')
        setIcon(<i class="fa-solid fa-tornado"></i>);
      else
        setIcon(<i class="fa-solid fa-street-view"></i>);
  
    };

    fetchApi();
  }, [search])


  return (
    <div className='content_box'>
      <input
        type="text"
        className='content_input'
        onChange={e => setSearch(e.target.value)}
        placeholder="Enter city name"
      />
   

      {!city ? (<p
        className='no_data'>
        no data found
      </p>
      ) : (
          <>
            <div className='content_icon'>{icon}</div>
          <div className='temp'>{(city.temp - 273.15).toFixed(2)}℃</div>
          
          <div className='min_temp'>
            <h4>Min Temp</h4>  
              {(city.temp_min - 273.15).toFixed(2)}℃
          </div>
          <div className='max_temp'>
          <h4>Max Temp</h4>     
          {(city.temp_max - 273.15).toFixed(2)}℃
          </div>
          </>
        )
      }
      

    </div>
  )
}
