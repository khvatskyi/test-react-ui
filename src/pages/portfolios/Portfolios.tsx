import { FlexRow } from '@epam/uui';

import { ProfileLeftPanel } from './components/ProfileLeftPanel';

import css from './Portfolios.module.scss';
import { PortfolioList } from './PortfolioList';
import { PortfolioPlacehoder } from './PortfolioPlacehoder';
import { useHistory } from 'react-router-dom';

export function PortfoliosPage() {

  const history = useHistory();
  const portfolios: { id: number, name: string }[] | null = [
    { id: 1, name: 'Pesho' },
    { id: 2, name: 'Gosho' },
    { id: 3, name: 'Stamat' },
    { id: 4, name: 'Test' }
  ];
  // const portfolios: { id: number, name: string }[] | null = null;

  const handlePortfolioCreate = () => {
    history.push('/portfolios/create');
  }

  return (
    <FlexRow cx={css.root}>
      <ProfileLeftPanel />
      { !portfolios
        ? <PortfolioPlacehoder onCreateClick={handlePortfolioCreate} />
        : <PortfolioList portfolios={portfolios} onCreateClick={handlePortfolioCreate} /> }
    </FlexRow>
  );
}
