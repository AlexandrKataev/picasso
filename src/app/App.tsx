import { Header } from '@layouts/header';
import './App.scss';
import { Routing } from './Routing';

export const App = () => {
  return (
    <>
      <main>
        <Header />
        <Routing />
      </main>
    </>
  );
};
