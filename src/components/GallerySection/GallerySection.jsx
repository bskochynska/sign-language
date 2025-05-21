import React from 'react';
import './GallerySection.css';
import photo1 from '../../assests/gallery-1.svg';
import photo2 from '../../assests/gallery-2.svg';
import photo3 from '../../assests/gallery-3.svg';


const team = [
  { title: 'ДОСТУПНІСТЬ', subtitle: '[ accessibility ]', image: photo1 },
  { title: 'ЗАЛУЧЕНІСТЬ', subtitle: '[ inclusivity ]', image: photo2 },
  { title: 'ПОВАГА', subtitle: '[respect ]', image: photo3 },
];

export default function GallerySection() {
    return (
        <section className="team-grid">
          {team.map((item, index) => (
            <div className="team-card" key={index}>
              <img src={item.image} alt={item.title} className="team-image" />
              <div className="team-overlay">
                <p className="team-subtitle">{item.subtitle}</p>
                <h3 className="team-title">{item.title}</h3>
              </div>
            </div>
          ))}
        </section>
      );
    }