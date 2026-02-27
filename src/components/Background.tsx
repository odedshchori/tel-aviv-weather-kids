import type { FC } from 'react';

// Hardcoded Tel Aviv Background
export const Background: FC = () => {
    return (
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100vw', height: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>

            {/* Tel Aviv Beach / Sea Line - Positioned lower to avoid crowding mobile screens */}
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
        </div>
    );
};
