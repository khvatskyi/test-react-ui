import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, FlexRow, FlexCell, FlexSpacer, Panel } from '@epam/uui';

import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { loadPortfolio, loadPortfolios, selectPortfolioDetails } from '../../../../../../../store/data.slice';

import css from './ModuleValuePropositionTopBar.module.scss';
import PortfolioPicker from '../../../../../../../components/PortfolioPicker/PortfolioPicker';
import { getStateTitle, STATE_CODES } from '../../../../PortfolioStagesLeftPanel/structure';

export interface IModuleValuePropositionTopBarProps {
  onUpdateClick: () => void
}

export default function ModuleValuePropositionTopBar({ onUpdateClick}: IModuleValuePropositionTopBarProps) {
  const dispatch = useAppDispatch();
  const selectedPortfolio = useAppSelector(selectPortfolioDetails);
  const history = useHistory();

  useEffect(() => {
    dispatch(loadPortfolios());
  }, [dispatch]);

  const handlePortfolioChange = (id: string) => {
    dispatch(loadPortfolio(id));
    history.push(`${id}?stage=${STATE_CODES.ValueProposition}`);
  };

  return  (
    <Panel cx={css.buttonPanel}>
      <FlexRow columnGap='24' cx={css.buttonPanel}>
        <h2>{getStateTitle(STATE_CODES.ValueProposition)}</h2>
        <FlexCell width='auto'>
          <PortfolioPicker portfolio={selectedPortfolio} onPortfolioChange={handlePortfolioChange}/>
        </FlexCell>
        <FlexSpacer />
        <Button caption='Reset progress' color='critical' fill='outline' onClick={onUpdateClick} />
      </FlexRow>        
    </Panel>
  );
}
