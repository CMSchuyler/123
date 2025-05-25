import Scene from './gallery/Scene';
import InfoPanel from './gallery/InfoPanel';
import { useState } from 'react';

function App() {
  const [panelInfo, setPanelInfo] = useState({
    visible: false,
    title: '',
    position: 0
  });

  const handleFrameClick = (title, position) => {
    setPanelInfo(prev => ({
      visible: !prev.visible || prev.title !== title,
      title,
      position
    }));
  };

  const handlePanelClose = () => {
    setPanelInfo(prev => ({
      ...prev,
      visible: false
    }));
  };

  return (
    <>
      <Scene onFrameClick={handleFrameClick} />
      <InfoPanel 
        title={panelInfo.title}
        visible={panelInfo.visible}
        onClose={handlePanelClose}
        position={panelInfo.position}
      />
    </>
  );
}

export default App;