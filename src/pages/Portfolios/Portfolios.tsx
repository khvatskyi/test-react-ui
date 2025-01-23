import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FlexRow } from '@epam/uui';

import css from './Portfolios.module.scss';
import { ProfileLeftPanel, PortfolioList, PortfolioPlacehoder } from './components';
import { loadPortfolios, loadProfileInfo, selectIsDataLoading, selectPortfolios, selectProfile } from '../../store/data.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useUuiContext } from '@epam/uui-core';
import StartWizard from '../../components/StartWizard/StartWizard';

export default function Portfolios() {

  const dispatch = useAppDispatch();
  const portfolios = useAppSelector(selectPortfolios);
  const isLoading = useAppSelector(selectIsDataLoading);
  const profile = useAppSelector(selectProfile)!;

  useEffect(() => {
    dispatch(loadPortfolios());
    dispatch(loadProfileInfo());
  }, [dispatch]);

  const { uuiModals } = useUuiContext();
  const history = useHistory();
  const handlePortfolioCreate = () => {
    if (portfolios?.length) {
      history.push('/portfolios/create');
    } else {
          uuiModals
              .show<string>((props) => <StartWizard { ...props } activeStep={2} />)
              .then((result) => {
                history.push('/portfolios/create');
              })
              .catch(() => {}) 
     }
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
