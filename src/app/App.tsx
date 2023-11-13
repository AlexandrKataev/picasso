import { Header } from '@widgets/header';
import './app.scss';
import { Routing } from './routing';

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routing />
      </main>
    </>
  );
};
