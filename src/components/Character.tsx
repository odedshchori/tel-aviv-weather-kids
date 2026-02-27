import { useState, useEffect } from 'react';
import type { FC } from 'react';
import type { WeatherType } from './WeatherIcon';

interface CharacterProps {
    weather: WeatherType;
    className?: string;
    animationKey?: number;
}

export const Character: FC<CharacterProps> = ({ weather, className = '', animationKey = 0 }) => {
    const [isDancing, setIsDancing] = useState(false);

    useEffect(() => {
        if (animationKey > 0 && (weather === 'sunny' || weather === 'partly-cloudy')) {
            setIsDancing(true);
            const timer = setTimeout(() => setIsDancing(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [animationKey, weather]);

    return (
        <div className={`character-wrapper ${className}`}>
            <svg viewBox="0 -30 200 330" width="100%" height="100%" overflow="visible">
                {/* Basic Body Elements */}
                {/* Head */}
                <g className={`char-head ${isDancing ? 'dancing' : ''}`} key={`head-${animationKey}`}>
                    <circle cx="100" cy="80" r="40" fill="#FFCCBC" />
                    {/* Smiling Face - ALWAYS SMILING! */}
                    <path d="M 85 85 Q 100 100 115 85" stroke="#5D4037" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <circle cx="85" cy="70" r="5" fill="#5D4037" />
                    <circle cx="115" cy="70" r="5" fill="#5D4037" />
                    {/* Hair */}
                    <path d="M 60 70 Q 100 20 140 70 Z" fill="#795548" />
                </g>

                {/* Body group for vertical groove */}
                <g className={`char-body ${isDancing ? 'dancing' : ''}`} key={`body-${animationKey}`}>
                    {/* Dynamic Clothing */}
                    {weather === 'sunny' && (
                        <g id="clothes-sunny">
                            {/* Sunglasses */}
                            <path d="M 75 65 L 125 65 L 120 75 L 80 75 Z" fill="#212121" />
                            <circle cx="85" cy="70" r="10" fill="#212121" />
                            <circle cx="115" cy="70" r="10" fill="#212121" />
                            {/* T-Shirt */}
                            <path d="M 70 120 L 130 120 L 140 180 L 60 180 Z" fill="#FF5722" />
                            {/* Shorts */}
                            <path d="M 65 180 L 135 180 L 135 220 L 105 220 L 100 200 L 95 220 L 65 220 Z" fill="#03A9F4" />
                            {/* Legs */}
                            <rect x="75" y="220" width="15" height="40" fill="#FFCCBC" />
                            <rect x="110" y="220" width="15" height="40" fill="#FFCCBC" />
                            {/* Sneakers */}
                            <rect x="65" y="250" width="25" height="15" rx="6" fill="#009688" />
                            <rect x="110" y="250" width="25" height="15" rx="6" fill="#009688" />
                        </g>
                    )}

                    {weather === 'partly-cloudy' && (
                        <g id="clothes-light">
                            {/* Light Shirt */}
                            <path d="M 70 120 L 130 120 L 140 180 L 60 180 Z" fill="#81D4FA" />
                            {/* Light Pants */}
                            <path d="M 60 180 L 140 180 L 135 250 L 105 250 L 100 210 L 95 250 L 65 250 Z" fill="#90A4AE" />
                            {/* Shoes */}
                            <rect x="60" y="245" width="30" height="15" rx="5" fill="#546E7A" />
                            <rect x="110" y="245" width="30" height="15" rx="5" fill="#546E7A" />
                        </g>
                    )}

                    {weather === 'cloudy' && (
                        <g id="clothes-cloudy">
                            {/* Hooded Sweater */}
                            <path d="M 65 110 L 135 110 L 145 190 L 55 190 Z" fill="#8BC34A" />
                            <path d="M 65 110 Q 100 130 135 110" stroke="#689F38" strokeWidth="3" fill="none" />
                            {/* Jeans */}
                            <path d="M 60 190 L 140 190 L 135 250 L 105 250 L 100 210 L 95 250 L 65 250 Z" fill="#1976D2" />
                            {/* Shoes */}
                            <rect x="60" y="245" width="30" height="15" rx="5" fill="#795548" />
                            <rect x="110" y="245" width="30" height="15" rx="5" fill="#795548" />
                        </g>
                    )}

                    {weather === 'rainy' && (
                        <g id="clothes-rainy">
                            {/* Legs (Jeans peeking under coat) */}
                            <rect x="70" y="200" width="18" height="30" fill="#1976D2" />
                            <rect x="112" y="200" width="18" height="30" fill="#1976D2" />
                            {/* Rain Boots */}
                            <path d="M 65 220 L 90 220 L 90 270 L 55 270 L 55 240 Z" fill="#F44336" />
                            <path d="M 110 220 L 135 220 L 145 270 L 110 270 Z" fill="#F44336" />
                            {/* Rain Coat Body */}
                            <path d="M 60 110 L 140 110 L 155 210 L 45 210 Z" fill="#FFCA28" />
                            <path d="M 100 110 L 100 210" stroke="#F57F17" strokeWidth="2" /> {/* Zipper */}
                            {/* Pockets */}
                            <rect x="60" y="160" width="20" height="20" rx="3" fill="#F57F17" opacity="0.6" />
                            <rect x="120" y="160" width="20" height="20" rx="3" fill="#F57F17" opacity="0.6" />
                            {/* Hood Frame (drawn over head) */}
                            <path d="M 50 110 A 50 90 0 0 1 150 110 L 135 110 A 35 75 0 0 0 65 110 Z" fill="#FFCA28" />

                            {/* ☂ Umbrella — WIDE, above the head, held diagonally */}
                            {/* Pole: from right hand diagonally up to dome centre */}
                            <line x1="152" y1="178" x2="105" y2="30" stroke="#4E342E" strokeWidth="6" strokeLinecap="round" />
                            {/* Curved hook at the bottom */}
                            <path d="M 152 178 Q 152 196 168 196" stroke="#4E342E" strokeWidth="6" fill="none" strokeLinecap="round" />
                            {/* Dome — very wide (x=15 to x=195, centre x=105) */}
                            {/* Red base — full dome */}
                            <path d="M 15 32 Q 60 -28 105 -30 Q 150 -28 195 32 Z" fill="#E53935" />
                            {/* Yellow left wedge */}
                            <path d="M 15 32 Q 38 0 62 -16 L 105 24 Z" fill="#FDD835" />
                            {/* Yellow right wedge */}
                            <path d="M 148 -16 Q 172 0 195 32 L 105 24 Z" fill="#FDD835" />
                            {/* Dome rim outline */}
                            <path d="M 15 32 Q 60 -28 105 -30 Q 150 -28 195 32" stroke="#B71C1C" strokeWidth="3" fill="none" />
                            {/* Ribs */}
                            <line x1="105" y1="24" x2="15" y2="32" stroke="#B71C1C" strokeWidth="2" opacity="0.7" />
                            <line x1="105" y1="24" x2="62" y2="-16" stroke="#B71C1C" strokeWidth="2" opacity="0.7" />
                            <line x1="105" y1="24" x2="148" y2="-16" stroke="#B71C1C" strokeWidth="2" opacity="0.7" />
                            <line x1="105" y1="24" x2="195" y2="32" stroke="#B71C1C" strokeWidth="2" opacity="0.7" />
                            {/* Tip */}
                            <circle cx="105" cy="-32" r="5" fill="#4E342E" />
                        </g>
                    )}
                </g>

                {/* Arms and Hands - Drawn last */}
                <g id="arms">
                    {/* Left Arm */}
                    <rect x="50" y="125" width="20" height="60" rx="10"
                        className={`char-arm-left ${isDancing ? 'dancing' : ''}`}
                        key={`arm-left-${animationKey}`}
                        fill={weather === 'rainy' ? '#FFCA28' : weather === 'cloudy' ? '#8BC34A' : weather === 'partly-cloudy' ? '#81D4FA' : '#FFCCBC'}
                    />
                    {/* Right Arm */}
                    <rect x="130" y="125" width="20" height="60" rx="10"
                        className={`char-arm-right ${isDancing ? 'dancing' : ''}`}
                        key={`arm-right-${animationKey}`}
                        fill={weather === 'rainy' ? '#FFCA28' : weather === 'cloudy' ? '#8BC34A' : weather === 'partly-cloudy' ? '#81D4FA' : '#FFCCBC'}
                    />

                    {/* Hands / Cuffs */}
                    {weather !== 'sunny' && weather !== 'partly-cloudy' && (
                        <>
                            <circle cx="45" cy="180" r="8" fill="#FFCCBC" />
                            <circle cx="155" cy="180" r="8" fill="#FFCCBC" />
                        </>
                    )}
                </g>
            </svg>
        </div>
    );
};
