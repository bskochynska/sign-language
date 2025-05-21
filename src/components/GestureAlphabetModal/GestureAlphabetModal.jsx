import React from 'react';
import './GestureAlphabetModal.css';

const GestureAlphabetModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
const letters = ['А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж', 'З', 'И', 'І', 'Ї', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ю', 'Я']

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-content-headline">Алфавіт мови жестів</h2>
        <div className="alphabet-grid">
  {letters.map((letter) => (
    <div key={letter} className="alphabet-item">
      <img src={`/SignImages/${letter}.png`} alt={`litera-${letter}`} />
    </div>
  ))}
</div>
        <button className="close-btn" onClick={onClose}>Закрити</button>
      </div>
    </div>
  );
};

export default GestureAlphabetModal;
