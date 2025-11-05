
import React, { useState } from 'react';
import { Square, SquareType } from '../../types/type';
import { BOARD_SQUARES } from '../../../public/constant';

interface BoardCustomizerProps {
    board: Square[];
    layout: { squareSize: number; fontSize: number; boardSize: number; pageBackground: string; };
    onSave: (newBoard: Square[], newLayout: { squareSize: number; fontSize: number; boardSize: number; pageBackground: string; }) => void;
    onClose: () => void;
}

const PALETTE = {
  PINK: '#ec4899', CYAN: '#22d3ee', ORANGE: '#f97316', LIME: '#84cc16',
  RED: '#dc2626', YELLOW: '#f59e0b', BLUE: '#6366f1', PURPLE: '#a855f7',
  GRAY: '#6b7280', TEAL: '#14b8a6', EMERALD: '#10b981', SKY: '#38bdf8',
};
const COLOR_OPTIONS = Object.values(PALETTE);
const ICON_OPTIONS = ['🏁','🏭','👷','❓','💰','🎲','💸','📉','✊','⚖️', '📈', '🏠', '🎁', '⚡️', '🔥', '🏦', '✈️', '🚢', '🛒', '📦', '🎁', '💡', '🔔', '🚀', '🎯', '✨'];

// Helper components for consistent UI
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="pixel-panel-inset p-3">
        <h4 className="font-pixel text-sm mb-3 text-center text-gray-700 uppercase tracking-wider">{title}</h4>
        <div className="space-y-3">{children}</div>
    </div>
);

const Field: React.FC<{ label: string; htmlFor?: string; children: React.ReactNode }> = ({ label, htmlFor, children }) => (
    <div>
        <label htmlFor={htmlFor} className="font-pixel text-xs mb-1 block text-gray-600">{label}</label>
        {children}
    </div>
);

