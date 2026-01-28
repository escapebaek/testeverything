import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const generateCards = (numPairs: number): Card[] => {
  const emojis = ['🍎', '🍌', '🍒', '🍇', '🍋', '🥭', '🍊', '🍓', '🍉', '🥝', '🍍', '🍑'];
  const selectedEmojis = emojis.slice(0, numPairs);
  let cards: Card[] = [];

  selectedEmojis.forEach((emoji, index) => {
    cards.push({ id: index * 2, value: emoji, isFlipped: false, isMatched: false });
    cards.push({ id: index * 2 + 1, value: emoji, isFlipped: false, isMatched: false });
  });

  return cards.sort(() => Math.random() - 0.5);
};

const MemoryMatch: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [numPairs, setNumPairs] = useState(6);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const initializeGame = useCallback(() => {
    setCards(generateCards(numPairs));
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameOver(false);
    setStartTime(null);
    setEndTime(null);
  }, [numPairs]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (matches === numPairs && matches > 0) {
      setGameOver(true);
      setEndTime(Date.now());
    }
  }, [matches, numPairs]);

  const handleCardClick = (index: number) => {
    if (!gameStarted) return;
    if (gameOver) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;
    if (flippedCards.length === 2) return;

    if (!startTime) setStartTime(Date.now());

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedCards((prev) => [...prev, index]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstIndex, secondIndex] = flippedCards;

      if (cards[firstIndex].value === cards[secondIndex].value) {
        const newCards = [...cards];
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        newCards[firstIndex].isFlipped = false;
        newCards[secondIndex].isFlipped = false;
        setCards(newCards);
        setMatches((prev) => prev + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const handleShare = async () => {
    const time = endTime && startTime ? ((endTime - startTime) / 1000).toFixed(1) : '?';
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Memory Match',
          text: `I completed Memory Match (${numPairs} pairs) in ${moves} moves and ${time}s! Can you beat me?`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`I completed Memory Match in ${moves} moves! Try it: ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const startGame = () => {
    setGameStarted(true);
    initializeGame();
  };

  const getGridColsClass = () => {
    const totalCards = numPairs * 2;
    if (totalCards <= 12) return 'grid-cols-4';
    if (totalCards <= 16) return 'grid-cols-4';
    if (totalCards <= 20) return 'grid-cols-5';
    return 'grid-cols-6';
  };

  const getTimePlayed = () => {
    if (!startTime) return '0:00';
    const end = endTime || Date.now();
    const seconds = Math.floor((end - startTime) / 1000);
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="text-center mb-6">
            <Link to="/games" className="text-white/60 hover:text-white inline-flex items-center mb-4 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Games
            </Link>
            <h1 className="text-3xl font-bold text-white">Memory Match</h1>
          </div>

          {!gameStarted ? (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center">
                <span className="text-5xl">🧠</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Match All Pairs!</h2>
              <p className="text-white/60 mb-6">Find matching pairs of cards to win.</p>
              
              <div className="mb-8">
                <label className="text-white/60 mr-4">Difficulty:</label>
                <select
                  value={numPairs}
                  onChange={(e) => setNumPairs(Number(e.target.value))}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                >
                  <option value={4} className="bg-gray-800">Easy (4 pairs)</option>
                  <option value={6} className="bg-gray-800">Medium (6 pairs)</option>
                  <option value={8} className="bg-gray-800">Hard (8 pairs)</option>
                  <option value={10} className="bg-gray-800">Expert (10 pairs)</option>
                </select>
              </div>

              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                Start Game
              </button>
            </div>
          ) : gameOver ? (
            <div className="text-center py-8">
              <div className="mb-6">
                <span className="text-6xl">🎉</span>
              </div>
              <h2 className="text-3xl font-bold text-green-400 mb-4">Congratulations!</h2>
              
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-white">{moves}</p>
                  <p className="text-white/40 text-sm">Moves</p>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-white">{getTimePlayed()}</p>
                  <p className="text-white/40 text-sm">Time</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => { setGameStarted(false); initializeGame(); }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-purple-500/30 transition-all duration-300"
                >
                  Play Again
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Share Result
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6 px-2">
                <div className="text-white">
                  <span className="text-white/60">Moves: </span>
                  <span className="font-bold">{moves}</span>
                </div>
                <div className="text-white">
                  <span className="text-white/60">Matches: </span>
                  <span className="font-bold">{matches}/{numPairs}</span>
                </div>
                <div className="text-white font-mono">
                  {getTimePlayed()}
                </div>
              </div>

              <div className={`grid ${getGridColsClass()} gap-3 p-4 bg-white/5 rounded-2xl`}>
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    className={`aspect-square rounded-xl flex items-center justify-center text-4xl cursor-pointer transition-all duration-300 transform hover:scale-105
                      ${card.isFlipped || card.isMatched 
                        ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-500/30' 
                        : 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 hover:border-white/30'}
                      ${card.isMatched ? 'opacity-50' : ''}`}
                    onClick={() => handleCardClick(index)}
                  >
                    {card.isFlipped || card.isMatched ? card.value : '❓'}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryMatch;
