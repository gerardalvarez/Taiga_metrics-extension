import React, { useState, useEffect } from 'react';
import styles from './EvalMetrics.module.css';
import RadarChart from './Charts/Radar';
import { Typewriter } from 'react-simple-typewriter';

const colors = [
  'rgba(255, 99, 132, 0.4)',
  'rgba(255, 99, 255, 0.4)',
  'rgba(99, 255, 132, 0.4)',
  'rgba(99, 255, 255, 0.4)',
  'rgba(255, 153, 0, 0.4)',
  'rgba(132, 99, 255, 0.4)',
  'rgba(255, 132, 99, 0.4)',
  'rgba(99, 132, 255, 0.4)',
  'rgba(255, 255, 99, 0.4)',
  'rgba(153, 255, 0, 0.4)',
];

const colorBorder = [
  'rgba(255, 99, 132)',
  'rgba(255, 99, 255)',
  'rgba(99, 255, 132)',
  'rgba(99, 255, 255)',
  'rgba(255, 153, 0)',
  'rgba(132, 99, 255)',
  'rgba(255, 132, 99)',
  'rgba(99, 132, 255)',
  'rgba(255, 255, 99)',
  'rgba(153, 255, 0)',
];

function extractvalues(data) {
  var result = [];
  data.map((dato) => result.push(dato.value * 100));
  return result;
}

const EvalMetrics = (props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [proj, setProj] = useState('');
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    if (props.proyecto) {
      setProj(props.proyecto);
    }
    if (props.data) {
      var datasetaux = [];
      // eslint-disable-next-line array-callback-return
      Object.keys(props.data).map((key, index) => {
        datasetaux.push({
          label: key + ' Metrics',
          data: extractvalues(props.data[key]),
          backgroundColor: colors[index],
          borderColor: colorBorder[index],
          borderWidth: 2,
        });
      });
      setDataset(datasetaux);
    }
  }, [props.proyecto, props.data]);

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
    <div className={styles.container_out}>
      <div className={styles.container}>
        <div className={styles.tit}>Students Overall</div>
        <RadarChart dataset={dataset} />
        <br />
      </div>
      <div className={styles.container2}>
        <button
          className={
            !result ? styles.button_eval_active : styles.button_eval_inactive
          }
          onClick={handleClick}
          disabled={result}
        >
          {loading ? 'Evaluating....' : 'Evaluate'}
        </button>
        {loading && (
          <div className={styles.loadingText}>
            <Typewriter
              words={[
                'Analyzing students...',
                'Evaluating metrics...',
                'Getting results...',
              ]}
              loop={1}
              typeSpeed={200}
              deleteSpeed={50}
              delaySpeed={5000}
            />
          </div>
        )}
        {!loading &&
          (result ? (
            <div className={styles.evaluationText}>
              <p>{result}</p>
              <br />
            </div>
          ) : null)}
      </div>
    </div>
  );
};

export default EvalMetrics;
