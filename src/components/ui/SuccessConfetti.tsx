import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

interface SuccessConfettiProps {
  duration?: number;
}

const SuccessConfetti: React.FC<SuccessConfettiProps> = ({ duration = 3000 }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    const timer = setTimeout(() => setShowConfetti(false), duration);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [duration]);

  if (!showConfetti) return null;

  return (
    <Confetti
      width={windowDimensions.width}
      height={windowDimensions.height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.3}
    />
  );
};

export default SuccessConfetti;