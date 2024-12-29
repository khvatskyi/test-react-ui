import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FlexRow } from '@epam/uui';

import css from './Portfolios.module.scss';
import { ProfileLeftPanel, PortfolioList, PortfolioPlacehoder } from './components';
import { loadPortfolios, loadProfileInfo, selectIsDataLoading, selectPortfolios, selectProfile } from '../../store/data.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';

export default function Portfolios() {

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

  return !isLoading && (
    <FlexRow cx={css.root}>
      <ProfileLeftPanel profile={profile} />
      {
        !portfolios?.length
          ? <PortfolioPlacehoder onCreateClick={handlePortfolioCreate} />
          : <PortfolioList portfolios={portfolios} onCreateClick={handlePortfolioCreate} />
      }
    </FlexRow>
  );
}
