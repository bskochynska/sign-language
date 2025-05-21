import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import './StatsSection.css';
import { useState } from 'react';


const stats = [
  { value: 150, suffix: '+ ТИС', label: 'УКРАЇНЦІВ ЩОДНЯ ВИКОРИСТОВУЮТЬ ЖЕСТОВУ МОВУ' },
  { value: 1, suffix: '%', label: 'ОНЛАЙН-СЕРВІСІВ ВРАХОВУЄ ПОТРЕБИ КОРИСТУВАЧІВ З ПОРУШЕННЯМИ СЛУХУ' },
  { value: 2.5, suffix: '+ МЛН', label: 'ОСІБ В УКРАЇНІ МАЮТЬ ПОРУШЕННЯ СЛУХУ', decimals: 1 },
  { value: 10, suffix: '%', label: 'ШКІЛ УКРАЇНИ МАЮТЬ ІНКЛЮЗИВНІ ПРОГРАМИ ДЛЯ ДІТЕЙ З ПОРУШЕННЯМИ СЛУХУ' }
];

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatItem key={index} {...stat} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ value, suffix, label, decimals }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
    const [isCountingDone, setIsCountingDone] = useState(false);
  
    return (
      <div className="stat-item" ref={ref}>
        <div className="stat-value">
          {inView ? (
            <>
              <span className={`stat-number ${isCountingDone ? 'visible' : 'faded'}`}>
                <CountUp
                  end={value}
                  decimals={decimals || 0}
                  duration={2}
                  onEnd={() => setIsCountingDone(true)}
                />
              </span>
              <span className="stat-suffix"> {suffix}</span>
            </>
          ) : (
            <>
              <span className="stat-number faded">0</span>
              <span className="stat-suffix"> {suffix}</span>
            </>
          )}
        </div>
        <div className="stat-label">{label}</div>
      </div>
    );
  }
  