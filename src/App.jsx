import Scene from './gallery/Scene';
import InfoPanel from './gallery/InfoPanel';
import { useState } from 'react';

function App() {
  const [panelInfo, setPanelInfo] = useState({
    visible: false,
    title: ''
  });

  const handleFrameClick = (title) => {
    setPanelInfo(prev => ({
      visible: !prev.visible || prev.title !== title,
      title
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
      />
    </>
  );
}

export default App;