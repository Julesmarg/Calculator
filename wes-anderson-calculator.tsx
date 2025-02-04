import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  // Updated color palette with sky blue
  const colors = {
    skyBlue: '#45B7FF',   // Bright sky blue
    cream: '#FFF3E6',     // Warm cream
    red: '#D64045',       // Rich red
    sand: '#E8B87D',      // Sandy beige
    rust: '#A63D2F',      // Deep rust
    white: '#FFFFFF',     // White for number button backgrounds
  };

  const handleNumber = (num) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op) => {
    setEquation(display + ' ' + op + ' ');
    setIsNewNumber(true);
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation('');
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  const Button = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`p-4 text-xl font-bold rounded-lg shadow-lg 
      transition-all duration-200 transform hover:scale-105 
      active:scale-95 ${className}`}
      style={{ 
        backgroundColor: children === 'AC' ? colors.red : 
                        ['÷', '×', '−', '+', '='].includes(children) ? colors.rust : 
                        colors.white,
        color: colors.skyBlue 
      }}
    >
      {children}
    </button>
  );

  return (
    <div className="p-8 rounded-3xl shadow-2xl max-w-md mx-auto"
         style={{ backgroundColor: colors.cream }}>
      <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: colors.sand }}>
        <div className="text-right text-sm mb-2" style={{ color: colors.skyBlue }}>{equation}</div>
        <div className="text-right text-3xl font-bold" style={{ color: colors.skyBlue }}>{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <Button
          onClick={handleClear}
          className="col-span-2"
        >
          AC
        </Button>
        <Button
          onClick={() => handleOperator('/')}
        >
          ÷
        </Button>
        <Button
          onClick={() => handleOperator('*')}
        >
          ×
        </Button>
        
        {[7, 8, 9].map(num => (
          <Button
            key={num}
            onClick={() => handleNumber(num.toString())}
          >
            {num}
          </Button>
        ))}
        <Button
          onClick={() => handleOperator('-')}
        >
          −
        </Button>
        
        {[4, 5, 6].map(num => (
          <Button
            key={num}
            onClick={() => handleNumber(num.toString())}
          >
            {num}
          </Button>
        ))}
        <Button
          onClick={() => handleOperator('+')}
        >
          +
        </Button>
        
        {[1, 2, 3].map(num => (
          <Button
            key={num}
            onClick={() => handleNumber(num.toString())}
          >
            {num}
          </Button>
        ))}
        <Button
          onClick={handleEqual}
          className="row-span-2"
        >
          =
        </Button>
        
        <Button
          onClick={() => handleNumber('0')}
          className="col-span-2"
        >
          0
        </Button>
        <Button
          onClick={() => handleNumber('.')}
        >
          .
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
