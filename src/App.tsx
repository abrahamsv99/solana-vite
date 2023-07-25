
import { ContextProvider } from './contexts/ContextProvider';
import { AppBar } from './commponents/AppBar';
import Notifications from './commponents/Notification'
import '@solana/wallet-adapter-react-ui/styles.css'
import './index.css'
import { UnityGame } from './commponents/UnityGame';
// require('@solana/wallet-adapter-react-ui/styles.css');
// require('../styles/globals.css');

const App: React.FC = () => {
  return (
    <>
      <ContextProvider>
        <div className="flex flex-col h-screen">
          <Notifications />
          <AppBar />
          <UnityGame />
        </div>
      </ContextProvider>
    </>
  );
};

export default App;
