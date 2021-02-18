import React,{useState} from 'react';
 const api = {
  key:"9a77c4a2de9e8a7aa1f4744ca34560d7",
  baseUrl: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query,setQuery]= useState('');
  const [weather,setWeather] = useState({});

  const search = event =>{
    if(event.key === 'Enter'){
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result =>{
      setWeather(result);
      setQuery('')
      console.log(result)
    });
      
    }
  }
  const weatherTranslation = (weather) =>{
    if(weather === 'Clouds'){
      return weather = 'Nublado'
    }else if(weather === 'Clear'){
      return weather = 'Despejado'
    }
    
  }

  const dateBuilder = (date) =>{
    let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"]
 let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
 let day = days[date.getDay()]
 let dates = date.getDate();
 let month = months[date.getMonth()];
 let year = date.getFullYear();
 return `${day} ${dates} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ?
  ((weather.main.temp >16) ? 'app-warm':'app'): 'app'
  }>
    <main>
      <div className="search-box">
        <input type="text" className="search-bar"
        placeholder="Buscar..."
        onChange={e=> setQuery(e.target.value)}
        value={query}
        onKeyPress={search}></input>
      </div>

{
  (typeof weather.main != 'undefined') ? (
    <div>
    <div className="location-box">
    <div className="location"> {weather.name}, {weather.sys.country}</div>
    <div className="date">{dateBuilder(new Date())}</div>
    </div>
    

    <div className="weather-box">
  <div className="temp">{Math.round(weather.main.temp)}°c</div>
  <div className="weather">{weatherTranslation(weather.weather[0].main)}</div>
  </div>
    </div>
  ):('')
}
     

      
    </main>
    
    </div>
  );
}

export default App;
