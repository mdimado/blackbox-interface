import React, { useState } from 'react';

const BlackBoxAPISimulator = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('/data');
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Replace with your Firebase project URL
  const FIREBASE_FUNCTIONS_URL = 'https://us-central1-blackbox-cosc.cloudfunctions.net';

  const endpoints = [
    {
      path: '/data',
      method: 'POST',
      description: 'Hidden logic - figure it out!'
    },
    {
      path: '/time',
      method: 'GET',
      description: 'Hidden logic - figure it out!'
    },
    {
      path: '/fizzbuzz',
      method: 'POST',
      description: 'Hidden logic - figure it out!'
    },
    {
      path: '/zap',
      method: 'POST',
      description: 'Hidden logic - figure it out!'
    },
    {
      path: '/alpha',
      method: 'POST',
      description: 'Hidden logic - figure it out!'
    },
    {
      path: '/glitch',
      method: 'POST',
      description: 'Hidden logic - figure it out!'
    }
  ];

  const currentEndpoint = endpoints.find(ep => ep.path === selectedEndpoint);

  const callFirebaseFunction = async (endpoint, data = null) => {
    const functionName = endpoint.replace('/', '');
    const url = `${FIREBASE_FUNCTIONS_URL}/${functionName}`;
    
    const options = {
      method: endpoint === '/time' ? 'GET' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (data !== null) {
      options.body = JSON.stringify({ data });
    }
    
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const result = await callFirebaseFunction(
        selectedEndpoint, 
        currentEndpoint.method === 'POST' ? inputValue : null
      );
      
      setOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
    
    setIsLoading(false);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#000',
      color: '#00ff00',
      fontFamily: 'monospace',
      padding: '20px',
      margin: 0,
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto'
    },
    wrapper: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    header: {
      marginBottom: '30px'
    },
    title: {
      fontSize: '24px',
      marginBottom: '10px'
    },
    subtitle: {
      color: '#90ee90'
    },
    section: {
      marginBottom: '30px'
    },
    sectionTitle: {
      fontSize: '18px',
      marginBottom: '15px'
    },
    endpointsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '10px'
    },
    endpointButton: {
      textAlign: 'left',
      padding: '10px',
      backgroundColor: 'transparent',
      color: '#00ff00',
      border: '1px solid #666',
      fontFamily: 'monospace',
      cursor: 'pointer'
    },
    endpointButtonActive: {
      textAlign: 'left',
      padding: '10px',
      backgroundColor: 'rgba(0, 255, 0, 0.1)',
      color: '#00ff00',
      border: '1px solid #00ff00',
      fontFamily: 'monospace',
      cursor: 'pointer'
    },
    methodText: {
      color: '#ffff00'
    },
    currentEndpoint: {
      border: '1px solid #666',
      padding: '20px',
      marginBottom: '20px'
    },
    currentTitle: {
      fontSize: '20px',
      marginBottom: '20px'
    },
    inputSection: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '10px'
    },
    input: {
      width: '100%',
      backgroundColor: '#000',
      border: '1px solid #666',
      padding: '10px',
      color: '#00ff00',
      fontFamily: 'monospace',
      outline: 'none'
    },
    button: {
      backgroundColor: '#004400',
      border: '1px solid #00ff00',
      padding: '10px 20px',
      color: '#00ff00',
      fontFamily: 'monospace',
      cursor: 'pointer'
    },
    buttonDisabled: {
      backgroundColor: '#004400',
      border: '1px solid #00ff00',
      padding: '10px 20px',
      color: '#00ff00',
      fontFamily: 'monospace',
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    output: {
      border: '1px solid #666',
      padding: '20px'
    },
    outputContent: {
      backgroundColor: '#111',
      padding: '15px',
      minHeight: '100px',
      border: '1px solid #333',
      whiteSpace: 'pre-wrap'
    },
    noOutput: {
      color: '#666'
    },
    instructions: {
      marginTop: '30px',
      fontSize: '14px',
      color: '#90ee90'
    },
    warning: {
      backgroundColor: '#331100',
      border: '1px solid #ff6600',
      padding: '10px',
      marginBottom: '20px',
      color: '#ff9900'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>$ Black Box Challenge API</h1>
          <p style={styles.subtitle}>Reverse engineer these endpoints through experimentation</p>
        </div>

        

        {/* Available Endpoints */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Available Endpoints:</h2>
          <div style={styles.endpointsGrid}>
            {endpoints.map((endpoint) => (
              <button
                key={endpoint.path}
                onClick={() => setSelectedEndpoint(endpoint.path)}
                style={selectedEndpoint === endpoint.path ? styles.endpointButtonActive : styles.endpointButton}
              >
                <span style={styles.methodText}>{endpoint.method}</span> {endpoint.path}
              </button>
            ))}
          </div>
        </div>

        {/* Current Endpoint */}
        <div style={styles.currentEndpoint}>
          <h3 style={styles.currentTitle}>
            <span style={styles.methodText}>{currentEndpoint.method}</span> {currentEndpoint.path}
          </h3>

          {/* Input */}
          {currentEndpoint.method === 'POST' && (
            <div style={styles.inputSection}>
              <label style={styles.label}>data [type:string]</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={styles.input}
                placeholder="Enter input data..."
              />
            </div>
          )}

          {/* Send Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={isLoading ? styles.buttonDisabled : styles.button}
          >
            {isLoading ? 'sending...' : 'send'}
          </button>
        </div>

        {/* Output */}
        <div style={styles.output}>
          <h4 style={styles.label}>Output:</h4>
          <div style={styles.outputContent}>
            {output ? (
              <pre>{output}</pre>
            ) : (
              <span style={styles.noOutput}>No output yet...</span>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div style={styles.instructions}>
          <p>Instructions: Figure out what each endpoint does by experimenting with different inputs.</p>
        </div>
      </div>
    </div>
  );
};

export default BlackBoxAPISimulator;