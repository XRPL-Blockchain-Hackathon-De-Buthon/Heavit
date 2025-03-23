import React from 'react';
import backgroundImage from '../bit/c.png';
import buttonImage1 from '../bit/btn1.png';
import buttonImage2 from '../bit/btn2.png';
import buttonImage3 from '../bit/btn3.png';

const App: React.FC = () => {
  const handleButton1Click = () => {
    window.location.href = '/d';
  };

  const handleButton2Click = () => {
    window.location.href = '/e';
  };

  const handleButton3Click = () => {
    window.location.href = '/f';
  };

  return (
    <div style={styles.container}>
      <img src={backgroundImage} alt="Background" style={styles.backgroundImage} />
      <button style={styles.button1} onClick={handleButton1Click}>
        <img src={buttonImage1} alt="Button 1" style={styles.imageButton} />
      </button>
      <div style={styles.buttonContainer}>
        <button style={styles.button2} onClick={handleButton2Click}>
          <img src={buttonImage2} alt="Button 2" style={styles.imageButton} />
        </button>
        <button style={styles.button3} onClick={handleButton3Click}>
          <img src={buttonImage3} alt="Button 3" style={styles.imageButton} />
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '393px',
    height: '852px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    position: 'relative' as 'relative',
  },
  backgroundImage: {
    position: 'absolute' as 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover' as 'cover',
    top: 0,
    left: 0,
  },
  button: {
    position: 'absolute' as 'absolute',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  imageButton: {
    width: '100%',
    height: '100%',
  },
  button1: {
    position: 'absolute' as 'absolute',
    top: '670px',
    left: '50px',
    width: '300px',
    height: '60px',
  },
  button2: {
    width: '200px',
    height: '60px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  button3: {
    width: '200px',
    height: '60px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  buttonContainer: {
    position: 'absolute' as 'absolute',
    bottom: '60px',
    display: 'flex',
    justifyContent: 'center',
    gap: '-10px',
  },
};

export default App;
