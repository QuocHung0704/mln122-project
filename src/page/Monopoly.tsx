import React, { useState, useEffect, useCallback } from 'react';
// Fix: Import TradeOffer and CasinoBetResult from types.ts
import { Player, GamePhase, Square, SquareType, EventCard, EffectType, TradeOffer, CasinoBetResult } from '../types/type';
import { BOARD_SQUARES, PLAYER_COLORS } from '../../public/constant';
import { THOI_CUOC_CARDS, VAN_MENH_CARDS } from '../config/events';
import GameBoard from '../components/monopoly/GameBoard';
import PlayerInfo from '../components/monopoly/PlayerInfo';
import GameOverModal from '../components/monopoly/GameOverModal';
import RulesModal from '../components/monopoly/RuleModal';
import GameSetup from '../components/monopoly/GameSetup';
import TradeModal from '../components/monopoly/TradeModal';
import RightPanel from '../components/monopoly/RightPanel';
import CasinoModal from '../components/monopoly/CasinoModal';
import EventDrawModal from '../components/monopoly/EventDrawModal';
import PlayerStatusView from '../components/monopoly/PlayerStatusView';
import TutorialGuide from '../components/monopoly/TutorialGuide';
import { TUTORIAL_STEPS } from '../config/TutorialStep';
import SquareInfoModal from '../components/monopoly/SquareInfoModal';
import BoardCustomizer from '../components/monopoly/BoardCustomizer';

