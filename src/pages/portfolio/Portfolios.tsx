import { FlexCell, FlexRow } from '@epam/uui';

import { ProfileLeftPanel } from './components/ProfileLeftPanel';
import { PortfolioPlacehoder } from './PortfolioPlacehoder';
// import { PortfolioList } from './PortfolioList';

import css from './Portfolios.module.scss';

export function PortfoliosPage() {

  return (
    <FlexRow cx={css.root}>
      <ProfileLeftPanel />
      <FlexCell cx={css.panelPortfolio} width="100%">
        <PortfolioPlacehoder />
        {/* <PortfolioList /> */}
      </FlexCell>
    </FlexRow>
  );
}
