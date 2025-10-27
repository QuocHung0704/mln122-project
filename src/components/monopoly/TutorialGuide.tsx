import React, { useState, useLayoutEffect } from 'react';
import { TUTORIAL_STEPS } from '../../config/TutorialStep';

interface TutorialGuideProps {
    step: number;
    onNext: () => void;
    onSkip: () => void;
}

const TutorialGuide: React.FC<TutorialGuideProps> = ({ step, onNext, onSkip }) => {
    const [highlightBox, setHighlightBox] = useState<DOMRect | null>(null);
    
    const currentStepConfig = TUTORIAL_STEPS[step];

    useLayoutEffect(() => {
        if (currentStepConfig.highlightId) {
            const elem = document.getElementById(currentStepConfig.highlightId);
            if (elem) {
                // Add a small delay for CSS transitions to catch up
                setTimeout(() => setHighlightBox(elem.getBoundingClientRect()), 50);
            } else {
                setHighlightBox(null);
            }
        } else {
            setHighlightBox(null);
        }
    }, [step, currentStepConfig.highlightId]);

    const PADDING = 10;
    
    const highlightStyle: React.CSSProperties = highlightBox ? {
        position: 'fixed',
        left: `${highlightBox.left - PADDING}px`,
        top: `${highlightBox.top - PADDING}px`,
        width: `${highlightBox.width + PADDING * 2}px`,
        height: `${highlightBox.height + PADDING * 2}px`,
        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
        borderRadius: '8px',
        transition: 'all 0.3s ease-in-out',
        zIndex: 1000,
        pointerEvents: currentStepConfig.isInteractive ? 'auto' : 'none',
    } : {};
    
    const popupStyle: React.CSSProperties = {
        position: 'fixed',
        zIndex: 1001,
        transition: 'all 0.3s ease-in-out',
        pointerEvents: 'auto',
    };

    if (highlightBox) {
        const spaceBelow = window.innerHeight - highlightBox.bottom;
        if (spaceBelow > 200) {
             popupStyle.top = `${highlightBox.bottom + PADDING}px`;
             popupStyle.left = `${highlightBox.left}px`;
        } else {
             popupStyle.bottom = `${window.innerHeight - highlightBox.top + PADDING}px`;
             popupStyle.left = `${highlightBox.left}px`;
        }
        popupStyle.maxWidth = '350px';
        if (highlightBox.left + 350 > window.innerWidth) {
            popupStyle.left = 'auto';
            popupStyle.right = `${PADDING}px`;
        }
    } else {
        popupStyle.top = '50%';
        popupStyle.left = '50%';
        popupStyle.transform = 'translate(-50%, -50%)';
    }

    return (
        <div className="fixed inset-0 z-[999]" style={{ pointerEvents: 'none' }}>
            <div style={highlightStyle}></div>
            
            {!currentStepConfig.isInteractive && 
                <div 
                    className="fixed inset-0 z-[998]"
                    style={{backgroundColor: highlightBox ? 'transparent' : 'rgba(0,0,0,0.6)', pointerEvents: 'auto'}}
                ></div>
            }
            
            <div style={popupStyle} className="pixel-panel p-4 w-full max-w-sm">
                 <h3 className="font-pixel text-xl mb-2 text-yellow-500">{currentStepConfig.title}</h3>
                 <p className="text-sm mb-4">{currentStepConfig.content}</p>
                 <div className="flex justify-between items-center">
                    <button onClick={onSkip} className="font-pixel text-xs text-gray-500 hover:underline">
                        Bỏ qua
                    </button>
                    <div className="flex items-center gap-2">
                         <span className="text-xs font-pixel">{step + 1} / {TUTORIAL_STEPS.length}</span>
                         {!currentStepConfig.isInteractive && (
                            <button onClick={onNext} className="pixel-button-color bg-cyan-500 text-white font-pixel px-4 py-2 text-sm">
                                {step === TUTORIAL_STEPS.length - 1 ? 'KẾT THÚC' : 'TIẾP'}
                            </button>
                         )}
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default TutorialGuide;
