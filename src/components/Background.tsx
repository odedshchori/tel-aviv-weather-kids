import type { FC } from 'react';
import type { WeatherType } from './WeatherIcon';

interface BackgroundProps {
    weather: WeatherType;
}

export const Background: FC<BackgroundProps> = ({ weather }) => {
    const isBeach = weather === 'sunny' || weather === 'partly-cloudy';

    // Color Palette based on weather
    const cityColor = weather === 'rainy' ? '#37474F' : '#607D8B';

    return (
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100vw', height: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>

            {/* SVG DEFINITIONS (Filters for Softness) */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                    </filter>
                    <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#F5F5F5', stopOpacity: 0.8 }} />
                    </linearGradient>
                </defs>
            </svg>

            {/* 1. FAR HORIZON SKYLINE (Subtle Azrieli) */}
            <div style={{ position: 'absolute', bottom: '150px', width: '100%', height: '200px', opacity: 0.2 }}>
                <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="none">
                    <rect x="800" y="40" width="20" height="160" rx="10" fill={cityColor} />
                    <rect x="830" y="20" width="25" height="180" fill={cityColor} />
                    <path d="M 865 200 L 895 200 L 880 50 Z" fill={cityColor} />
                </svg>
            </div>

            {isBeach ? (
                /* SUNNY / PARTLY CLOUDY - Beach World */
                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
                    {/* Sea Layer */}
                    <div style={{ position: 'absolute', bottom: '100px', width: '100%', height: '150px', backgroundColor: '#0288D1' }}>
                        <div style={{ position: 'absolute', top: 0, width: '100%', height: '15px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
                    </div>

                    {/* Jaffa Old City Silhouette */}
                    <svg width="350" height="120" viewBox="0 0 350 120" style={{ position: 'absolute', bottom: '100px', right: '0', opacity: 0.7 }}>
                        <path d="M 0 120 L 100 120 L 100 80 L 150 80 L 150 50 L 180 50 L 180 30 L 200 30 L 200 120 Z" fill="#8D6E63" />
                        <rect x="185" y="10" width="8" height="25" fill="#8D6E63" />
                        <circle cx="189" cy="8" r="4" fill="#D32F2F" />
                    </svg>

                    {/* Sand Layer */}
                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '120px', backgroundColor: '#FFE082' }}>
                        <div style={{ position: 'absolute', top: '-20px', width: '100%', height: '40px', backgroundColor: '#FFE082', borderRadius: '50%' }} />
                    </div>

                    {/* Icon Element: Palm Tree */}
                    <svg width="200" height="250" style={{ position: 'absolute', bottom: '20px', left: '10%' }}>
                        <path d="M 50 250 Q 30 150 50 50" stroke="#5D4037" strokeWidth="12" fill="none" strokeLinecap="round" />
                        <g fill="#4CAF50">
                            <ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(-30 50 50)" />
                            <ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(30 50 50)" />
                            <ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(90 50 50)" />
                        </g>
                    </svg>
                </div>
            ) : (
                /* CLOUDY / RAINY - City World */
                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
                    {/* Building Silhouettes */}
                    <svg width="100%" height="400" style={{ position: 'absolute', bottom: '40px' }} preserveAspectRatio="none">
                        <rect x="5%" y="200" width="120" height="200" fill={cityColor} rx="5" />
                        <rect x="25%" y="100" width="80" height="300" fill={cityColor} rx="2" />
                        <rect x="27%" y="120" width="60" height="10" fill="#FFF" opacity="0.1" />
                        <rect x="75%" y="180" width="150" height="220" fill={cityColor} rx="5" />
                    </svg>

                    {/* Ground */}
                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '40px', backgroundColor: '#263238' }} />

                    {/* Rain drops */}
                    {weather === 'rainy' && (
                        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0 }}>
                            {[...Array(30)].map((_, i) => (
                                <rect
                                    key={i}
                                    x={`${(i * 7) % 100}%`}
                                    y="-20"
                                    width="1.5"
                                    height="20"
                                    fill="#FFF"
                                    opacity="0.2"
                                    className="animate-drop"
                                    style={{ animationDelay: `${(i * 0.1) % 2}s` }}
                                />
                            ))}
                        </svg>
                    )}
                </div>
            )}

            {/* 3. SOFT PIXAR CLOUDS (High Layer) */}
            <div style={{ position: 'absolute', top: '20px', width: '100%', height: '250px' }}>
                <svg width="100%" height="100%">
                    <g filter="url(#softBlur)" opacity={weather === 'sunny' ? 0.3 : 0.6}>
                        {/* Cloud 1 - Group of soft circles */}
                        <g transform="translate(100, 50)" className="animate-float">
                            <circle cx="40" cy="40" r="40" fill="url(#cloudGrad)" />
                            <circle cx="80" cy="40" r="50" fill="url(#cloudGrad)" />
                            <circle cx="130" cy="50" r="40" fill="url(#cloudGrad)" />
                        </g>

                        {/* Cloud 2 */}
                        <g transform="translate(650, 80) scale(1.2)" className="animate-float" style={{ animationDelay: '2s' }}>
                            <circle cx="40" cy="40" r="35" fill="url(#cloudGrad)" />
                            <circle cx="70" cy="30" r="45" fill="url(#cloudGrad)" />
                            <circle cx="110" cy="40" r="35" fill="url(#cloudGrad)" />
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    );
};
