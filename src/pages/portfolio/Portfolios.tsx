import { FlexCell, FlexRow, Panel } from '@epam/uui';
import css from './Portfolios.module.scss';

import { ProfileLeftPanel } from '../provider/ProfileLeftPanel';
import { PortfolioPlacehoder } from './PortfolioPlacehoder';
// import { PortfolioList } from './PortfolioList';



export function PortfoliosPage() {

  return (
    <FlexRow cx={css.root}>
      <FlexCell cx={css.leftSideProfile} minWidth={360}>
        <Panel background="surface-main" cx={css.panelProfile} shadow>
          <ProfileLeftPanel />
        </Panel>
      </FlexCell>
      <FlexCell cx={css.panelPortfolio} width="100%">
        <PortfolioPlacehoder />
        {/* <PortfolioList /> */}
      </FlexCell>
    </FlexRow>
  );
}
