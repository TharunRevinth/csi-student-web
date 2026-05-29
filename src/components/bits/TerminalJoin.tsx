import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuest } from './QuestContext';

const TerminalJoin = () => {
  const { isComplete } = useQuest();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSecretMode, setIsSecretMode] = useState(false);
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
      if (isComplete) {
        setHistory(['> INITIALIZING CSI_MAINFRAME_OVERRIDE...', '> BYPASSING FIREWALL...', '> ENCRYPTED CHANNEL OPEN.']);
        setIsSecretMode(true);
      } else {
        setHistory(['> INITIALIZING CSI_JOIN_PROTOCOL...', '> CONNECTION ESTABLISHED.', '> ACCESS GRANTED.']);
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (isSecretMode) {
      const cmd = inputValue.toLowerCase().trim();
      let response = [];

      switch (cmd) {
        case 'help':
          response = [
            '> AVAILABLE COMMANDS:',
            '> [ UNLOCK ] - ACCESS CLASSIFIED INTEL',
            '> [ LS ]     - LIST MAINFRAME DIRECTORIES',
            '> [ STATUS ] - SYSTEM HEALTH CHECK',
            '> [ CLEAR ]  - WIPE TERMINAL BUFFER',
            '> [ WHOAMI ] - IDENTITY VERIFICATION'
          ];
          break;
        case 'unlock':
          response = [
            '> ACCESSING CLASSIFIED DATA...',
            '> WELCOME, ADMINISTRATOR.',
            '> HINT: THE NEXT MEGA-HACKATHON IS SCHEDULED FOR FALL 2024.',
            '> LOCATION: [ REDACTED ]'
          ];
          break;
        case 'ls':
          response = [
            '> DIRECTORY: /ROOT/CSI/SECRET_PROJECTS',
            '> [!] PROJECT_X.DAT (ENCRYPTED)',
            '> [!] CORE_ALGO.SH',
            '> [!] MEMBER_DB_BACKUP.SQL',
            '> [!] HACK_THE_FUTURE.LOG'
          ];
          break;
        case 'status':
          response = [
            '> SYSTEM STATUS: 100% OPERATIONAL',
            '> CONNECTION: SECURE (SSH-AES256)',
            '> LATENCY: 8ms',
            '> UPTIME: 432:12:05'
          ];
          break;
        case 'whoami':
          response = [
            '> USER: ADMINISTRATOR_LVL_4',
            '> ACCESS_LEVEL: ROOT_PRIVILEGES',
            '> ASSIGNED_STATION: VITC_NODE_01'
          ];
          break;
        case 'clear':
          setHistory(['> BUFFER WIPED.', '> ENCRYPTED CHANNEL OPEN.']);
          setInputValue('');
          return;
        default:
          response = [`> COMMAND '${cmd.toUpperCase()}' NOT RECOGNIZED. TRY 'HELP'.`];
      }

      setHistory(prev => [...prev, `$ ${inputValue}`, ...response]);
      setInputValue('');
      return;
    }

    const currentPrompt = steps[step].prompt;
    const currentInput = inputValue;
    
    if (step < steps.length - 1) {
      setHistory(prev => [...prev, `${currentPrompt} ${currentInput}`]);
      setStep(prev => prev + 1);
      setInputValue('');
    } else {
      setHistory(prev => [...prev, `${currentPrompt} ${currentInput}`, '> DATA ENCRYPTED.', '> APPLICATION SUBMITTED.', '> CLOSING SESSION...']);
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
      {!isOpen && (
        <motion.button
          key="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={handleStart}
          className={`border-2 px-10 py-4 font-bold transition-all text-sm tracking-widest uppercase ${
            isComplete 
              ? 'border-green-500 text-green-500 hover:bg-green-500 hover:text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
              : 'border-white text-white hover:bg-white hover:text-black'
          }`}
        >
          {isComplete ? 'Access Mainframe' : 'Join the Team'}
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            {/* Terminal Window */}
            <motion.div
              key="terminal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-lg bg-[#0a0a0a] border p-6 font-mono text-xs sm:text-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] text-left ${
                isSecretMode ? 'border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.1)]' : 'border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  <span className={`ml-2 text-[10px] uppercase tracking-widest ${isSecretMode ? 'text-green-500' : 'text-white/30'}`}>
                    {isSecretMode ? 'CSI_MAINFRAME_V2.0' : 'CSI_TERMINAL_V1.0'}
                  </span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest"
                >
                  [ CLOSE ]
                </button>
              </div>

              <div className="space-y-2 mb-6 h-[250px] overflow-y-auto scrollbar-hide pr-2">
                {history.map((line, i) => (
                  <div key={i} className={line.startsWith('>') ? (isSecretMode ? 'text-green-500/60' : 'text-white/40') : 'text-white'}>
                    {line}
                  </div>
                ))}
                {isTyping && <div className={`${isSecretMode ? 'text-green-500/40' : 'text-white/40'} animate-pulse`}>&gt; BOOTING...</div>}
              </div>

              {!isTyping && (
                <form onSubmit={handleInput} className="flex flex-col gap-2">
                  <label className={isSecretMode ? 'text-green-500/60' : 'text-white/60'}>
                    {isSecretMode ? 'ENTER OVERRIDE COMMAND:' : steps[step].prompt}
                  </label>
                  <div className="flex items-center gap-2">
                    <span className={isSecretMode ? 'text-green-500' : 'text-white'}>$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className={`bg-transparent border-none outline-none w-full uppercase ${isSecretMode ? 'text-green-500' : 'text-white'}`}
                      autoFocus
                    />
                  </div>
                </form>
              )}

              {/* Scanline Effect Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TerminalJoin;
