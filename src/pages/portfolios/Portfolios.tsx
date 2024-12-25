import { FlexRow } from '@epam/uui';

import { ProfileLeftPanel } from './components/ProfileLeftPanel';
import DataLoading from '../../components/DataLoading';

import css from './Portfolios.module.scss';
import { PortfolioList } from './PortfolioList';
import { PortfolioPlacehoder } from './PortfolioPlacehoder';
import { useHistory } from 'react-router-dom';
import { loadPortfolios, loadProfileInfo, selectIsDataLoading, selectPortfolios, selectProfile } from '../../store/data.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';

export function PortfoliosPage() {

  const dispatch = useAppDispatch();
  const portfolios = useAppSelector(selectPortfolios);
  const isLoading = useAppSelector(selectIsDataLoading);
  const profile = useAppSelector(selectProfile)!;

  useEffect(() => {
    dispatch(loadPortfolios());
    dispatch(loadProfileInfo());
  }, [dispatch]);

  const history = useHistory();
  const handlePortfolioCreate = () => {
    history.push('/portfolios/create');
  }

  return isLoading ? <DataLoading/> : (
    <FlexRow cx={css.root}>
      <ProfileLeftPanel profile={profile} />
      { !portfolios?.length
        ? <PortfolioPlacehoder onCreateClick={handlePortfolioCreate} />
        : <PortfolioList portfolios={portfolios} onCreateClick={handlePortfolioCreate} /> }
    </FlexRow>
  );
}
