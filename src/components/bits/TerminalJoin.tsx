import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalJoin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { prompt: 'ENTER FULL NAME:', key: 'name' },
    { prompt: 'ENTER DEPARTMENT:', key: 'dept' },
    { prompt: 'AREA OF INTEREST (Web/AI/Design/etc):', key: 'interest' },
    { prompt: 'CONFIRM APPLICATION? (Y/N):', key: 'confirm' }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, step]);

  const handleStart = () => {
    setIsOpen(true);
    setIsTyping(true);
    setTimeout(() => {
      setHistory(['> INITIALIZING CSI_JOIN_PROTOCOL...', '> CONNECTION ESTABLISHED.', '> ACCESS GRANTED.']);
      setIsTyping(false);
    }, 1000);
  };

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newHistory = [...history, `${steps[step].prompt} ${inputValue}`];
    
    if (step < steps.length - 1) {
      setHistory(newHistory);
      setStep(step + 1);
      setInputValue('');
    } else {
      setHistory([...newHistory, '> DATA ENCRYPTED.', '> APPLICATION SUBMITTED.', '> CLOSING SESSION...']);
      setInputValue('');
      setTimeout(() => {
        setIsOpen(false);
        setStep(0);
        setHistory([]);
      }, 2000);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={handleStart}
            className="border-2 border-white text-white px-10 py-4 font-bold transition-all hover:bg-white hover:text-black text-sm tracking-widest uppercase"
          >
            Join the Team
          </motion.button>
        ) : (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-md bg-[#0a0a0a] border border-white/20 p-6 font-mono text-xs sm:text-sm shadow-[0_0_50px_rgba(255,255,255,0.05)] text-left"
          >
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
              <span className="ml-2 text-[10px] text-white/30 uppercase tracking-widest">CSI_TERMINAL_V1.0</span>
            </div>

            <div className="space-y-2 mb-4 max-h-[200px] overflow-y-auto scrollbar-hide">
              {history.map((line, i) => (
                <div key={i} className={line.startsWith('>') ? 'text-white/40' : 'text-white'}>
                  {line}
                </div>
              ))}
              {isTyping && <div className="text-white/40 animate-pulse">&gt; BOOTING...</div>}
            </div>

            {!isTyping && (
              <form onSubmit={handleInput} className="flex flex-col gap-2">
                <label className="text-white/60">{steps[step].prompt}</label>
                <div className="flex items-center gap-2">
                  <span className="text-white">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="bg-transparent border-none outline-none text-white w-full uppercase"
                    autoFocus
                  />
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TerminalJoin;
