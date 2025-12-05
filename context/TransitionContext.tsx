'use client';

import { createContext, useState, useContext } from 'react';

type AnimationDirection = 'up' | 'down' | 'none';

interface TransitionContextType {
  enterAnimation: AnimationDirection;
  exitAnimation: AnimationDirection;
  setAnimations: (enter: AnimationDirection, exit: AnimationDirection) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [enterAnimation, setEnterAnimation] = useState<AnimationDirection>('none');
  const [exitAnimation, setExitAnimation] = useState<AnimationDirection>('none');

  const setAnimations = (enter: AnimationDirection, exit: AnimationDirection) => {
    setEnterAnimation(enter);
    setExitAnimation(exit);
  };

  return (
    <TransitionContext.Provider value={{ enterAnimation, exitAnimation, setAnimations }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};