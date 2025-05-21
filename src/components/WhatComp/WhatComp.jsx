import React from "react";
import "./WhatComp.css"
import { Feature } from "../../components";
import { WhatfeatureData } from "../../data/FeaturesData";

const WhatComp = () => {
  return (
    <div className="signlang__whatsignlang section__margin" id="whatsignlang">
      <div className="signlang__whatsignlang-feature">
        <Feature
          title="What is Sign Language"
          text="Sign Language is a visual language using hand gestures, facial expressions, and body movements to communicate. It is recognized as an official language in many countries and is primarily used by people who are deaf or hard of hearing."
        />
      </div>

      <div className="signlang__whatsignlang-container">
        {
          WhatfeatureData.map((data,i)=>(
            <Feature title={data.title} text={data.text} key={i*201}/>
          ))
        }
        
      </div>
    </div>
  );
};

export default WhatComp;


// import React from 'react';
// import CountUp from 'react-countup';
// import './StatsSection.css';

// const stats = [
//   { value: 190, suffix: '+', label: 'УСПІШНО РЕАЛІЗОВАНИХ ПРОЄКТІВ' },
//   { value: 3.5, suffix: '+ МЛН', label: 'УСПІШНО ОСВОЄНОГО БЮДЖЕТУ', decimals: 1 },
//   { value: 420, suffix: '%', label: 'СЕРЕДНІЙ ROAS В ПРОЄКТАХ' },
//   { value: 19, suffix: '+', label: 'СЕРТИФІКОВАНИХ КРЕАТИВНИХ ЕКСПЕРТІВ' }
// ];

// export default function StatsSection() {
//   return (
//     <section className="stats-section">
//       <div className="stats-grid">
//         {stats.map((stat, index) => (
//           <div key={index} className="stat-item">
//             <div className="stat-value">
//               <CountUp
//                 end={stat.value}
//                 suffix={` ${stat.suffix}`}
//                 duration={2}
//                 decimals={stat.decimals || 0}
//               />
//             </div>
//             <div className="stat-label">{stat.label}</div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }