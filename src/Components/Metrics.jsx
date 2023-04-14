import styles from './Metrics.module.css';
import { useState, useEffect } from 'react';
import 'react-tabs/style/react-tabs.css';
import UserMetrics from './UserMetrics';
import ProjectMetrics from './ProjectMetrics';
import ReactLoading from 'react-loading';

function reload() {
  chrome.runtime.sendMessage({
    type: 'reloadpage',
  });
}

export default function Metrics() {
  const [error, seterror] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usdata, setUsdata] = useState(null);
  const [pdata, setPdata] = useState(null);
  const [activeTab, setActiveTab] = useState(0); // estado de la pestaña activa
  const [categories, setCategories] = useState('');

  useEffect(() => {
    chrome.storage.local.get('extensionTabs', (data) => {
      console.log('tabs:');
      console.log(data);

      data &&
      Object.keys(data).length === 0 &&
      Object.getPrototypeOf(data) === Object.prototype
        ? setActiveTab(0)
        : setActiveTab(data.extensionTabs);
    });

    fetch('http://localhost:3000/api/projects/pes21a/metricscategories')
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setCategories(data);
      })
      .catch((error) => console.error(error));

    fetch('http://localhost:3000/api/projects/pes21a/projectmetrics')
      .then((response) => response.json())
      .then((data) => {
        data.error ? seterror(true) : seterror(false);
        setLoading(false);
        setPdata(data);
      })
      .catch((error) => {
        seterror(true);
        setLoading(false);
        console.error(error);
      });
    setLoading(true);
    fetch('http://localhost:3000/api/projects/pes21a/usersmetrics')
      .then((response) => response.json())
      .then((data) => {
        data.error ? seterror(true) : seterror(false);
        setLoading(false);
        setUsdata(data);
      })
      .catch((error) => {
        seterror(true);
        setLoading(false);
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tabbedContainer}>
          <div className={styles.tabList}>
            <div className={styles.tabcont}>
              <div
                className={activeTab === 0 ? styles.activeTab : styles.tab}
                onClick={() => {
                  setActiveTab(0);
                  chrome.storage.local.set({ extensionTabs: 0 }, () => {
                    chrome.runtime.sendMessage({
                      type: 'updateinnerTabs',
                      extensionTabs: 0,
                    });
                  });
                }}
              >
                Users Metrics
              </div>
              <div
                className={activeTab === 1 ? styles.activeTab : styles.tab}
                onClick={() => {
                  setActiveTab(1);
                  chrome.storage.local.set({ extensionTabs: 1 }, () => {
                    chrome.runtime.sendMessage({
                      type: 'updateinnerTabs',
                      extensionTabs: 1,
                    });
                  });
                }}
              >
                Project Metrics
              </div>
            </div>
          </div>
          {loading ? (
            <div className={styles.loading}>
              <ReactLoading
                type="bubbles"
                color="#008aa8"
                height={'20%'}
                width={'20%'}
              />
            </div>
          ) : error ? (
            <div className={styles.errorcontainer}>
              <img
                src="https://tree.taiga.io/v-1664173031373/images/empty/empty_tex.png"
                className={styles.errorimg}
                width={510}
                height={100}
                alt="error"
              />
              <div className={styles.errortext}>
                Ooops, something went wrong. Metrics could not be loaded...
              </div>
              <div className={styles.reload} onClick={reload}>
                Try reloading the page here
              </div>
            </div>
          ) : (
            <>
              {activeTab === 0 && (
                <div className={styles.tabPanel}>
                  <UserMetrics dataus={usdata} categories={categories} />
                </div>
              )}
              {activeTab === 1 && (
                <div className={styles.tabPanel}>
                  <ProjectMetrics data={pdata} categories={categories} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
