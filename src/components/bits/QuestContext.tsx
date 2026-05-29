import React, { createContext, useContext, useState } from 'react';

interface QuestContextType {
  fragments: boolean[];
  collectFragment: (index: number) => void;
  isComplete: boolean;
  resetQuest: () => void;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

export const QuestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fragments, setFragments] = useState<boolean[]>([false, false, false]);

  const collectFragment = (index: number) => {
    if (fragments[index]) return;
    
    const newFragments = [...fragments];
    newFragments[index] = true;
    setFragments(newFragments);

    // Play a small sound or trigger haptic if possible (optional)
    console.log(`Fragment ${index + 1} collected!`);
  };

  const isComplete = fragments.every(v => v === true);

  const resetQuest = () => {
    setFragments([false, false, false]);
  };

  return (
    <QuestContext.Provider value={{ fragments, collectFragment, isComplete, resetQuest }}>
      {children}
    </QuestContext.Provider>
  );
};

export const useQuest = () => {
  const context = useContext(QuestContext);
  if (!context) {
    throw new Error('useQuest must be used within a QuestProvider');
  }
  return context;
};
