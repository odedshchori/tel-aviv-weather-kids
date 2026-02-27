import type { FC } from 'react';

export type WeatherType = 'sunny' | 'partly-cloudy' | 'cloudy' | 'rainy';

interface WeatherIconProps {
    type: WeatherType;
    size?: number;
    className?: string;
    animate?: boolean;
}

export const WeatherIcon: FC<WeatherIconProps> = ({ type, size = 64, className = '', animate = true }) => {
    const SunnyIcon = () => (
        <svg width={size} height={size} viewBox="0 0 100 100" className={`${animate ? 'animate-spin-slow' : ''}`}>
            <circle cx="50" cy="50" r="25" fill="#FFEB3B" />
            {/* Sun rays */}
            <path d="M50 10 L50 20 M50 80 L50 90 M10 50 L20 50 M80 50 L90 50 M22 22 L29 29 M71 71 L78 78 M22 78 L29 71 M71 29 L78 22" stroke="#FFC107" strokeWidth="6" strokeLinecap="round" />
        </svg>
    );

    const PartlyCloudyIcon = () => (
        <div style={{ position: 'relative', width: size, height: size }}>
            {/* Sun in background, slightly smaller and offset */}
            <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, right: 0 }} className={`${animate ? 'animate-spin-slow' : ''}`}>
                <circle cx="50" cy="50" r="25" fill="#FFEB3B" />
                <path d="M50 10 L50 20 M50 80 L50 90 M10 50 L20 50 M80 50 L90 50 M22 22 L29 29 M71 71 L78 78 M22 78 L29 71 M71 29 L78 22" stroke="#FFC107" strokeWidth="6" strokeLinecap="round" />
            </svg>
            {/* Cloud in foreground - positioned to overlap more with the sun */}
            <svg width={size * 0.8} height={size * 0.64} viewBox="0 0 100 80" style={{ position: 'absolute', bottom: '15%', left: '10%' }} className={`${animate ? 'animate-float' : ''}`}>
                <path d="M 25,60 A 20,20 0 1,1 40,30 A 25,25 0 0,1 80,45 A 20,20 0 0,1 75,70 Z" fill="#FFFFFF" filter="drop-shadow(0px 4px 10px rgba(0,0,0,0.3))" />
            </svg>
        </div>
    );

    const CloudyIcon = () => (
        <svg width={size} height={size * 0.8} viewBox="0 0 100 80" className={`${animate ? 'animate-float' : ''}`}>
            <path d="M 25,60 A 20,20 0 1,1 40,30 A 25,25 0 0,1 80,45 A 20,20 0 0,1 75,70 Z" fill="#FFFFFF" filter="drop-shadow(0px 4px 10px rgba(0,0,0,0.3))" />
        </svg>
    );

    const RainyIcon = () => (
        <div style={{ width: size, height: size, position: 'relative', overflow: 'visible' }} className={`${animate ? 'animate-float' : ''}`}>
            <svg width={size} height={size * 0.75} viewBox="0 0 100 80" style={{ position: 'absolute', top: 0, left: 0 }}>
                <path d="M 25,60 A 20,20 0 1,1 40,30 A 25,25 0 0,1 80,45 A 20,20 0 0,1 75,70 Z" fill="#B0BEC5" filter="drop-shadow(0px 4px 10px rgba(0,0,0,0.3))" />
            </svg>
            {/* Rain drops — overflow: visible lets them appear below without expanding the container */}
            <svg width={size} height={size * 0.35} viewBox="0 0 100 35" style={{ position: 'absolute', top: size * 0.6, left: 0, overflow: 'visible' }} className="animate-pulse">
                <line x1="30" y1="0" x2="25" y2="18" stroke="#29B6F6" strokeWidth="4" strokeLinecap="round" />
                <line x1="50" y1="4" x2="45" y2="22" stroke="#29B6F6" strokeWidth="4" strokeLinecap="round" />
                <line x1="70" y1="0" x2="65" y2="18" stroke="#29B6F6" strokeWidth="4" strokeLinecap="round" />
            </svg>
        </div>
    );

    return (
        <div className={`weather-icon-wrapper ${className}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            {type === 'sunny' && <SunnyIcon />}
            {type === 'partly-cloudy' && <PartlyCloudyIcon />}
            {type === 'cloudy' && <CloudyIcon />}
            {type === 'rainy' && <RainyIcon />}
        </div>
    );
};
