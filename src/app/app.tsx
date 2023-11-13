import './app.scss';

import { Header } from '@widgets/header';
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