const BoardCustomizer: React.FC<BoardCustomizerProps> = ({ board, layout, onSave, onClose }) => {
    const [editingBoard, setEditingBoard] = useState<Square[]>(() => JSON.parse(JSON.stringify(board)));
    const [selectedSquareId, setSelectedSquareId] = useState<number | null>(0);
    const [layoutSettings, setLayoutSettings] = useState(layout);

    const selectedSquare = editingBoard.find(s => s.id === selectedSquareId);

    const handleUpdateSquare = (id: number, updates: Partial<Square>) => {
        setEditingBoard(currentBoard =>
            currentBoard.map(s => (s.id === id ? { ...s, ...updates } : s))
        );
    };

    const handleMultiplierChange = (key: 'win' | 'bigWin', value: string) => {
        if (!selectedSquare) return;
        const currentMultipliers = selectedSquare.multipliers || { win: 2, bigWin: 3 };
        const newMultipliers = {
            ...currentMultipliers,
            [key]: parseFloat(value) || 0,
        };
        handleUpdateSquare(selectedSquare.id, { multipliers: newMultipliers });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="pixel-panel p-4 w-full max-w-4xl mx-4 flex flex-col h-[90vh] animate-scale-in">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-black">
                    <h2 className="text-2xl font-pixel text-black">BOARD CUSTOMIZER</h2>
                    <button onClick={onClose} className="w-10 h-10 pixel-button-color bg-red-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                {/* Main Content */}
                <div className="flex-grow grid grid-cols-3 gap-4 overflow-hidden">
                    {/* Column 1: Square List */}
                    <div className="flex flex-col h-full overflow-y-auto pixel-panel-inset p-2">
                        {editingBoard.map(square => (
                            <button
                                key={square.id}
                                onClick={() => setSelectedSquareId(square.id)}
                                className={`p-2 text-left w-full rounded text-sm font-bold truncate ${selectedSquareId === square.id ? 'bg-yellow-300' : 'hover:bg-yellow-100'}`}
                            >
                                #{square.id + 1}: {square.name}
                            </button>
                        ))}
                    </div>
                    {/* Column 2: Editor Panel */}
                    <div className="col-span-2 flex flex-col h-full overflow-y-auto space-y-4 pr-2">
                        <Section title="Global Layout">
                            <Field label="URL Hình nền Trang" htmlFor="page-bg-url">
                                <input id="page-bg-url" type="text" value={layoutSettings.pageBackground} onChange={e => setLayoutSettings({...layoutSettings, pageBackground: e.target.value})} className="w-full pixel-panel-inset px-3 py-2 text-sm" />
                            </Field>
                            <Field label={`Kích thước bàn cờ: ${layoutSettings.boardSize}vh`}>
                                <input type="range" min="40" max="100" step="1" value={layoutSettings.boardSize} onChange={e => setLayoutSettings({...layoutSettings, boardSize: parseInt(e.target.value)})} className="w-full" />
                            </Field>
                            <Field label={`Kích thước ô: ${layoutSettings.squareSize}%`}>
                                <input type="range" min="6" max="12" step="0.5" value={layoutSettings.squareSize} onChange={e => setLayoutSettings({...layoutSettings, squareSize: parseFloat(e.target.value)})} className="w-full" />
                            </Field>
                            <Field label={`Cỡ chữ: ${layoutSettings.fontSize}vh`}>
                                <input type="range" min="0.8" max="2" step="0.1" value={layoutSettings.fontSize} onChange={e => setLayoutSettings({...layoutSettings, fontSize: parseFloat(e.target.value)})} className="w-full" />
                            </Field>
                        </Section>
                        
                        {selectedSquare ? (
                            <>
                                <Section title={`Editing: #${selectedSquare.id + 1} ${selectedSquare.name}`}>
                                    <Field label="Tên ô" htmlFor="square-name">
                                        <input id="square-name" type="text" value={selectedSquare.name} onChange={e => handleUpdateSquare(selectedSquare.id, { name: e.target.value })} className="w-full pixel-panel-inset px-3 py-2 text-sm" />
                                    </Field>
                                    <Field label="Mô tả" htmlFor="square-desc">
                                        <textarea id="square-desc" value={selectedSquare.description} onChange={e => handleUpdateSquare(selectedSquare.id, { description: e.target.value })} rows={3} className="w-full pixel-panel-inset px-3 py-2 text-sm" />
                                    </Field>
                                </Section>
                                <Section title="Visuals">
                                     <Field label="Màu Banner">
                                        <div className="grid grid-cols-8 gap-1">
                                            {COLOR_OPTIONS.map(c => <button key={c} onClick={() => handleUpdateSquare(selectedSquare.id, { color: c })} className={`w-full h-8 rounded ${selectedSquare.color === c ? 'ring-2 ring-offset-2 ring-black' : ''}`} style={{ backgroundColor: c }} />)}
                                        </div>
                                    </Field>
                                    <Field label="URL Hình nền" htmlFor="square-bg-url">
                                        <input id="square-bg-url" type="text" value={selectedSquare.backgroundUrl || ''} onChange={e => handleUpdateSquare(selectedSquare.id, { backgroundUrl: e.target.value })} className="w-full pixel-panel-inset px-3 py-2 text-sm" />
                                    </Field>
                                    <Field label="Icon">
                                        <div className="grid grid-cols-8 gap-1">
                                            {ICON_OPTIONS.map(i => <button key={i} onClick={() => handleUpdateSquare(selectedSquare.id, { icon: i })} className={`text-2xl rounded p-1 ${selectedSquare.icon === i ? 'bg-yellow-300' : 'hover:bg-yellow-100'}`}>{i}</button>)}
                                        </div>
                                    </Field>
                                </Section>
                                {selectedSquare.type === SquareType.CASINO && (
                                    <Section title="Casino Settings">
                                        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                                            <Field label="Hệ số Thắng"><input type="number" step="0.1" value={selectedSquare.multipliers?.win} onChange={e => handleMultiplierChange('win', e.target.value)} className="w-full pixel-panel-inset px-3 py-2 text-sm" /></Field>
                                            <Field label="Hệ số Thắng Lớn"><input type="number" step="0.1" value={selectedSquare.multipliers?.bigWin} onChange={e => handleMultiplierChange('bigWin', e.target.value)} className="w-full pixel-panel-inset px-3 py-2 text-sm" /></Field>
                                        </div>
                                    </Section>
                                )}
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500 font-pixel">SELECT A SQUARE TO EDIT</div>
                        )}
                    </div>
                </div>
                {/* Footer */}
                <div className="flex gap-4 mt-4 pt-4 border-t-2 border-black">
                    <button onClick={() => { setEditingBoard(BOARD_SQUARES); setLayoutSettings({ squareSize: 8, fontSize: 1.1, boardSize: 70, pageBackground: '' }); }} className="flex-1 pixel-button font-pixel py-3 px-4 text-lg">RESET TO DEFAULT</button>
                    <button onClick={() => onSave(editingBoard, layoutSettings)} className="flex-1 pixel-button-color bg-green-500 text-white font-pixel py-3 px-4 text-lg">SAVE & CLOSE</button>
                </div>
            </div>
        </div>
    );
};

export default BoardCustomizer;