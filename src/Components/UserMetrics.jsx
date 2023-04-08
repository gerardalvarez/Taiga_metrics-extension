import styles from './UserMetrics.module.css';
import { useState, useEffect } from 'react';
import RadarChart from './Charts/Radar';
import Speedometer from './Charts/Speedometer';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function extractvalues(data) {
  var result = [];
  data.map((dato) => result.push(dato.value * 100));
  return result;
}

export default function UserMetrics() {
  const [dataMetrics, setDataMetrics] = useState('');
  const [student, setStudent] = useState('');
  const [data, setData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedFiltersStudents, setSelectedFiltersStudents] = useState([]);

  const filters = [
    'assignedtasks',
    'closedtasks',
    'modifiedlinescontribution',
    'commits',
  ];

  const filterNames = {
    assignedtasks: 'Tasks',
    closedtasks: 'Closed tasks',
    modifiedlinescontribution: 'Modified lines',
    commits: 'Commits',
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/projects/pes11a/usersmetrics')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDataMetrics(data);
      })
      .catch((error) => console.error(error));
    console.log(dataMetrics);
  }, []);

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  const handleFilterButtonClickStudents = (selectedStudent) => {
    if (selectedFiltersStudents.includes(selectedStudent)) {
      let filters2 = selectedFiltersStudents.filter(
        (el) => el !== selectedStudent
      );
      setSelectedFiltersStudents(filters2);
    } else {
      setSelectedFiltersStudents([...selectedFiltersStudents, selectedStudent]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons_container}>
        {filters.map((key) => (
          <button
            onClick={() => handleFilterButtonClick(key)}
            className={
              selectedFilters?.includes(key)
                ? styles.buttons_active
                : styles.buttons
            }
          >
            {filterNames[key]}
          </button>
        ))}
      </div>
      <div className={styles.buttons_container2}>
        {Object.keys(dataMetrics).map((key) => (
          <button
            onClick={() => handleFilterButtonClickStudents(key)}
            className={
              selectedFiltersStudents?.includes(key)
                ? styles.buttons_active
                : styles.buttons
            }
          >
            {key}
          </button>
        ))}
      </div>
      {selectedFilters.length <= 0 ? (
        <div
          styles={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {Object.keys(dataMetrics).map((key, index) => {
            console.log(selectedFiltersStudents);
            if (
              selectedFiltersStudents.length <= 0 ||
              selectedFiltersStudents.includes(key)
            ) {
              return (
                <div>
                  <br />
                  <br />
                  <hr style={{ width: '500px' }} />
                  <br />
                  <div className={styles.titulo}>
                    <div className={styles.infoTit}>{key} </div>
                  </div>
                  <div>
                    <RadarChart
                      student={key}
                      values={extractvalues(dataMetrics[key])}
                    />
                  </div>
                  {dataMetrics[key].map((dato, index) => (
                    <>
                      <div
                        key={dato.id}
                        className={styles.info}
                        data-tooltip-id={dato.id}
                        data-tooltip-content={dato.description}
                      >
                        <Tooltip id={dato.id} place="left" />
                        <div className={styles.infoBut}>{dato.name}</div>
                        Last updated at {dato.date}. Value in % :&nbsp;
                        {dato.value * 100}
                      </div>
                    </>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <div
          styles={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {Object.keys(dataMetrics).map((key, index) => {
            if (
              selectedFiltersStudents.length <= 0 ||
              selectedFiltersStudents.includes(key)
            ) {
              return (
                <>
                  <hr style={{ width: '500px' }} />
                  <br />

                  <div className={styles.speedometers_container}>
                    <div className={styles.titulo}>
                      <div className={styles.infoTit}>{key} </div>
                    </div>
                    {dataMetrics[key].map((dato) => (
                      <>
                        {(selectedFilters.includes(
                          dato.id
                            .toLowerCase()
                            .substring(0, dato.id.indexOf('_'))
                        ) ||
                          selectedFilters.includes(
                            dato.qualityFactors[0].toLowerCase()
                          )) && (
                          <div key={dato.id} className={styles.speedometers}>
                            <Speedometer
                              value={dato.value * 100}
                              text={dato.name}
                            />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </>
              );
            }
            return null;
          })}
          <br />
          <br />{' '}
        </div>
      )}
    </div>
  );
}
