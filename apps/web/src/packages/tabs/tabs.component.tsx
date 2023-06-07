import React, { useCallback, useEffect, useState } from 'react';
import styles from './tabs.module.scss';

export interface ITab {
  tabId: string;
  tabname: string | React.ReactNode;
  component: React.ReactElement;
}

interface IProps {
  defaultTab: string;
  tabs: ITab[];
}
const Tabs: React.FC<IProps> = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState('');
  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  const changeTab: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    const { value } = e.target as any;
    setActiveTab(value);
  }, []);

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            role="tab"
            key={tab.tabId}
            value={tab.tabId}
            onClick={changeTab}
            className={`${styles.tabName} ${activeTab === tab.tabId ? styles.active : ''}`}
          >
            {tab.tabname}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {tabs.map((tab) =>
          activeTab === tab.tabId ? <React.Fragment key={tab.tabId}>{tab.component}</React.Fragment> : null,
        )}
      </div>
    </div>
  );
};

export default Tabs;
