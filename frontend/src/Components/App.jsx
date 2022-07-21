import AuthProvider from '../hoc/AuthProvider';
import Header from '../layout/Header';
import Main from '../layout/Main';

const App = () => {
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
