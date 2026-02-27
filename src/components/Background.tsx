import type { FC } from 'react';
import type { WeatherType } from './WeatherIcon';

interface BackgroundProps {
    weather: WeatherType;
}

export const Background: FC<BackgroundProps> = ({ weather }) => {
    const isBeach = weather === 'sunny' || weather === 'partly-cloudy';

    return (
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100vw', height: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
            {isBeach ? (
                <>
                    {/* Tel Aviv Beach / Sea Line */}
                    <div className="waves-container" style={{ position: 'absolute', bottom: '0', width: '100%', height: '300px' }}>
                        <svg width="200%" height="200px" style={{ position: 'absolute', bottom: '60px', left: '-50%' }} preserveAspectRatio="none" className="animate-drift">
                            <path d="M 0 100 Q 150 50 300 100 T 600 100 T 900 100 T 1200 100 T 1500 100 T 1800 100 T 2100 100 V 300 H 0 Z" fill="#0277BD" opacity="0.4" />
                            <path d="M 0 130 Q 150 170 300 130 T 600 130 T 900 130 T 1200 130 T 1500 130 T 1800 130 T 2100 130 V 300 H 0 Z" fill="#01579B" opacity="0.6" />
                        </svg>
                        <svg width="200%" height="200px" style={{ position: 'absolute', bottom: '40px', left: '0' }} preserveAspectRatio="none" className="animate-drift-reverse">
                            <path d="M 0 110 Q 150 150 300 110 T 600 110 T 900 110 T 1200 110 T 1500 110 T 1800 110 T 2100 110 V 300 H 0 Z" fill="#0288D1" opacity="0.5" />
                        </svg>

                        {/* Beach Sand */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '70px', backgroundColor: '#FFE082', borderTopLeftRadius: '50% 10px', borderTopRightRadius: '50% 15px' }} />
                    </div>
                </>
            ) : (
                <>
                    {/* Urban Silhouette for Cloudy / Rainy */}
                    <div style={{ position: 'absolute', bottom: '0', width: '100%', height: '300px' }}>
                        <svg width="100%" height="200px" style={{ position: 'absolute', bottom: '0', left: '0' }} preserveAspectRatio="none">
                            {/* Layer 1 - Background Buildings */}
                            <path d="M 0 200 L 0 50 L 20 50 L 20 80 L 50 80 L 50 60 L 80 60 L 80 120 L 120 120 L 120 30 L 150 30 L 150 90 L 180 90 L 180 110 L 220 110 L 220 70 L 250 70 L 250 100 L 300 100 L 300 40 L 340 40 L 340 120 L 400 120 L 400 60 L 450 60 L 450 90 L 500 90 L 500 200 Z" fill={weather === 'rainy' ? '#37474F' : '#607D8B'} opacity="0.5" />
                            {/* Layer 2 - Foreground Buildings */}
                            <path d="M -10 200 L -10 100 L 30 100 L 30 130 L 60 130 L 60 90 L 100 90 L 100 140 L 140 140 L 140 80 L 180 80 L 180 150 L 220 150 L 220 100 L 260 100 L 260 140 L 300 140 L 300 70 L 350 70 L 350 130 L 390 130 L 390 110 L 440 110 L 440 200 Z" fill={weather === 'rainy' ? '#263238' : '#455A64'} opacity="0.8" />
                            {/* Road / Ground */}
                            <rect x="0" y="180" width="100%" height="20" fill={weather === 'rainy' ? '#1c2226' : '#263238'} />
                        </svg>

                        {weather === 'rainy' && (
                            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                                <line x1="10%" y1="-20" x2="5%" y2="300" stroke="#fff" strokeWidth="1" opacity="0.2" className="animate-drop" />
                                <line x1="30%" y1="-50" x2="25%" y2="300" stroke="#fff" strokeWidth="1" opacity="0.3" className="animate-drop" style={{ animationDelay: '0.2s' }} />
                                <line x1="50%" y1="-10" x2="45%" y2="300" stroke="#fff" strokeWidth="1.5" opacity="0.2" className="animate-drop" style={{ animationDelay: '0.7s' }} />
                                <line x1="70%" y1="-40" x2="65%" y2="300" stroke="#fff" strokeWidth="1" opacity="0.3" className="animate-drop" style={{ animationDelay: '0.4s' }} />
                                <line x1="90%" y1="-15" x2="85%" y2="300" stroke="#fff" strokeWidth="1" opacity="0.2" className="animate-drop" style={{ animationDelay: '0.9s' }} />
                            </svg>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
