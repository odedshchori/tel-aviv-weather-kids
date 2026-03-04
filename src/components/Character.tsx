import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import type { WeatherType } from './WeatherIcon';
import boySunnyImg from '../assets/boy_sunny.png';
import boyRainyImg from '../assets/boy_rainy.png';
import boyCloudyImg from '../assets/boy_cloudy.png';
import boyPartlyCloudyImg from '../assets/boy_partly_cloudy.png';

export type CharacterVariant = 'boy' | 'girl' | 'beanie' | 'ponytail';

interface CharacterProps {
    weather: WeatherType;
    className?: string;
    animationKey?: number;
    variant?: CharacterVariant;
}

export const Character: FC<CharacterProps> = ({ weather, className = '', animationKey = 0, variant = 'boy' }) => {
    const [isDancing, setIsDancing] = useState(false);
    const [processedImg, setProcessedImg] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const isRealistic = variant === 'boy';

    const getRealisticImg = () => {
        switch (weather) {
            case 'sunny': return boySunnyImg;
            case 'rainy': return boyRainyImg;
            case 'cloudy': return boyCloudyImg;
            case 'partly-cloudy': return boyPartlyCloudyImg;
            default: return boySunnyImg;
        }
    };

    // Background removal logic using Canvas
    useEffect(() => {
        if (!isRealistic) {
            setProcessedImg(null);
            return;
        }

        setProcessedImg(null);

        const img = new Image();
        img.src = getRealisticImg();
        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (!ctx) return;

            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // Detect white/grey checkerboard pattern
                // Bright neutral colors
                const brightness = (r + g + b) / 3;
                const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));

                // Thresholds for checkerboard squares:
                // 1. White squares (very bright, very neutral)
                // 2. Grey squares (mid-bright, very neutral)
                const isWhiteSquare = brightness > 180 && diff < 20;
                const isGreySquare = brightness > 140 && brightness < 210 && diff < 10;

                if (isWhiteSquare || isGreySquare) {
                    data[i + 3] = 0; // Set alpha to 0 (transparent)
                }
            }

            ctx.putImageData(imageData, 0, 0);
            setProcessedImg(canvas.toDataURL());
        };
        return () => {
            img.onload = null;
        };
    }, [weather, variant, isRealistic]);

    const getSkinColor = () => {
        switch (variant) {
            case 'boy': return '#FFCCBC';
            case 'girl': return '#FFE0B2';
            case 'beanie': return '#FFCCBC';
            case 'ponytail': return '#ECA184';
            default: return '#FFCCBC';
        }
    };
    const skinColor = getSkinColor();

    useEffect(() => {
        if (animationKey > 0 && (weather === 'sunny' || weather === 'partly-cloudy')) {
            setIsDancing(true);
            const timer = setTimeout(() => setIsDancing(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [animationKey, weather]);

    if (isRealistic) {
        return (
            <div className={`character-wrapper ${className}`}>
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                {processedImg ? (
                    <img
                        src={processedImg}
                        alt="Realistic Boy"
                        className={`realistic-character ${weather}-realistic`}
                    />
                ) : (
                    <div className="loading-character">טוען דמות...</div>
                )}
            </div>
        );
    }

    return (
        <div className={`character-wrapper ${className}`}>
            <svg viewBox="0 -30 200 330" width="100%" height="100%" overflow="visible">
                <g className={`char-head ${isDancing ? 'dancing' : ''}`} key={`head-${animationKey}`}>
                    {variant === 'boy' && (
                        <>
                            <circle cx="100" cy="80" r="40" fill="#FFCCBC" />
                            <path d="M 85 85 Q 100 100 115 85" stroke="#5D4037" strokeWidth="3" fill="none" strokeLinecap="round" />
                            <circle cx="85" cy="70" r="5" fill="#5D4037" />
                            <circle cx="115" cy="70" r="5" fill="#5D4037" />
                            <path d="M 60 70 Q 100 20 140 70 Z" fill="#795548" />
                        </>
                    )}
                    {variant === 'girl' && (
                        <>
                            <circle cx="65" cy="95" r="15" fill="#F57C00" />
                            <circle cx="135" cy="95" r="15" fill="#F57C00" />
                            <circle cx="100" cy="80" r="40" fill="#FFE0B2" />
                            <path d="M 65 68 Q 100 28 135 68 Z" fill="#F57C00" />
                            <path d="M 60 68 Q 100 43 140 68 Q 100 23 60 68 Z" fill="#E65100" opacity="0.5" />
                            <path d="M 85 85 Q 100 95 115 85" stroke="#5D4037" strokeWidth="3" fill="none" strokeLinecap="round" />
                            <circle cx="85" cy="70" r="5.5" fill="#5D4037" />
                            <circle cx="115" cy="70" r="5.5" fill="#5D4037" />
                            <path d="M 80 65 L 75 60 M 85 62 L 82 55 M 120 65 L 125 60 M 115 62 L 118 55" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" />
                        </>
                    )}
                    {variant === 'beanie' && (
                        <>
                            <circle cx="100" cy="80" r="40" fill="#FFCCBC" />
                            <path d="M 60 65 C 60 25, 140 25, 140 65 Z" fill="#D81B60" />
                            <rect x="58" y="60" width="84" height="15" rx="5" fill="#C2185B" />
                            <circle cx="100" cy="35" r="12" fill="#F48FB1" />
                            <circle cx="80" cy="80" r="1.5" fill="#D84315" />
                            <circle cx="88" cy="78" r="1.5" fill="#D84315" />
                            <circle cx="112" cy="78" r="1.5" fill="#D84315" />
                            <circle cx="120" cy="80" r="1.5" fill="#D84315" />
                            <path d="M 85 87 Q 100 102 115 87" stroke="#5D4037" strokeWidth="3" fill="none" strokeLinecap="round" />
                            <circle cx="85" cy="72" r="5" fill="#5D4037" />
                            <circle cx="115" cy="72" r="5" fill="#5D4037" />
                        </>
                    )}
                    {variant === 'ponytail' && (
                        <>
                            <path d="M 65 65 C 50 100, 80 110, 75 120" stroke="#3E2723" strokeWidth="15" strokeLinecap="round" fill="none" />
                            <circle cx="100" cy="80" r="40" fill="#ECA184" />
                            <path d="M 65 65 Q 100 10 135 65 Z" fill="#3E2723" />
                            <path d="M 65 65 Q 100 50 135 65 Q 100 20 65 65 Z" fill="#2E1713" opacity="0.5" />
                            <path d="M 55 60 L 65 50 L 75 60 Z" fill="#00BCD4" />
                            <path d="M 75 60 L 65 70 L 55 60 Z" fill="#00BCD4" />
                            <circle cx="65" cy="60" r="4" fill="#0097A7" />
                            <path d="M 85 85 Q 100 100 115 85" stroke="#4E342E" strokeWidth="3" fill="none" strokeLinecap="round" />
                            <circle cx="85" cy="70" r="5" fill="#4E342E" />
                            <circle cx="115" cy="70" r="5" fill="#4E342E" />
                        </>
                    )}
                </g>

                <g className={`char-body ${isDancing ? 'dancing' : ''}`} key={`body-${animationKey}`}>
                    {weather === 'sunny' && (
                        <g id="clothes-sunny">
                            <path d="M 75 65 L 125 65 L 120 75 L 80 75 Z" fill="#212121" />
                            <circle cx="85" cy="70" r="10" fill="#212121" />
                            <circle cx="115" cy="70" r="10" fill="#212121" />
                            <path d="M 70 120 L 130 120 L 140 180 L 60 180 Z" fill="#FF5722" />
                            <path d="M 65 180 L 135 180 L 135 220 L 105 220 L 100 200 L 95 220 L 65 220 Z" fill="#03A9F4" />
                            <rect x="75" y="220" width="15" height="40" fill={skinColor} />
                            <rect x="110" y="220" width="15" height="40" fill={skinColor} />
                            <rect x="65" y="250" width="25" height="15" rx="6" fill="#009688" />
                            <rect x="110" y="250" width="25" height="15" rx="6" fill="#009688" />
                        </g>
                    )}

                    {weather === 'partly-cloudy' && (
                        <g id="clothes-light">
                            <path d="M 70 120 L 130 120 L 140 180 L 60 180 Z" fill="#81D4FA" />
                            <path d="M 60 180 L 140 180 L 135 250 L 105 250 L 100 210 L 95 250 L 65 250 Z" fill="#90A4AE" />
                            <rect x="60" y="245" width="30" height="15" rx="5" fill="#546E7A" />
                            <rect x="110" y="245" width="30" height="15" rx="5" fill="#546E7A" />
                        </g>
                    )}

                    {weather === 'cloudy' && (
                        <g id="clothes-cloudy">
                            <path d="M 65 110 L 135 110 L 145 190 L 55 190 Z" fill="#8BC34A" />
                            <path d="M 65 110 Q 100 130 135 110" stroke="#689F38" strokeWidth="3" fill="none" />
                            <path d="M 60 190 L 140 190 L 135 250 L 105 250 L 100 210 L 95 250 L 65 250 Z" fill="#1976D2" />
                            <rect x="60" y="245" width="30" height="15" rx="5" fill="#795548" />
                            <rect x="110" y="245" width="30" height="15" rx="5" fill="#795548" />
                        </g>
                    )}

                    {weather === 'rainy' && (
                        <g id="clothes-rainy">
                            <rect x="70" y="200" width="18" height="30" fill="#1976D2" />
                            <rect x="112" y="200" width="18" height="30" fill="#1976D2" />
                            <path d="M 65 220 L 90 220 L 90 270 L 55 270 L 55 240 Z" fill="#F44336" />
                            <path d="M 110 220 L 135 220 L 145 270 L 110 270 Z" fill="#F44336" />
                            <path d="M 60 110 L 140 110 L 155 210 L 45 210 Z" fill="#FFCA28" />
                            <path d="M 100 110 L 100 210" stroke="#F57F17" strokeWidth="2" />
                            <rect x="60" y="160" width="20" height="20" rx="3" fill="#F57F17" opacity="0.6" />
                            <rect x="120" y="160" width="20" height="20" rx="3" fill="#F57F17" opacity="0.6" />
                            <path d="M 50 110 A 50 90 0 0 1 150 110 L 135 110 A 35 75 0 0 0 65 110 Z" fill="#FFCA28" />
                            <line x1="152" y1="178" x2="105" y2="30" stroke="#4E342E" strokeWidth="6" strokeLinecap="round" />
                            <path d="M 152 178 Q 152 196 168 196" stroke="#4E342E" strokeWidth="6" fill="none" strokeLinecap="round" />
                            <path d="M 15 32 Q 60 -28 105 -30 Q 150 -28 195 32 Z" fill="#E53935" />
                            <path d="M 15 32 Q 38 0 62 -16 L 105 24 Z" fill="#FDD835" />
                            <path d="M 148 -16 Q 172 0 195 32 L 105 24 Z" fill="#FDD835" />
                            <path d="M 15 32 Q 60 -28 105 -30 Q 150 -28 195 32" stroke="#B71C1C" strokeWidth="3" fill="none" />
                            <line x1="105" y1="24" x2="15" y2="32" stroke="#B71C1C" strokeWidth="2" opacity="0.7" />
                            <line x1="105" y1="24" x2="62" y2="-16" stroke="#B71C1C" strokeWidth="2" opacity="0.7" />
                            <line x1="105" y1="24" x2="148" y2="-16" stroke="#B71C1C" strokeWidth="2" opacity="0.7" />
                            <line x1="105" y1="24" x2="195" y2="32" stroke="#B71C1C" strokeWidth="2" opacity="0.7" />
                            <circle cx="105" cy="-32" r="5" fill="#4E342E" />
                        </g>
                    )}
                </g>

                <g id="arms">
                    <rect x="50" y="125" width="20" height="60" rx="10"
                        className={`char-arm-left ${isDancing ? 'dancing' : ''}`}
                        key={`arm-left-${animationKey}`}
                        fill={weather === 'rainy' ? '#FFCA28' : weather === 'cloudy' ? '#8BC34A' : weather === 'partly-cloudy' ? '#81D4FA' : skinColor}
                    />
                    <rect x="130" y="125" width="20" height="60" rx="10"
                        className={`char-arm-right ${isDancing ? 'dancing' : ''}`}
                        key={`arm-right-${animationKey}`}
                        fill={weather === 'rainy' ? '#FFCA28' : weather === 'cloudy' ? '#8BC34A' : weather === 'partly-cloudy' ? '#81D4FA' : skinColor}
                    />
                    {weather !== 'sunny' && weather !== 'partly-cloudy' && (
                        <>
                            <circle cx="45" cy="180" r="8" fill={skinColor} />
                            <circle cx="155" cy="180" r="8" fill={skinColor} />
                        </>
                    )}
                </g>
            </svg>
        </div>
    );
};
