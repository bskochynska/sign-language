import React from "react";
import "./WhyUs.css";
import groupImage from "../../assests/SignImages/A.png"; // Place your image in 'src/assets' folder

const WhyUs = () => {
  return (
    <section className="why-us">
      <div className="why-us__image-section">
        <img src={groupImage} alt="Team working" className="why-us__image" />
        <section class="cards-section">
  <div class="card">
    <div class="card-header">
      <h3>Досвід роботи з великими бюджетами</h3>
      <span class="card-number">01</span>
    </div>
    <p>4.900.000 $ — загальна сума успішно використаного рекламного бюджету</p>
  </div>
  <div class="card">
    <div class="card-header">
      <h3>Досвід роботи з різними нішами</h3>
      <span class="card-number">02</span>
    </div>
    <p>Працювали з понад 200+ проєктами</p>
  </div>
  <div class="card">
    <div class="card-header">
      <h3>Офіційне підтвердження нашої експертності</h3>
      <span class="card-number">03</span>
    </div>
    <p>Офіційні партнери Meta business. Тільки сертифіковані фахівці в команді</p>
  </div>
  <div class="card">
    <div class="card-header">
      <h3>Цінуємо свою репутацію</h3>
      <span class="card-number">04</span>
    </div>
    <p>Більшість наших клієнтів приходить до нас за рекомендацією. Вибудовуємо менеджмент високого рівня в кожному з проєктів</p>
  </div>
</section>
      </div>
      <div className="why-us__values-section">
        <h2>НАШІ ПРИНЦИПИ ТА ЦІННОСТІ</h2>
        <div className="why-us__value-card">
          <div className="why-us__value-icon">02</div>
          <div>
            <h5>ЕКСПЕРТНІСТЬ НА КОЖНОМУ ЕТАПІ</h5>
          </div>
        </div>
        <div className="why-us__pagination">
          <button>&larr;</button>
          <button>&rarr;</button>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;