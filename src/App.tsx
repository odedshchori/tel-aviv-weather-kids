import { useState, useEffect } from 'react';
import './App.css';
import { WeatherIcon, type WeatherType } from './components/WeatherIcon';
import { Character, type CharacterVariant } from './components/Character';
import { ForecastCard, type DailyForecast } from './components/ForecastCard';
import { Background } from './components/Background';
import { CharacterShowcase } from './components/CharacterShowcase';
import { HourlyTimeline, type HourlyForecast } from './components/HourlyTimeline';



const hebrewDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

function App() {
  const [forecastData, setForecastData] = useState<DailyForecast[]>([]);
  const [hourlyData, setHourlyData] = useState<HourlyForecast[]>([]);
  const [selectedDayId, setSelectedDayId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showShowcase, setShowShowcase] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);




  useEffect(() => {
    async function fetchWeather() {
      try {
        // Tel Aviv coordinates
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=32.0853&longitude=34.7818&daily=weathercode,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weathercode&timezone=auto');
        const data = await res.json();


        const mapWmoToWeather = (wmoCode: number): WeatherType => {
          if (wmoCode === 0 || wmoCode === 1) return 'sunny';
          if (wmoCode === 2 || wmoCode === 3) return 'partly-cloudy';
          if (wmoCode === 45 || wmoCode === 48) return 'cloudy';
          return 'rainy';
        };

        const daily = data.daily;
        const mappedDaily: DailyForecast[] = daily.time.slice(0, 5).map((dateStr: string, index: number) => {
          const date = new Date(dateStr);
          const dayName = index === 0 ? 'היום' : hebrewDays[date.getDay()];
          const weather = mapWmoToWeather(daily.weathercode[index]);

          return {
            id: dateStr,
            day: dayName,
            temp: Math.round(daily.temperature_2m_max[index]),
            tempMin: Math.round(daily.temperature_2m_min[index]),
            weather
          };

        });

        const hourly = data.hourly;
        const mappedHourly: HourlyForecast[] = hourly.time.map((time: string, index: number) => ({
          time,
          temp: Math.round(hourly.temperature_2m[index]),
          weather: mapWmoToWeather(hourly.weathercode[index])
        }));

        setForecastData(mappedDaily);
        setHourlyData(mappedHourly);
        setSelectedDayId(mappedDaily[0].id);
        setLoading(false);
      } catch (e) {
        console.error('Failed to fetch weather', e);
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  if (showShowcase) {
    return <CharacterShowcase onBack={() => setShowShowcase(false)} />;
  }

  if (loading || forecastData.length === 0) {
    return (
      <div className="app-container bg-sky-clear" dir="rtl">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '2rem', fontWeight: 600, color: '#fff' }}>
          טוען מזג אוויר...
        </div>
      </div>
    );
  }

  const selectedDay = forecastData.find(d => d.id === selectedDayId) || forecastData[0];
  const { weather, temp, day } = selectedDay;

  const variants: CharacterVariant[] = ['boy', 'girl', 'beanie', 'ponytail'];
  const selectedIndex = forecastData.findIndex(d => d.id === selectedDayId);
  const variant = variants[Math.max(0, selectedIndex) % variants.length];

  // Derive background class from weather
  const bgClass = `bg-sky-${weather}`;

  // Calculate Current Temp (for the big display)
  const isSelectedDayToday = selectedDayId === forecastData[0]?.id;
  const currentHourISO = new Date().toISOString().split(':')[0] + ':00';
  const currentHourlyPoint = hourlyData.find(h => h.time.startsWith(currentHourISO.substring(0, 13)));

  // If we selected "Today", show current temp. Otherwise show daily High.
  const displayTemp = isSelectedDayToday ? (currentHourlyPoint?.temp ?? temp) : temp;

  return (
    <div className={`app-container ${bgClass}`} dir="rtl">
      <Background weather={weather} />

      {/* DEV button — temp shortcut to character showcase */}
      <button
        onClick={() => setShowShowcase(true)}
        style={{
          position: 'absolute', top: '1rem', left: '1rem', zIndex: 100,
          padding: '0.4rem 0.9rem', borderRadius: '10px', fontSize: '0.75rem',
          fontWeight: 700, cursor: 'pointer', border: '2px dashed rgba(255,255,255,0.5)',
          background: 'rgba(0,0,0,0.35)', color: '#fff', backdropFilter: 'blur(6px)',
        }}
      >
        🛠️ DEV
      </button>

      {/* Sun/Moon/Extra ambiance behind the character */}
      {(weather === 'sunny' || weather === 'partly-cloudy') && (
        <div style={{ position: 'absolute', top: '10%', left: '20%', zIndex: 5, filter: 'blur(20px)', opacity: 0.8 }}>
          <div style={{ width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'var(--color-sun-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="animate-pulse">
          </div>
        </div>
      )}

      <main className="main-content">
        {/* Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 className="title-display" style={{ color: 'var(--color-text-dark)', textShadow: '0 2px 4px rgba(255,255,255,0.7)', marginBottom: '0.2rem' }}>
            תל אביב
          </h1>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', fontWeight: 700, opacity: 0.7, fontSize: '1.1rem' }}>
            <span>↑{temp}°</span>
            <span>↓{selectedDay.tempMin}°</span>
            <span style={{ margin: '0 0.3rem', opacity: 0.5 }}>|</span>
            <span>{day} {isSelectedDayToday && "• עכשיו"}</span>
          </div>
        </div>

        {/* Big Weather Display & Character Container */}
        <div className="hero-container">

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <WeatherIcon type={weather} size={150} animate={true} />
            <div className="hero-temp-display">
              {displayTemp}°
            </div>
          </div>


          <div>
            <Character weather={weather} animationKey={animationKey} variant={variant} />
          </div>

        </div>


        {/* Hourly Timeline */}
        <div style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <HourlyTimeline data={hourlyData.filter(h => {
            if (!h.time.startsWith(selectedDayId)) return false;
            const hour = new Date(h.time).getHours();
            const isToday = selectedDayId === forecastData[0]?.id;
            const currentHour = new Date().getHours();
            const startHour = isToday ? Math.max(7, currentHour) : 7;
            return hour >= startHour && hour <= 20;
          })} />
        </div>
      </main>


      {/* Bottom Forecast Slider/Cards */}
      <div className="forecast-container">
        {forecastData.map((data) => (
          <ForecastCard
            key={data.id}
            data={data}
            isActive={selectedDayId === data.id}
            onClick={() => {
              setSelectedDayId(data.id);
              if (data.weather === 'sunny' || data.weather === 'partly-cloudy') {
                setAnimationKey(prev => prev + 1);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
