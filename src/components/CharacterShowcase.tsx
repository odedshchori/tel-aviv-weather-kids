import type { FC } from 'react';
import { Character, type CharacterVariant } from './Character';
import type { WeatherType } from './WeatherIcon';
import { Background } from './Background';

interface CharacterShowcaseProps {
    onBack: () => void;
}

const weatherStates: { type: WeatherType; label: string; emoji: string }[] = [
    { type: 'sunny', label: 'שמשי', emoji: '☀️' },
    { type: 'partly-cloudy', label: 'מעונן חלקית', emoji: '⛅' },
    { type: 'cloudy', label: 'מעונן', emoji: '☁️' },
    { type: 'rainy', label: 'גשום', emoji: '🌧️' },
];

export const CharacterShowcase: FC<CharacterShowcaseProps> = ({ onBack }) => {
    return (
        <div dir="rtl" style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            fontFamily: "'Inter', sans-serif",
            overflowY: 'auto',
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', width: '100%', maxWidth: '1000px' }}>
                <button
                    onClick={onBack}
                    style={{
                        padding: '0.6rem 1.4rem',
                        borderRadius: '12px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        background: 'rgba(255,255,255,0.1)',
                        color: '#fff',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                >
                    ← חזרה
                </button>
                <div>
                    <h1 style={{ color: '#fff', margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>
                        🛠️ Character Showcase  —  DEV
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '0.85rem' }}>
                        All character states rendered side by side for review
                    </p>
                </div>
            </div>

            {/* Characters Section */}
            <h2 style={{ color: '#fff', fontSize: '1.5rem', alignSelf: 'flex-start', marginLeft: '10%' }}>Character Variants</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '2.5rem',
                width: '100%',
                maxWidth: '1100px',
                marginBottom: '4rem'
            }}>
                {(['boy', 'girl', 'beanie', 'ponytail'] as CharacterVariant[]).map(variant =>
                    weatherStates.map(({ type, label, emoji }) => (
                        <div key={`${variant}-${type}`} style={{
                            background: 'rgba(255,255,255,0.07)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '20px',
                            padding: '2rem 1.5rem 1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem',
                            backdropFilter: 'blur(8px)',
                        }}>
                            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                                {emoji} {label}
                            </div>

                            <div style={{ overflow: 'visible', paddingTop: '40px' }}>
                                <Character weather={type} variant={variant} />
                            </div>

                            <code style={{ background: 'rgba(0,0,0,0.4)', color: '#79c0ff', padding: '0.3rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem' }}>
                                {variant} - {type}
                            </code>
                        </div>
                    ))
                )}
            </div>

            {/* Backgrounds Section */}
            <h2 style={{ color: '#fff', fontSize: '1.5rem', alignSelf: 'flex-start', marginLeft: '10%' }}>Backgrounds</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '2.5rem',
                width: '100%',
                maxWidth: '1100px',
            }}>
                {weatherStates.map(({ type, label, emoji }) => (
                    <div key={`bg-${type}`} style={{
                        position: 'relative',
                        height: '300px',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.3)',
                        // Using the CSS variable matching what we added to App.css
                        background: `var(--color-sky-${type === 'sunny' || type === 'partly-cloudy' ? 'clear' : type})`
                    }}>
                        <Background weather={type} />
                        <div style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            padding: '0.5rem 1rem',
                            background: 'rgba(0,0,0,0.5)',
                            color: '#fff',
                            borderRadius: '10px',
                            backdropFilter: 'blur(4px)',
                            fontWeight: 700,
                            zIndex: 10
                        }}>
                            {emoji} {label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
