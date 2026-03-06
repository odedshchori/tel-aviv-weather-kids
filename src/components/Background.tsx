import type { FC } from 'react';
import type { WeatherType } from './WeatherIcon';

// Import New Background Assets
import bgSunny from '../assets/bg_sunny.png';
import bgPartlyCloudy from '../assets/bg_partly-cloudy.png';
import bgCloudy from '../assets/bg_cloudy.png';
import bgRainy from '../assets/bg_rainy.png';

interface BackgroundProps {
    weather: WeatherType;
}

export const Background: FC<BackgroundProps> = ({ weather }) => {

    // Select the correct image based on weather
    const getBgImage = () => {
        switch (weather) {
            case 'sunny': return bgSunny;
            case 'partly-cloudy': return bgPartlyCloudy;
            case 'cloudy': return bgCloudy;
            case 'rainy': return bgRainy;
            default: return bgSunny;
        }
    };

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            zIndex: 0,
            pointerEvents: 'none'
        }}>

            {/* Main Background Image */}
            <img
                src={getBgImage()}
                alt={`${weather} background`}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transition: 'opacity 0.8s ease-in-out'
                }}
            />

            {/* Weather Overlay Effects */}
            {weather === 'rainy' && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.1)' }}>
                    <svg width="100%" height="100%">
                        {[...Array(40)].map((_, i) => (
                            <rect
                                key={i}
                                x={`${(i * 3.7) % 100}%`}
                                y="-20"
                                width="1.5"
                                height="25"
                                fill="#FFF"
                                opacity="0.15"
                                className="animate-drop"
                                style={{
                                    animationDelay: `${(i * 0.08) % 2}s`,
                                    animationDuration: `${0.6 + Math.random() * 0.4}s`
                                }}
                            />
                        ))}
                    </svg>
                </div>
            )}

            {/* Subtle Gradient Overlay for Title Visibility */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '40%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)',
                zIndex: 1
            }} />
        </div>
    );
};
