import React from 'react'
import "../styles/reset.css";
import "../styles/style.css";
import "./Header.css";
import { ArrowUpRight } from 'lucide-react';




// const Header = () => {
//   return (
//     <div className="signlang__header section__padding gradient__bg" id="home">

//     <div className="signlang__header-content">
//      <div className="label">
//         <span>powered by b.skochynska</span>
//      </div>
//      <div className="text">
//       <h1>Sign Language Recognition</h1>
//       <p>
//       It has been proven in studies that learning sign language keeps you on your feet as you age and also increase your thinking power.Also learning sign language will help you communicate with 72  Million Speakers worldwide.
//       </p>
//       </div>
//       <div className="signlang__detect-nav-btn">
//         <span className="detect-nav-btn__text">try now</span>
//         <span className="detect-nav-btn__icon"><i class="material-icons">south_east</i></span>
//       </div>

//     </div>
//     <div className="signlang__header-image">
//       <img src={SignHand} alt='SIGN-HAND'/>
//     </div>
//   </div>
//   )
// }

// export default Header


const Header = () => {
    return (
      <section className="header-section">
         <div className="left-decoration" />
        <div className="header-text">

        
          <h1>
            <span className="blue">УКРАЇНСЬКА</span> <br />
            ЖЕСТОВА <br />
            МОВА
          </h1>
          <p className="subtitle">
          Вебзастосунок для доступного, цікавого і ефективного вивчення української жестової мови. 
          </p>
  
          <div className="header-actions">
            <div className="moto-wrapper">
                <span>Навчися розуміти без слів</span>

            </div>
            <div>
            <button className="brand-button">перейти до вивчення 
            <ArrowUpRight size={30} style={{ marginLeft: '10px' }} />
            </button>
            </div>
          </div>
        </div>
  
        <div className="header-image">
          <img src="/header-image.jpg" alt="Team" className="main-image" />
          <div className="certificates">
            <p>Учасники Київського театру міміки і жесту «Райдуга»</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default Header;