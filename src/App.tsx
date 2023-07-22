
import { ContextProvider } from './contexts/ContextProvider';
import { AppBar } from './commponents/AppBar';
import { UnityGame } from './commponents/UnityGame';
import Notifications from './commponents/Notification'
import '@solana/wallet-adapter-react-ui/styles.css'
import './index.css'
import { OverImage } from './commponents/OverImage';
// require('@solana/wallet-adapter-react-ui/styles.css');
// require('../styles/globals.css');

const App: React.FC = () => {
  return (
    <>
      <ContextProvider>
        <div className="flex flex-col h-screen">
          <Notifications />
          <AppBar />
          <OverImage />
          <UnityGame />
        </div>
      </ContextProvider>
    </>
  );
};

export default App;
