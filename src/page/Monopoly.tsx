import React, { useState, useEffect, useCallback } from 'react';
import { Player, GamePhase, Square, SquareType, EventCard, EffectType, TradeOffer } from '../types/type';
import { BOARD_SQUARES, PLAYER_COLORS } from '../config/constant';
import { EVENT_CARDS } from '../config/events';
import GameBoard from '../components/monopoly/GameBoard';
import PlayerInfo from '../components/monopoly/PlayerInfo';
import GameOverModal from '../components/monopoly/GameOverModal';
import RulesModal from '../components/monopoly/RuleModal';
import GameSetup from '../components/monopoly/GameSetup';
import TradeModal from '../components/monopoly/TradeModal';
import RightPanel from '../components/monopoly/RightPanel';
import CasinoModal from '../components/monopoly/CasinoModal';
import EventCardModal from '../components/monopoly/EventCardModal';
import PlayerStatusView from '../components/monopoly/PlayerStatusView';
import TutorialGuide from '../components/monopoly/TutorialGuide';
import { TUTORIAL_STEPS } from '../config/TutorialStep';

interface CasinoBetResult {
    betCost: number;
    winnings: number;
    jackpotWon: boolean;
}

const Monopoly: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.SETUP);
    const [dice, setDice] = useState<[number, number]>([1, 1]);
    const [isDiceRolling, setIsDiceRolling] = useState(false);
    const [log, setLog] = useState<string[]>([]);
    const [tradeLog, setTradeLog] = useState<string[]>([]);
    const [round, setRound] = useState(1);
    const [showRulesModal, setShowRulesModal] = useState(false);
    const [crisisLevel, setCrisisLevel] = useState(0);
    const [jackpot, setJackpot] = useState(20);
    const [showTradeModal, setShowTradeModal] = useState(false);
    const [tradeOffer, setTradeOffer] = useState<TradeOffer | null>(null);
    const [showCasinoModal, setShowCasinoModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const [activeSquare, setActiveSquare] = useState<Square | null>(null);
    const [currentEvent, setCurrentEvent] = useState<EventCard | null>(null);
    const [viewMode, setViewMode] = useState<'board' | 'status'>('board');
    const [productionFeedback, setProductionFeedback] = useState<{ playerId: number; position: number } | null>(null);
    const [tutorialStep, setTutorialStep] = useState<number | null>(null);

    const isTutorialActive = tutorialStep !== null;

    useEffect(() => {
        if (productionFeedback) {
            const timer = setTimeout(() => setProductionFeedback(null), 1500); // Match animation duration
            return () => clearTimeout(timer);
        }
    }, [productionFeedback]);

    const addLog = useCallback((message: string) => {
        setLog(prev => [message, ...prev.slice(0, 49)]);
    }, []);

    const addTradeLog = useCallback((message: string) => {
        setTradeLog(prev => [message, ...prev.slice(0, 49)]);
    }, []);

    const updatePlayerState = useCallback((playerId: number, updates: Partial<Player>) => {
        setPlayers(prevPlayers =>
            prevPlayers.map(p => (p.id === playerId ? { ...p, ...updates } : p))
        );
    }, []);

    const handleStartGame = useCallback(
        (
          numPlayers: number,
          playerNames: string[],
          playerCharacters: string[], 
          startWithTutorial: boolean,
        ) => {
          const initialPlayers: Player[] = [];
          for (let i = 0; i < numPlayers; i++) {
            initialPlayers.push({
              id: i + 1,
              name: playerNames[i] || `Tư Bản ${i + 1}`,
              chips: 50,
              position: 0,
              color: PLAYER_COLORS[i],
              icon: playerCharacters[i], 
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
                jackpotsWon: 0,
              },
            });
          }
    
          setPlayers(initialPlayers);
          setCurrentPlayerIndex(0);
          setGamePhase(GamePhase.ROLLING);
          setRound(1);
          setCrisisLevel(0);
          setJackpot(20);
          setLog(['Trò chơi bắt đầu!']);
          setTradeLog([]);
          setShowRulesModal(false);
          if (startWithTutorial) {
            setTutorialStep(0);
          }
        },
        [],
      );

    const handleResetToSetup = () => {
        setPlayers([]);
        setGamePhase(GamePhase.SETUP);
    };
    
    const handleSquareAction = useCallback((player: Player, squareIndex: number) => {
        const square = BOARD_SQUARES[squareIndex];
        setActiveSquare(square);
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
                    
                    if ([1, 8, 13, 18, 23, 27, 32, 37].includes(square.id)) {
                        p.chips = Math.max(0, p.chips - 10);
                        p.hasRawMaterials = true;
                        addLog(`${p.name} trả 10 chip mua nguyên liệu.`);
                    } else if ([2, 9, 14, 19, 24, 28, 33, 39].includes(square.id)) {
                        p.chips = Math.max(0, p.chips - 5);
                        p.hasLabor = true;
                        addLog(`${p.name} trả 5 chip thuê công nhân.`);
                    } else if (square.id === 6) {
                        p.chips = Math.max(0, p.chips - 10);
                        addLog(`${p.name} trả 10 chip chi phí sản xuất.`);
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
                        if (square.id === 11) profit = 25;
                        if (square.id === 17) profit = 30;
                        if (square.id === 25) profit = 15;
                        
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
                const randomEvent = EVENT_CARDS[Math.floor(Math.random() * EVENT_CARDS.length)];
                setCurrentEvent(randomEvent);
                setShowEventModal(true);
                break;

            case SquareType.CORNER:
                 switch (square.id) {
                    case 10: 
                        addLog(`${player.name} rơi vào khủng hoảng, mất 15 chip!`);
                        setPlayers(prev => prev.map(p => {
                           if (p.id === player.id) {
                               const comboReset = p.combo.count > 0 ? { combo: { type: 'none' as const, count: 0 } } : {};
                               if(p.combo.count > 0) addLog(`${p.name} đã mất chuỗi combo.`);
                               return { ...p, chips: Math.max(0, p.chips - 15), ...comboReset };
                           }
                           return p;
                        }));
                        break;
                    case 20: 
                        addLog("Cách mạng công nhân nổ ra!");
                        setPlayers(prev => {
                            const wealthy = prev.filter(p => p.chips > 70);
                            const poor = prev.filter(p => p.chips < 40);
                            if (wealthy.length > 0 && poor.length > 0) {
                                let totalToDistribute = wealthy.length * 10;
                                addLog(`Tư sản chia ${totalToDistribute} chip.`);
                                const share = Math.floor(totalToDistribute / poor.length);
                                return prev.map(p => {
                                    const comboReset = (p.id === player.id && p.combo.count > 0) ? { combo: { type: 'none' as const, count: 0 } } : {};
                                    if(p.id === player.id && p.combo.count > 0) addLog(`${p.name} đã mất chuỗi combo.`);

                                    if (p.chips > 70) return {...p, chips: p.chips - 10, ...comboReset};
                                    if (p.chips < 40) return {...p, chips: p.chips + share, ...comboReset};
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
                    case 30:
                        addLog("Nhà nước điều tiết!");
                        setPlayers(prev => {
                            const richest = prev.reduce((max, p) => p.chips > max.chips ? p : max, prev[0]);
                            if (richest.chips > 80 && prev.length > 1) {
                                const poorest = prev.reduce((min, p) => p.chips < min.chips ? p : min, prev[0]);
                                addLog(`${richest.name} trợ cấp ${poorest.name} 10 chip.`);
                                return prev.map(p => {
                                    const comboReset = (p.id === player.id && p.combo.count > 0) ? { combo: { type: 'none' as const, count: 0 } } : {};
                                    if(p.id === player.id && p.combo.count > 0) addLog(`${p.name} đã mất chuỗi combo.`);

                                    if (p.id === richest.id) return { ...p, chips: p.chips - 10, ...comboReset };
                                    if (p.id === poorest.id) return { ...p, chips: p.chips + 10, ...comboReset };
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
    }, [addLog, crisisLevel]);

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

        const currentPlayer = players[currentPlayerIndex];
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
            setDice([d1, d2]);
            setIsDiceRolling(false);
            
            const total = d1 + d2;
            addLog(`${currentPlayer.name} tung được ${total}.`);

            const newPosition = (currentPlayer.position + total) % BOARD_SQUARES.length;
            if (newPosition < currentPlayer.position) {
                addLog(`${currentPlayer.name} qua vạch đích, nhận 20 chip!`);
                updatePlayerState(currentPlayer.id, { position: newPosition, chips: currentPlayer.chips + 20 });
            } else {
                updatePlayerState(currentPlayer.id, { position: newPosition });
            }

            setGamePhase(GamePhase.ACTION);
            
            setTimeout(() => {
                setPlayers(currentPlayers => {
                    const playerForAction = currentPlayers[currentPlayerIndex];
                    handleSquareAction(playerForAction, newPosition);
                    return currentPlayers;
                });
            }, 1000);
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
            if (nextRound > 10) {
                setGamePhase(GamePhase.GAME_OVER);
                addLog("Hết 10 vòng! Trò chơi kết thúc!");
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
        const { betCost, winnings, jackpotWon } = result;
        const netChipChange = winnings - betCost;
        let newJackpot = jackpot;

        if (jackpotWon) {
            addLog(`🎉🎉🎉 ${player.name} TRÚNG JACKPOT ${jackpot} chip! 🎉🎉🎉`);
            newJackpot = 20; // Reset
        } else if (winnings === 0) { // Loss
            let jackpotContribution = 0;
            if (betCost === 5) jackpotContribution = 2;
            else if (betCost === 10) jackpotContribution = 5;
            else if (betCost === 15) jackpotContribution = 10;
            
            newJackpot += jackpotContribution;
            addLog(`${player.name} thua ${betCost} chip tại Casino. ${jackpotContribution} chip đã được thêm vào Jackpot.`);
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

                if (jackpotWon) {
                    updatedPlayer.chips += jackpot;
                    updatedPlayer.stats.jackpotsWon += 1;
                }
                
                updatedPlayer.chips = Math.max(0, updatedPlayer.chips);
                return updatedPlayer;
            }
            return p;
        }));

        setJackpot(newJackpot);
        setShowCasinoModal(false);
        setGamePhase(GamePhase.END_TURN);
    }
    
    const handleEventResolve = () => {
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
        setShowEventModal(false);
        setGamePhase(GamePhase.END_TURN);
    }

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
        setGamePhase(GamePhase.TRADING);
        addTradeLog(`➡️ ${currentPlayer.name} mời ${partner.name} giao dịch.`);
    };
    const handleCancelTrade = () => {
        if(tradeOffer) {
            const proposer = players.find(p => p.id === tradeOffer.fromPlayerId);
            const partner = players.find(p => p.id === tradeOffer.toPlayerId);
            addTradeLog(`🚫 Giao dịch giữa ${proposer?.name} & ${partner?.name} đã bị hủy.`);
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
    
        addTradeLog(`✅ Giao dịch thành công!`);
        setShowTradeModal(false);
        setTradeOffer(null);
        setGamePhase(GamePhase.ROLLING);
    };
    const handleRejectTrade = () => {
        if (!tradeOffer) return;
        const proposer = players.find(p => p.id === tradeOffer.fromPlayerId);
        const partner = players.find(p => p.id === tradeOffer.toPlayerId);
        addTradeLog(`❌ ${partner?.name} từối ${proposer?.name}.`);
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
        <div className="w-full h-full p-4 grid grid-cols-[350px_1fr_350px] gap-4 items-start">
            <PlayerInfo 
                players={players} 
                currentPlayerIndex={currentPlayerIndex} 
                gamePhase={gamePhase} 
                onInitiateTrade={handleInitiateTrade}
            />
            
            <main className="w-full h-full flex items-center justify-center">
                 {viewMode === 'board' ? (
                    <GameBoard
                        players={players}
                        productionFeedback={productionFeedback}
                        currentPlayerId={players[currentPlayerIndex].id}
                    />
                 ) : (
                    <PlayerStatusView players={players} />
                 )}
            </main>
            
            <RightPanel 
                round={round}
                crisisLevel={crisisLevel}
                jackpot={jackpot}
                log={log}
                tradeLog={tradeLog}
                dice={dice}
                isDiceRolling={isDiceRolling}
                onRollDice={handleRollDice}
                onEndTurn={handleEndTurn}
                gamePhase={gamePhase}
                currentPlayer={players[currentPlayerIndex]}
                onShowRules={() => setShowRulesModal(true)}
                viewMode={viewMode}
                onToggleView={handleToggleView}
            />
            
            {showCasinoModal && activeSquare && (
                <CasinoModal 
                    square={activeSquare}
                    player={players[currentPlayerIndex]}
                    jackpot={jackpot}
                    onClose={handleCasinoResolve}
                />
            )}
             {showEventModal && currentEvent && (
                <EventCardModal
                    event={currentEvent}
                    onClose={handleEventResolve}
                />
            )}
            {gamePhase === GamePhase.GAME_OVER && (
                <GameOverModal players={players} onPlayAgain={handleResetToSetup} />
            )}
             {showRulesModal && (
                <RulesModal onClose={() => setShowRulesModal(false)} />
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

export default Monopoly;