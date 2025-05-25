import React from 'react';

const InfoPanel = ({ title, visible, onClose, position }) => {
  if (!visible) return null;
  
  // If position is negative (left side), show panel on right side
  // If position is positive (right side), show panel on left side
  const side = position < 0 ? 'right' : 'left';
  
  return (
    <div 
      style={{
        position: 'fixed',
        [side]: '0',
        top: '0',
        width: '300px',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        padding: '20px',
        transition: 'all 0.3s ease',
        transform: visible ? 'translateX(0)' : `translateX(${side === 'left' ? '-100%' : '100%'})`,
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