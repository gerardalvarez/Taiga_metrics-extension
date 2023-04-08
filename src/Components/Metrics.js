import styles from './Metrics.module.css';
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UserMetrics from './UserMetrics';
import ProjectMetrics from './ProjectMetrics';
export default function Metrics() {
  const [activeTab, setActiveTab] = useState(0); // estado de la pestaña activa
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          height: '100%',
          maxWidth: '600px',
          minWidth: '600px',
          // backgroundColor: "black",
          color: 'black',
        }}
      >
        <div className={styles.tabbedContainer}>
          <div className={styles.tabList}>
            <div className={styles.tabcont}>
              <div
                className={activeTab === 0 ? styles.activeTab : styles.tab}
                onClick={() => setActiveTab(0)}
              >
                Users Metrics
              </div>
              <div
                className={activeTab === 1 ? styles.activeTab : styles.tab}
                onClick={() => setActiveTab(1)}
              >
                Project Metrics
              </div>
            </div>
          </div>
          {activeTab === 0 && (
            <div className={styles.tabPanel}>
              <UserMetrics />
            </div>
          )}
          {activeTab === 1 && (
            <div className={styles.tabPanel}>
              <ProjectMetrics />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
