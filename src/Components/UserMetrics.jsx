import styles from './UserMetrics.module.css';
import { useState, useEffect } from 'react';
import RadarChart from './Charts/Radar';
import Speedometer from './Charts/Speedometer';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { motion } from 'framer-motion';
import { TbAdjustments } from 'react-icons/tb';

function extractvalues(data) {
  var result = [];
  data.map((dato) => result.push(dato.value * 100));
  return result;
}

export default function UserMetrics() {
  const [dataMetrics, setDataMetrics] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedFiltersStudents, setSelectedFiltersStudents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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
      <motion.div
        className={`${styles['buttons_container2']} ${
          isOpen ? styles.open : ''
        }`}
        transition={{ layout: { duration: 0.2 } }}
        layout
      >
        <motion.div className={styles.buttons_container} layout="position">
          <div className={styles.filtername}>Filters</div>
          <div
            className={`${styles.filterIcon} ${isOpen ? styles.black : ''}`}
            onClick={handleClick}
          >
            <TbAdjustments size={20} />
          </div>
        </motion.div>
        {isOpen && (
          <>
            <div className={styles.buttons_container3}>
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
            <motion.div className={styles.buttons_container3}>
              {Object.keys(dataMetrics).map((key) => (
                <button
                  onClick={() => handleFilterButtonClickStudents(key)}
                  className={
                    selectedFiltersStudents?.includes(key)
                      ? styles.buttons_active
                      : styles.buttons
                  }
                >
                  {key.replace(/_|#|-|@|<>|^[H]/g, ' ')}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
      {selectedFilters.length <= 0 ? (
        <div
          styles={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {Object.keys(dataMetrics).map((key) => {
            console.log(selectedFiltersStudents);
            if (
              selectedFiltersStudents.length <= 0 ||
              selectedFiltersStudents.includes(key)
            ) {
              return (
                <>
                  <hr style={{ width: '500px' }} />
                  <br />

                  <div>
                    {' '}
                    <div className={styles.titulo}>
                      <div className={styles.infoTit}>{key} </div>
                    </div>
                    <div>
                      <RadarChart
                        student={key}
                        values={extractvalues(dataMetrics[key])}
                      />
                    </div>
                    {dataMetrics[key].map((dato) => (
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
                </>
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
          {Object.keys(dataMetrics).map((key) => {
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
          })}{' '}
        </div>
      )}
    </div>
  );
}
