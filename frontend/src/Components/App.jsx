import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AuthProvider from '../hoc/AuthProvider';
import Header from '../layout/Header';
import Main from '../layout/Main';
import {
  subscribeCreateChannel,
  subscribeRemoveChannel,
  subscribeRenameChannel,
} from '../store/channels/channels-slice';
import { subscribeMesseage } from '../store/messages/messages-slice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribeRemoveChannel());
    dispatch(subscribeMesseage());
    dispatch(subscribeCreateChannel());
    dispatch(subscribeRenameChannel());
  }, []);

  return (
    <AuthProvider>
      <div className="h-100 d-flex flex-column">
        <Header />
        <Main />
      </div>
    </AuthProvider>
  );
};

export default App;
