import React, { useState, useEffect } from 'react';
import { EventCard } from '../../types/type';

interface EventDrawModalProps {
    event: EventCard;
    squareSubType: 'thoi_cuoc' | 'van_menh';
    onClose: () => void;
}

const EventDrawModal: React.FC<EventDrawModalProps> = ({ event, squareSubType, onClose }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const cardBackClass = squareSubType === 'thoi_cuoc' ? 'bg-yellow-400' : 'bg-green-500';
    const cardFrontClass = 'bg-white';
    const cardTitle = squareSubType === 'thoi_cuoc' ? 'THỜI CUỘC' : 'VẬN MỆNH';

    const handleDraw = () => {
        if (isFlipped) return;
        setIsFlipped(true);
    };

    useEffect(() => {
        if (isFlipped) {
            // Delay showing the button to allow the player to read the card
            const timer = setTimeout(() => {
                setShowButton(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isFlipped]);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-sm mx-4 flex flex-col items-center animate-scale-in">
                {/* Card Element */}
                <div className="w-full h-80 perspective-1000">
                    <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                        <div className={`card-face card-back border-4 border-black flex flex-col items-center justify-center p-6 text-center ${cardBackClass}`}>
                            <h2 className="text-3xl font-pixel text-white text-shadow">{cardTitle}</h2>
                            <div className="text-8xl my-4 text-white text-shadow">?</div>
                        </div>
                        {/* Card Front */}
                        <div className={`card-face card-front pixel-panel p-6 text-center flex flex-col justify-center ${cardFrontClass}`}>
                             <h3 className="font-bold text-lg text-black">{event.title}</h3>
                             <p className="text-sm my-4 text-gray-700 flex-grow flex items-center justify-center">{event.description}</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="h-20 mt-4 flex items-center">
                    {!isFlipped ? (
                        <button onClick={handleDraw} className="pixel-button-color bg-cyan-500 text-white font-pixel py-3 px-8 text-lg">
                            Rút Thẻ
                        </button>
                    ) : (
                         showButton && (
                            <button onClick={onClose} className="pixel-button-color bg-green-500 text-white font-pixel py-3 px-8 text-lg animate-scale-in">
                                OK
                            </button>
                         )
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDrawModal;