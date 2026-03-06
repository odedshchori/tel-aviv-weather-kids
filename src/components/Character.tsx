import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import type { WeatherType } from './WeatherIcon';

// Animal Assets
import elephantSunnyImg from '../assets/elephant_sunny.png';
import elephantPartlyCloudyImg from '../assets/elephant_partly-cloudy.png';
import elephantCloudyImg from '../assets/elephant_cloudy.png';
import elephantRainyImg from '../assets/elephant_rainy.png';

import giraffeSunnyImg from '../assets/giraffe_sunny.png';
import giraffePartlyCloudyImg from '../assets/giraffe_partly-cloudy.png';
import giraffeCloudyImg from '../assets/giraffe_cloudy.png';
import giraffeRainyImg from '../assets/giraffe_rainy.png';

import meerkatSunnyImg from '../assets/meerkat_sunny.png';
import meerkatPartlyCloudyImg from '../assets/meerkat_partly-cloudy.png';
import meerkatCloudyImg from '../assets/meerkat_cloudy.png';
import meerkatRainyImg from '../assets/meerkat_rainy.png';

import flamingoSunnyImg from '../assets/flamingo_sunny.png';
import flamingoPartlyCloudyImg from '../assets/flamingo_partly-cloudy.png';
import flamingoCloudyImg from '../assets/flamingo_cloudy.png';
import flamingoRainyImg from '../assets/flamingo_rainy.png';

export type CharacterVariant = 'elephant' | 'giraffe' | 'meerkat' | 'flamingo';

interface CharacterProps {
    weather: WeatherType;
    className?: string;
    variant?: CharacterVariant;
}

export const Character: FC<CharacterProps> = ({ weather, className = '', variant = 'elephant' }) => {
    const [processedImg, setProcessedImg] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const getRealisticImg = () => {
        const v = variant as CharacterVariant;
        if (v === 'elephant') {
            switch (weather) {
                case 'sunny': return elephantSunnyImg;
                case 'partly-cloudy': return elephantPartlyCloudyImg;
                case 'cloudy': return elephantCloudyImg;
                case 'rainy': return elephantRainyImg;
                default: return elephantSunnyImg;
            }
        } else if (v === 'giraffe') {
            switch (weather) {
                case 'sunny': return giraffeSunnyImg;
                case 'partly-cloudy': return giraffePartlyCloudyImg;
                case 'cloudy': return giraffeCloudyImg;
                case 'rainy': return giraffeRainyImg;
                default: return giraffeSunnyImg;
            }
        } else if (v === 'meerkat') {
            switch (weather) {
                case 'sunny': return meerkatSunnyImg;
                case 'partly-cloudy': return meerkatPartlyCloudyImg;
                case 'cloudy': return meerkatCloudyImg;
                case 'rainy': return meerkatRainyImg;
                default: return meerkatSunnyImg;
            }
        } else if (v === 'flamingo') {
            switch (weather) {
                case 'sunny': return flamingoSunnyImg;
                case 'partly-cloudy': return flamingoPartlyCloudyImg;
                case 'cloudy': return flamingoCloudyImg;
                case 'rainy': return flamingoRainyImg;
                default: return flamingoSunnyImg;
            }
        }
        return elephantSunnyImg;
    };

    // Background removal logic using Canvas
    useEffect(() => {
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

                // Simple white background removal
                const brightness = (r + g + b) / 3;
                const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));

                // If very bright and very neutral, it's likely the background
                if (brightness > 240 && diff < 10) {
                    data[i + 3] = 0;
                }
            }

            ctx.putImageData(imageData, 0, 0);
            setProcessedImg(canvas.toDataURL());
        };
        return () => {
            img.onload = null;
        };
    }, [weather, variant]);

    return (
        <div className={`character-wrapper ${className}`}>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {processedImg ? (
                <img
                    src={processedImg}
                    alt={`${variant} in ${weather} weather`}
                    className={`realistic-character ${weather}-realistic ${variant}-realistic`}
                />
            ) : (
                <div className="loading-character">טוען...</div>
            )}
        </div>
    );
};
