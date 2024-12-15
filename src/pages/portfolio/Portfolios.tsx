import { FlexRow } from '@epam/uui';

import { ProfileLeftPanel } from './components/ProfileLeftPanel';

import css from './Portfolios.module.scss';
import { PortfolioList } from './PortfolioList';
import { PortfolioPlacehoder } from './PortfolioPlacehoder';

export function PortfoliosPage() {
  const portfolios: { id: number, name: string }[] | null = [
    { id: 1, name: 'Pesho' },
    { id: 1, name: 'Gosho' },
    { id: 1, name: 'Stamat' },
    { id: 1, name: 'Test' }
  ];

  const handlePortfolioCreate = () => {

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
