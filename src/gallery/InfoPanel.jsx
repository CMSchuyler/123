import React from 'react';

const InfoPanel = ({ title, visible, onClose }) => {
  if (!visible) return null;
  
  return (
    <div 
      style={{
        position: 'fixed',
        right: '0',
        top: '0',
        width: '300px',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        padding: '20px',
        transition: 'all 0.3s ease',
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        zIndex: 1000,
        cursor: 'pointer'
      }}
      onClick={onClose}
    >
      <h2 style={{ 
        fontSize: '24px',
        marginTop: '20px',
        fontWeight: '300',
        color: '#fff'
      }}>
        {title}
      </h2>
    </div>
  );
};

export default InfoPanel;