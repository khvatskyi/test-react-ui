import { useHistory } from 'react-router-dom';
import { FlexRow } from '@epam/uui';
import css from './PortfolioDashboard.module.scss';
import { PortfolioDashboardLeftPanel, PortfolioDashboardAbout } from './components';
import { selectIsDataLoading } from '../../store/data.slice';
import { /* useAppDispatch, */ useAppSelector } from '../../hooks';

export default function PortfolioDashboard() {
  // const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsDataLoading);
  // const profile = useAppSelector(selectProfile)!;
  // useEffect(() => {
  //   dispatch(loadProfileInfo());
  // }, [dispatch]);

  const history = useHistory();
  const handlePortfolioCreate = () => {
    history.push('/portfolios/create');
  }

  return !isLoading && (
    <FlexRow cx={css.root}>
      <PortfolioDashboardLeftPanel />
      <PortfolioDashboardAbout onCreateClick={handlePortfolioCreate} />
    </FlexRow>
  );
}