// A helper function to shuffle an array, can be placed outside the component
const shuffleDeck = <T,>(deck: T[]): T[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const App: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.SETUP);
    const [dice, setDice] = useState<[number, number]>([1, 1]);
    const [isDiceRolling, setIsDiceRolling] = useState(false);
    const [log, setLog] = useState<string[]>([]);
    const [round, setRound] = useState(1);
    const [showRulesModal, setShowRulesModal] = useState(false);
    const [crisisLevel, setCrisisLevel] = useState(0);
    const [showTradeModal, setShowTradeModal] = useState(false);
    const [tradeOffer, setTradeOffer] = useState<TradeOffer | null>(null);
    const [showCasinoModal, setShowCasinoModal] = useState(false);
    const [showEventDrawModal, setShowEventDrawModal] = useState(false);
    const [activeSquare, setActiveSquare] = useState<Square | null>(null);
    const [currentEvent, setCurrentEvent] = useState<EventCard | null>(null);
    const [viewMode, setViewMode] = useState<'board' | 'status'>('board');
    const [productionFeedback, setProductionFeedback] = useState<{ playerId: number; position: number } | null>(null);
    const [tutorialStep, setTutorialStep] = useState<number | null>(null);
    const [showSquareInfoModal, setShowSquareInfoModal] = useState(false);
    const [board, setBoard] = useState<Square[]>(BOARD_SQUARES);
    const [showBoardCustomizer, setShowBoardCustomizer] = useState(false);
    const [boardLayout, setBoardLayout] = useState({ squareSize: 8, fontSize: 1.1, boardSize: 70, pageBackground: '' });
    const [thoiCuocDeck, setThoiCuocDeck] = useState<EventCard[]>([]);
    const [vanMenhDeck, setVanMenhDeck] = useState<EventCard[]>([]);

    const isTutorialActive = tutorialStep !== null;
    
    useEffect(() => {
        if (boardLayout.pageBackground) {
            document.body.style.backgroundImage = `url(${boardLayout.pageBackground})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundColor = 'transparent'; // Allow background image to show
        } else {
            // Reset to default tiled background from index.html
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundColor = 'var(--color-background)';
        }
    }, [boardLayout.pageBackground]);

    useEffect(() => {
        if (productionFeedback) {
            const timer = setTimeout(() => setProductionFeedback(null), 1500); // Match animation duration
            return () => clearTimeout(timer);
        }
    }, [productionFeedback]);

    const addLog = useCallback((message: string) => {
        setLog(prev => [message, ...prev.slice(0, 49)]);
    }, []);

    const updatePlayerState = useCallback((playerId: number, updates: Partial<Player>) => {
        setPlayers(prevPlayers =>
            prevPlayers.map(p => (p.id === playerId ? { ...p, ...updates } : p))
        );
    }, []);

    const handleStartGame = useCallback((playerConfigs: { name: string; icon: string }[], startWithTutorial: boolean) => {
        const numPlayers = playerConfigs.length;
        const initialPlayers: Player[] = [];
        for (let i = 0; i < numPlayers; i++) {
            initialPlayers.push({
                id: i + 1,
                name: playerConfigs[i].name,
                chips: 50,
                position: 0,
                color: PLAYER_COLORS[i],
                icon: playerConfigs[i].icon,
                hasRawMaterials: false,
                hasLabor: false,
                goodsCount: 0,
                missNextTurn: false,
                combo: { type: 'none', count: 0 },
                stats: {
                    goodsProduced: 0,
                    goodsSold: 0,
                    combosHit: 0,
                    casinoNet: 0,
                    casinoWins: 0,
                    casinoLosses: 0,
                    casinoTotalWagered: 0,
                },
            });
        }
        
        setPlayers(initialPlayers);
        setCurrentPlayerIndex(0);
        setGamePhase(GamePhase.ROLLING);
        setRound(1);
        setCrisisLevel(0);
        setLog(['Trò chơi bắt đầu!']);
        setShowRulesModal(false);
        setThoiCuocDeck(shuffleDeck(THOI_CUOC_CARDS));
        setVanMenhDeck(shuffleDeck(VAN_MENH_CARDS));
        if (startWithTutorial) {
            setTutorialStep(0);
        }
    }, []);

    const handleResetToSetup = () => {
        setPlayers([]);
        setGamePhase(GamePhase.SETUP);
    };
    
    const handleSquareAction = useCallback((player: Player, squareIndex: number) => {
        const square = board[squareIndex];
        addLog(`${player.name} đã đến ô "${square.name}".`);
        
        const COMBO_THRESHOLD = 2;
        const COMBO_BONUS = 10;

        switch (square.type) {
            case SquareType.PRODUCTION:
                setPlayers(prevPlayers => {
                    const pIndex = prevPlayers.findIndex(p => p.id === player.id);
                    if (pIndex === -1) return prevPlayers;
                    const playersCopy = [...prevPlayers];
                    const p = { ...playersCopy[pIndex], stats: { ...playersCopy[pIndex].stats } };
                    
                    if (square.description.includes('Nguyên liệu')) {
                        const cost = 10;
                        if (p.chips >= cost) {
                            p.chips -= cost;
                            p.hasRawMaterials = true;
                            addLog(`${p.name} trả ${cost} chip mua nguyên liệu.`);
                        } else {
                            addLog(`${p.name} không đủ chip mua nguyên liệu.`);
                        }
                    } else if (square.description.includes('Lao động')) {
                        const cost = 5;
                        if (p.chips >= cost) {
                            p.chips -= cost;
                            p.hasLabor = true;
                            addLog(`${p.name} trả ${cost} chip thuê công nhân.`);
                        } else {
                            addLog(`${p.name} không đủ chip thuê công nhân.`);
                        }
                    }
                    
                    let actionTaken = false;
                    if (p.hasRawMaterials && p.hasLabor) {
                        p.hasRawMaterials = false;
                        p.hasLabor = false;
                        p.goodsCount += 1;
                        p.stats.goodsProduced += 1;
                        addLog(`${p.name} đã sản xuất thành công 1 Hàng hóa!`);
                        setProductionFeedback({ playerId: p.id, position: p.position });

                        const newCombo = p.combo.type === 'production'
                            ? { ...p.combo, count: p.combo.count + 1 }
                            : { type: 'production' as const, count: 1 };
                        
                        if (newCombo.count >= COMBO_THRESHOLD) {
                            p.chips += COMBO_BONUS;
                            p.stats.combosHit += 1;
                            addLog(`🔥 ${p.name} nhận được ${COMBO_BONUS} chip thưởng combo sản xuất!`);
                            newCombo.count = 0;
                        }
                        p.combo = newCombo;
                        actionTaken = true;
                    }
                    
                    if (!actionTaken && p.combo.count > 0) {
                        addLog(`${p.name} đã mất chuỗi combo.`);
                        p.combo = { type: 'none', count: 0 };
                    }
                    
                    playersCopy[pIndex] = p;
                    return playersCopy;
                });
                setGamePhase(GamePhase.END_TURN);
                break;

            case SquareType.MARKET:
                setPlayers(prevPlayers => {
                    const pIndex = prevPlayers.findIndex(p => p.id === player.id);
                    if (pIndex === -1) return prevPlayers;
                    const playersCopy = [...prevPlayers];
                    const p = { ...playersCopy[pIndex], stats: { ...playersCopy[pIndex].stats } };
                    
                    if (p.goodsCount > 0) {
                        let profit = 20;
                        
                        p.chips += profit;
                        p.goodsCount -= 1;
                        p.stats.goodsSold += 1;
                        addLog(`${p.name} bán 1 hàng hóa, thu về ${profit} chip!`);

                        const newCombo = p.combo.type === 'market'
                            ? { ...p.combo, count: p.combo.count + 1 }
                            : { type: 'market' as const, count: 1 };
                        
                        if (newCombo.count >= COMBO_THRESHOLD) {
                            p.chips += COMBO_BONUS;
                            p.stats.combosHit += 1;
                            addLog(`🔥 ${p.name} nhận được ${COMBO_BONUS} chip thưởng combo bán hàng!`);
                            newCombo.count = 0;
                        }
                        p.combo = newCombo;
                    } else {
                        addLog(`${p.name} không có hàng hóa để bán.`);
                        if (p.combo.count > 0) {
                            addLog(`${p.name} đã mất chuỗi combo.`);
                            p.combo = { type: 'none', count: 0 };
                        }
                    }
                    playersCopy[pIndex] = p;
                    return playersCopy;
                });
                setGamePhase(GamePhase.END_TURN);
                break;

            case SquareType.CASINO:
                setPlayers(prev => prev.map(p => {
                    if (p.id === player.id && p.combo.count > 0) {
                        addLog(`${p.name} đã mất chuỗi combo khi vào Casino.`);
                        return { ...p, combo: { type: 'none', count: 0 }};
                    }
                    return p;
                }));
                const newCrisisLevel = crisisLevel + 1;
                if (newCrisisLevel >= 10) {
                    addLog(`!!! ĐẠI SUY THOÁI !!!`);
                    addLog(`Tất cả mất 25% tài sản!`);
                    setPlayers(prev => prev.map(p => ({ ...p, chips: Math.floor(p.chips * 0.75) })));
                    setCrisisLevel(0);
                } else {
                    addLog(`Khủng hoảng tăng! ${newCrisisLevel}/10`);
                    setCrisisLevel(newCrisisLevel);
                }
                setShowCasinoModal(true);
                break;
            
            case SquareType.EVENT:
                 setPlayers(prev => prev.map(p => {
                    if (p.id === player.id && p.combo.count > 0) {
                        addLog(`${p.name} đã mất chuỗi combo.`);
                        return { ...p, combo: { type: 'none', count: 0 }};
                    }
                    return p;
                }));
                if (square.subType === 'thoi_cuoc') {
                    const deckCopy = [...thoiCuocDeck];
                    const drawnCard = deckCopy.shift()!; // Take the top card
                    deckCopy.push(drawnCard); // Put it at the bottom
                    setCurrentEvent(drawnCard);
                    setThoiCuocDeck(deckCopy);
                    addLog(`${player.name} rút thẻ Thời Cuộc.`);
                } else { // van_menh
                    const deckCopy = [...vanMenhDeck];
                    const drawnCard = deckCopy.shift()!; // Take the top card
                    deckCopy.push(drawnCard); // Put it at the bottom
                    setCurrentEvent(drawnCard);
                    setVanMenhDeck(deckCopy);
                    addLog(`${player.name} rút thẻ Vận Mệnh.`);
                }
                setShowEventDrawModal(true);
                break;

            case SquareType.CORNER:
                 switch (square.id) {
                    case 7: // Cách Mạng Công Nhân (was 21)
                        addLog("Cách mạng công nhân nổ ra!");
                        setPlayers(prev => {
                            if (prev.length < 2) return prev;
                            const richest = prev.reduce((max, p) => p.chips > max.chips ? p : max, prev[0]);
                            const poorest = prev.reduce((min, p) => p.chips < min.chips ? p : min, prev[0]);

                            if (richest.id !== poorest.id) {
                                addLog(`${richest.name} chia 10 chip cho ${poorest.name}.`);
                                return prev.map(p => {
                                    const comboReset = (p.id === player.id && p.combo.count > 0) ? { combo: { type: 'none' as const, count: 0 } } : {};
                                    if(p.id === player.id && p.combo.count > 0) addLog(`${p.name} đã mất chuỗi combo.`);

                                    if (p.id === richest.id) return {...p, chips: p.chips - 10, ...comboReset};
                                    if (p.id === poorest.id) return {...p, chips: p.chips + 10, ...comboReset};
                                    return {...p, ...comboReset};
                                });
                            }
                            return prev.map(p => {
                                if (p.id === player.id && p.combo.count > 0) {
                                    addLog(`${p.name} đã mất chuỗi combo.`);
                                    return { ...p, combo: { type: 'none' as const, count: 0 }};
                                }
                                return p;
                            });
                        });
                        break;
                    case 21: // Khủng Hoảng Kinh Tế (was 7)
                        addLog(`${player.name} rơi vào khủng hoảng, mất 20 chip!`);
                        setPlayers(prev => prev.map(p => {
                           if (p.id === player.id) {
                               const comboReset = p.combo.count > 0 ? { combo: { type: 'none' as const, count: 0 } } : {};
                               if(p.combo.count > 0) addLog(`${p.name} đã mất chuỗi combo.`);
                               return { ...p, chips: Math.max(0, p.chips - 20), ...comboReset };
                           }
                           return p;
                        }));
                        break;
                    case 14: // Nhà Nước Can Thiệp
                        addLog("Nhà nước can thiệp!");
                        setPlayers(prev => {
                            if (prev.length < 2) return prev;
                            const richest = prev.reduce((max, p) => p.chips > max.chips ? p : max, prev[0]);
                            addLog(`${richest.name}, người giàu nhất, phải trả 10 chip cho Ngân hàng.`);
                            return prev.map(p => {
                                const comboReset = (p.id === player.id && p.combo.count > 0) ? { combo: { type: 'none' as const, count: 0 } } : {};
                                if(p.id === player.id && p.combo.count > 0) addLog(`${p.name} đã mất chuỗi combo.`);
                                if (p.id === richest.id) return { ...p, chips: p.chips - 10, ...comboReset };
                                return {...p, ...comboReset};
                            });
                        });
                        break;
                     default: // Start square
                        setPlayers(prev => prev.map(p => {
                            if (p.id === player.id && p.combo.count > 0) {
                                addLog(`${p.name} đã mất chuỗi combo.`);
                                return { ...p, combo: { type: 'none' as const, count: 0 }};
                            }
                            return p;
                        }));
                 }
                setGamePhase(GamePhase.END_TURN);
                break;
        }
    }, [addLog, crisisLevel, board, thoiCuocDeck, vanMenhDeck]);

    const handleNextTutorialStep = () => {
        if (tutorialStep === null) return;
        if (tutorialStep === TUTORIAL_STEPS.length - 1) {
            setTutorialStep(null);
        } else {
            setTutorialStep(tutorialStep + 1);
        }
    };

    const handleSkipTutorial = () => {
        setTutorialStep(null);
    };

    const handleRollDice = () => {
        if (gamePhase !== GamePhase.ROLLING || isDiceRolling) return;
        
        if (isTutorialActive) {
            const currentStepConfig = TUTORIAL_STEPS[tutorialStep!];
            if (!currentStepConfig.isInteractive || currentStepConfig.highlightId !== 'roll-dice-button') {
                return;
            }
            handleNextTutorialStep();
        }

        const currentPlayer = players[currentPlayerIndex]; // LẤY currentPlayer TRƯỚC
        if (currentPlayer.missNextTurn) {
            updatePlayerState(currentPlayer.id, { missNextTurn: false });
            addLog(`${currentPlayer.name} phải bỏ lượt.`);
            setGamePhase(GamePhase.END_TURN);
            return;
        }
        
        setIsDiceRolling(true);

        setTimeout(() => {
            const d1 = Math.floor(Math.random() * 6) + 1;
            const d2 = Math.floor(Math.random() * 6) + 1;
            const total = d1 + d2;
            
            // CẬP NHẬT GHI LOG VÀ DICE TRƯỚC
            setDice([d1, d2]);
            setIsDiceRolling(false);
            addLog(`${currentPlayer.name} tung được ${total}.`);

            const oldPosition = currentPlayer.position;
            const newPosition = (oldPosition + total) % board.length;
            
            let chipsUpdate = 0;
            if (newPosition < oldPosition) {
                addLog(`${currentPlayer.name} qua vạch đích, nhận 10 chip!`);
                chipsUpdate = 10;
            }

            // 1. Cập nhật state của người chơi
            setPlayers(prevPlayers =>
                prevPlayers.map(p =>
                    p.id === currentPlayer.id
                        ? { ...p, position: newPosition, chips: p.chips + chipsUpdate }
                        : p
                )
            );
            
            const nextSquare = board[newPosition];
            setActiveSquare(nextSquare);
            setShowSquareInfoModal(true);
            setGamePhase(GamePhase.ACTION);

        }, 1000);
    };
    
    const handleEndTurn = () => {
        if (gamePhase !== GamePhase.END_TURN) return;

        if (isTutorialActive) {
            const currentStepConfig = TUTORIAL_STEPS[tutorialStep!];
            if (!currentStepConfig.isInteractive || currentStepConfig.highlightId !== 'end-turn-button') {
                return;
            }
            handleNextTutorialStep();
        }
        
        setActiveSquare(null);
        setCurrentEvent(null);

        let nextPlayerIndex = (currentPlayerIndex + 1) % players.length;

        if (nextPlayerIndex === 0) {
            const nextRound = round + 1;
            if (nextRound > 6) {
                setGamePhase(GamePhase.GAME_OVER);
                addLog("Hết 6 vòng! Trò chơi kết thúc!");
                return;
            }
            setRound(nextRound);
            addLog(`--- Bắt đầu vòng ${nextRound} ---`);
        }

        setCurrentPlayerIndex(nextPlayerIndex);
        setGamePhase(GamePhase.ROLLING);
    };
    
    const handleCasinoResolve = (result: CasinoBetResult | null) => {
        if (!result) {
            setShowCasinoModal(false);
            setGamePhase(GamePhase.END_TURN);
            return;
        }

        const player = players[currentPlayerIndex];
        const { betCost, winnings } = result;
        const netChipChange = winnings - betCost;

        if (winnings === 0) { // Loss
            addLog(`${player.name} thua ${betCost} chip tại Casino.`);
        } else { // Normal win
             addLog(`${player.name} thắng ${netChipChange} chip tại Casino!`);
        }

        setPlayers(prev => prev.map(p => {
            if (p.id === player.id) {
                const updatedPlayer = { 
                    ...p, 
                    stats: { ...p.stats } 
                };

                updatedPlayer.chips += netChipChange;
                updatedPlayer.stats.casinoNet += netChipChange;

                updatedPlayer.stats.casinoTotalWagered += betCost;
                if (winnings > 0) {
                    updatedPlayer.stats.casinoWins += 1;
                } else {
                    updatedPlayer.stats.casinoLosses += 1;
                }
                
                updatedPlayer.chips = Math.max(0, updatedPlayer.chips);
                return updatedPlayer;
            }
            return p;
        }));

        setShowCasinoModal(false);
        setGamePhase(GamePhase.END_TURN);
    }
    
    const handleDrawnEventResolve = () => {
        const player = players[currentPlayerIndex];
        if (!currentEvent) return;
         let logMessage = `Sự kiện: ${currentEvent.title}`;
         switch (currentEvent.effectType) {
            case EffectType.GAIN_CHIPS:
                updatePlayerState(player.id, { chips: player.chips + currentEvent.value });
                break;
            case EffectType.LOSE_CHIPS:
                updatePlayerState(player.id, { chips: Math.max(0, player.chips - currentEvent.value) });
                break;
            case EffectType.MISS_TURN:
                updatePlayerState(player.id, { missNextTurn: true });
                break;
            case EffectType.MOVE_TO:
                updatePlayerState(player.id, { position: currentEvent.value });
                break;
            case EffectType.EVERYONE_GAINS:
                setPlayers(prev => prev.map(p => ({ ...p, chips: p.chips + currentEvent.value })));
                break;
            case EffectType.EVERYONE_LOSES:
                setPlayers(prev => prev.map(p => ({ ...p, chips: Math.max(0, p.chips - currentEvent.value) })));
                break;
            case EffectType.PAY_PLAYER:
                setPlayers(prev => {
                    const richestPlayer = prev.reduce((r, p) => p.chips > r.chips ? p : r, prev[0]);
                    if (richestPlayer.id === player.id) return prev;
                    return prev.map(p => {
                        if (p.id === richestPlayer.id) return { ...p, chips: Math.max(0, p.chips - currentEvent.value) };
                        if (p.id === player.id) return { ...p, chips: p.chips + currentEvent.value };
                        return p;
                    })
                });
                break;
        }
        addLog(logMessage);
        setShowEventDrawModal(false);
        setGamePhase(GamePhase.END_TURN);
    }

    const handleCloseSquareInfoModal = () => {
        setShowSquareInfoModal(false);
        const currentPlayer = players[currentPlayerIndex];
        if (activeSquare) {
            handleSquareAction(currentPlayer, activeSquare.id);
        } else {
            // Failsafe, shouldn't happen
            setGamePhase(GamePhase.END_TURN);
        }
    };

    // --- Trade Handlers ---
    const handleInitiateTrade = (partnerId: number) => {
        const currentPlayer = players[currentPlayerIndex];
        const partner = players.find(p => p.id === partnerId);
        if (!partner || isTutorialActive) return;
        setTradeOffer({
            fromPlayerId: currentPlayer.id,
            toPlayerId: partnerId,
            offer: { chips: 0, hasRawMaterials: false, hasLabor: false },
            request: { chips: 0, hasRawMaterials: false, hasLabor: false },
        });
        setShowTradeModal(true);
        // Fix: Use TRADING GamePhase
        setGamePhase(GamePhase.TRADING);
        addLog(`🤝 ${currentPlayer.name} mời ${partner.name} giao dịch.`);
    };
    const handleCancelTrade = () => {
        if(tradeOffer) {
            const proposer = players.find(p => p.id === tradeOffer.fromPlayerId);
            const partner = players.find(p => p.id === tradeOffer.toPlayerId);
            addLog(`🚫 Giao dịch giữa ${proposer?.name} & ${partner?.name} đã bị hủy.`);
        }
        setShowTradeModal(false);
        setTradeOffer(null);
        setGamePhase(GamePhase.ROLLING);
    };
    const handleProposeTrade = (proposal: { offer: TradeOffer['offer'], request: TradeOffer['request'] }) => {
        if (!tradeOffer) return;
        setTradeOffer({ ...tradeOffer, ...proposal });
    };
    const handleAcceptTrade = () => {
        if (!tradeOffer) return;
        const { fromPlayerId, toPlayerId, offer, request } = tradeOffer;
        
        const proposer = players.find(p => p.id === fromPlayerId);
        const partner = players.find(p => p.id === toPlayerId);
    
        setPlayers(prev => {
            const playersCopy = [...prev];
            const p1Index = playersCopy.findIndex(p => p.id === fromPlayerId);
            const p2Index = playersCopy.findIndex(p => p.id === toPlayerId);
    
            if (p1Index === -1 || p2Index === -1) return prev;
    
            let p1 = { ...playersCopy[p1Index] };
            let p2 = { ...playersCopy[p2Index] };
    
            p1.chips = p1.chips - offer.chips + request.chips;
            p2.chips = p2.chips + offer.chips - request.chips;
    
            if (offer.hasRawMaterials) { p1.hasRawMaterials = false; p2.hasRawMaterials = true; }
            if (request.hasRawMaterials) { p1.hasRawMaterials = true; p2.hasRawMaterials = false; }
            if (offer.hasLabor) { p1.hasLabor = false; p2.hasLabor = true; }
            if (request.hasLabor) { p1.hasLabor = true; p2.hasLabor = false; }
    
            if (p1.hasRawMaterials && p1.hasLabor) {
                addLog(`${p1.name} sản xuất sau giao dịch!`);
                p1 = { ...p1, hasRawMaterials: false, hasLabor: false, goodsCount: p1.goodsCount + 1 };
            }
            if (p2.hasRawMaterials && p2.hasLabor) {
                addLog(`${p2.name} sản xuất sau giao dịch!`);
                p2 = { ...p2, hasRawMaterials: false, hasLabor: false, goodsCount: p2.goodsCount + 1 };
            }
            
            playersCopy[p1Index] = p1;
            playersCopy[p2Index] = p2;
    
            return playersCopy;
        });
    
        addLog(`✅ Giao dịch thành công giữa ${proposer?.name} & ${partner?.name}!`);
        setShowTradeModal(false);
        setTradeOffer(null);
        setGamePhase(GamePhase.ROLLING);
    };
    const handleRejectTrade = () => {
        if (!tradeOffer) return;
        const proposer = players.find(p => p.id === tradeOffer.fromPlayerId);
        const partner = players.find(p => p.id === tradeOffer.toPlayerId);
        addLog(`❌ ${partner?.name} từ chối giao dịch của ${proposer?.name}.`);
        setShowTradeModal(false);
        setTradeOffer(null);
        setGamePhase(GamePhase.ROLLING);
    };
    
    const handleToggleView = () => {
        setViewMode(prev => prev === 'board' ? 'status' : 'board');
    }

    if (gamePhase === GamePhase.SETUP) {
        return <GameSetup onStartGame={handleStartGame} />;
    }

    return (
        <div id="app-container" className="w-full h-full p-4 lg:grid lg:grid-cols-[350px_1fr_350px] gap-4 items-start">
            <PlayerInfo 
                players={players} 
                currentPlayerIndex={currentPlayerIndex} 
                gamePhase={gamePhase} 
                onInitiateTrade={handleInitiateTrade}
            />
            
            {/* SỬA LẠI THẺ <main> THÀNH <div> VÀ BỎ h-full */}
            <div className="w-full flex items-center justify-center">
                 {viewMode === 'board' ? (
                    <GameBoard
                        board={board}
                        players={players}
                        productionFeedback={productionFeedback}
                        currentPlayerId={players[currentPlayerIndex].id}
                        layout={boardLayout}
                    />
                 ) : (
                    <PlayerStatusView players={players} />
                 )}
            </div>
            
            <RightPanel 
                round={round}
                crisisLevel={crisisLevel}
                log={log}
                dice={dice}
                isDiceRolling={isDiceRolling}
                onRollDice={handleRollDice}
                onEndTurn={handleEndTurn}
                gamePhase={gamePhase}
                currentPlayer={players[currentPlayerIndex]}
                onShowRules={() => setShowRulesModal(true)}
                viewMode={viewMode}
                onToggleView={handleToggleView}
                onShowCustomizer={() => setShowBoardCustomizer(true)}
            />
            
            {showSquareInfoModal && activeSquare && (
                <SquareInfoModal square={activeSquare} onClose={handleCloseSquareInfoModal} />
            )}
            {showCasinoModal && activeSquare && (
                <CasinoModal 
                    square={activeSquare}
                    player={players[currentPlayerIndex]}
                    onClose={handleCasinoResolve}
                />
            )}
             {showEventDrawModal && currentEvent && activeSquare?.subType && (
                <EventDrawModal
                    event={currentEvent}
                    squareSubType={activeSquare.subType}
                    onClose={handleDrawnEventResolve}
                />
            )}
            {gamePhase === GamePhase.GAME_OVER && (
                <GameOverModal players={players} onPlayAgain={handleResetToSetup} />
            )}
             {showRulesModal && (
                <RulesModal onClose={() => setShowRulesModal(false)} />
            )}
            {showBoardCustomizer && (
                <BoardCustomizer 
                    board={board}
                    layout={boardLayout}
                    onSave={(newBoard, newLayout) => {
                        setBoard(newBoard);
                        setBoardLayout(newLayout);
                        setShowBoardCustomizer(false);
                    }}
                    onClose={() => setShowBoardCustomizer(false)}
                />
            )}
            {showTradeModal && tradeOffer && (
                <TradeModal 
                    proposer={players.find(p => p.id === tradeOffer.fromPlayerId)!}
                    partner={players.find(p => p.id === tradeOffer.toPlayerId)!}
                    onPropose={handleProposeTrade}
                    onAccept={handleAcceptTrade}
                    onReject={handleRejectTrade}
                    onCancel={handleCancelTrade}
                    tradeOffer={tradeOffer}
                />
            )}
            {isTutorialActive && (
                <TutorialGuide
                    step={tutorialStep}
                    onNext={handleNextTutorialStep}
                    onSkip={handleSkipTutorial}
                />
            )}
        </div>
    );
};

export default App;