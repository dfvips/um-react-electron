import { useEffect, useState } from 'react';

// Update every half hour
const TIMER_UPDATE_INTERVAL = 30 * 60 * 1000;

const getCurrentYear = () => new Date().getFullYear();

export function CurrentYear() {
  const [year, setYear] = useState(getCurrentYear);

  useEffect(() => {
    const updateTime = () => setYear(getCurrentYear);
    updateTime();

    const timer = setInterval(updateTime, TIMER_UPDATE_INTERVAL);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <>{year}</>;
}
