import React from 'react';
import './CulturalEvents.css';
import { CULTURAL_EVENTS } from '../../../data/doloresData';

export default function CulturalEvents({ onExploreRoute }) {
  return (
    <div className="cultural-events-view">
      <div className="events-header">
        <span className="events-badge">📅 AGENDA CULTURAL Y TRADICIONES</span>
        <h2 className="events-title">Festividades y Tradiciones de Dolores Hidalgo</h2>
        <p className="events-subtitle">
          Vive la historia y la magia de la Cuna de la Independencia. Conoce los magnos eventos cívicos, ferias artesanales y festivales gastronómicos a lo largo del año.
        </p>
      </div>

      <div className="events-grid">
        {CULTURAL_EVENTS.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-card-media">
              <img src={event.image} alt={event.title} />
              <span className="event-badge-tag">{event.badge}</span>
            </div>
            <div className="event-card-body">
              <span className="event-date-pill">🗓️ {event.date}</span>
              <h3 className="event-card-title">{event.title}</h3>
              <p className="event-location-text">📍 {event.location}</p>
              <p className="event-desc-text">{event.description}</p>
              <button className="btn-event-plan" onClick={onExploreRoute}>
                🗺️ Explorar Puntos de Interés
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
