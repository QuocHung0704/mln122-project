import React from 'react';
import { EventCard } from '../../type';

interface EventCardModalProps {
    event: EventCard;
    onClose: () => void;
}

const EventCardModal: React.FC<EventCardModalProps> = ({ event, onClose }) => {
    return (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="pixel-panel p-6 text-center w-full max-w-sm mx-4">
                <h2 className="text-2xl font-pixel text-cyan-600 mb-2">SỰ KIỆN</h2>
                
                <div className="pixel-panel-inset p-6 my-4 bg-white">
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <p className="text-sm my-4 text-gray-700 min-h-[50px]">{event.description}</p>
                </div>
                
                <button 
                    onClick={onClose} 
                    className="w-full pixel-button-color bg-cyan-500 text-white font-pixel py-3 text-lg"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default EventCardModal;