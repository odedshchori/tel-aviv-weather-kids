import type { FC } from 'react';
import { WeatherIcon, type WeatherType } from './WeatherIcon';

export interface HourlyForecast {
    time: string;
    temp: number;
    weather: WeatherType;
}

interface HourlyTimelineProps {
    data: HourlyForecast[];
}

export const HourlyTimeline: FC<HourlyTimelineProps> = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <div style={{
            width: '100%',
            maxWidth: '1000px',
            padding: '1rem 0.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.5rem',
        }}>

            {data.map((hour) => {
                const timeStr = new Date(hour.time).toLocaleTimeString('he-IL', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });

                return (
                    <div key={hour.time} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.1rem',
                        minWidth: '50px',
                        padding: '0.4rem',
                    }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-dark)', opacity: 0.7 }}>
                            {timeStr}
                        </span>
                        <WeatherIcon type={hour.weather} size={32} animate={false} />
                    </div>
                );


            })}
        </div>
    );
};
