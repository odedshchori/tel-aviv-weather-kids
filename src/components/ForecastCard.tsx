import type { FC } from 'react';
import type { WeatherType } from './WeatherIcon';
import { WeatherIcon } from './WeatherIcon';

export interface DailyForecast {
    id: string;
    day: string;
    temp: number;
    tempMin: number;
    weather: WeatherType;
}


interface ForecastCardProps {
    data: DailyForecast;
    isActive: boolean;
    onClick: () => void;
}

export const ForecastCard: FC<ForecastCardProps> = ({ data, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="forecast-card"
            style={{
                background: isActive ? 'var(--color-card-active)' : 'rgba(255, 255, 255, 0.75)',
                border: isActive ? 'none' : '1px solid rgba(255,255,255,0.6)',
                backdropFilter: 'blur(8px)',
                borderRadius: 'var(--border-radius-md)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: isActive ? 'var(--shadow-lg), var(--shadow-glow)' : 'var(--shadow-sm)',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: isActive ? 'scale(1.1) translateY(-10px)' : 'scale(1)',
                minWidth: '100px',
            }}
            onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
            }}
            onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#1F2937', fontWeight: 800, textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>{data.day}</h3>
            <WeatherIcon type={data.weather} size={48} animate={isActive} />
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#1F2937', marginTop: '0.5rem' }}>
                {data.temp}°
            </div>


        </button>
    );
};
