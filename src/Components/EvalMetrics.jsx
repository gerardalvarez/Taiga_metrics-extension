import React, { useState, useEffect } from 'react';

const EvalMetrics = (props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [proj, setProj] = useState('');

  useEffect(() => {
    setProj(props.proyecto);
  }, [props.proyecto]);

  const handleClick = () => {
    setLoading(true);
    fetch(`http://localhost:3000/api/projects/${proj}/evaluate/projectmetrics`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        var responseWithBreaks = '';
        data.error
          ? (responseWithBreaks = data.error)
          : (responseWithBreaks = data.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            )));
        setResult(responseWithBreaks);
      });
  };

  return (
    <div
      style={{
        width: '600px',
        border: '2px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
      }}
    >
      <button
        style={{
          backgroundColor: '#4CAF50',
          border: 'none',
          color: 'white',
          padding: '15px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          margin: '10px',
        }}
        onClick={handleClick}
        disabled={result}
      >
        {loading ? 'Evaluating....' : 'Evaluate'}
      </button>
      {loading && (
        <img
          src="https://media.tenor.com/64UaxgnTfx0AAAAC/memes-loading.gif"
          alt="Loading"
        />
      )}
      {!loading && <p>{result}</p>}
    </div>
  );
};

export default EvalMetrics;
