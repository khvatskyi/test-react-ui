import { useHistory } from 'react-router-dom';

import { FrameworkCard } from '../../../../components';
import { CARDS } from '../../../../data/framework-data/cards';
import { FrameworkTab } from '../../../../typings/enums/framework-tab.enum';
import { IStage } from '../../../../typings/models/framework.models';
import { IPortfolioDetails } from '../../../../typings/models/portfolio.models';
import PortfolioStagesTopBar from '../PortfolioStagesTopBar/PortfolioStagesTopBar';
import css from './DiscoverOverview.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { selectCompletedModules, selectPortfolioDetails, setPending } from '../../../../store/data.slice';
import { StageStatus } from '../../../../typings/enums/stage-status.enum';
import { ScrollBars } from '@epam/uui';
import DiscoverSummary from './DiscoverSummary';
import { selectProductProposal } from '../../../../store/ai.slice';
import { STATE_CODES } from '../PortfolioStagesLeftPanel/structure';
import { useEffect } from 'react';
import { getApiProductProposal, initApiProductProposal } from '../../../../store/api-product-proposal.slice';
import ProductProposalSummary from '../ProductProposal/ProductProposalSummary';
import { isInvalidGeneratedResponse, useShowErrorNotification, useShowErrorRetryNotification } from '../../../../utilities/notifications.utility';

export interface IDiscoverOverviewProps {
  portfolio: IPortfolioDetails;
  onUpdateClick: (e?: any) => void;
}

const DISCOVER_CARD = CARDS.find(x => x.title === FrameworkTab.Discover);

export default function DiscoverOverview({ portfolio, onUpdateClick }: IDiscoverOverviewProps) {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const completedStages = useAppSelector(selectCompletedModules);
  const productProposal = useAppSelector(selectProductProposal);
  const selectedPortfolio = useAppSelector(selectPortfolioDetails);
  const showErrorNotification = useShowErrorNotification();
  const showErrorRetryNotification = useShowErrorRetryNotification();

  useEffect(() => {
    if (portfolio?.id) {
      dispatch(getApiProductProposal({ portfolio_id: portfolio.id }));
    }
  }, [dispatch, portfolio]);

  DISCOVER_CARD.categories.forEach(category => {
    category.stages?.forEach(stage => {
      stage.status = !!completedStages.find(x => x === stage.path) ? StageStatus.Complete : StageStatus.None;
    })
  });

  const handleStageClick = (stage: IStage) => {
    if (stage.path) {
      history.push(`/portfolio/stages/${portfolio.id}?stage=${stage.path}`);
    }
  }


  const generateProductProposal = async () => {
    dispatch(setPending(true));
    try {
      await dispatch(initApiProductProposal( {portfolioId: selectedPortfolio.id} )).unwrap();
    } catch (error) {
      const errorText = error?.cause?.body?.detail ?? error.message;
      if (isInvalidGeneratedResponse(errorText)) {
        showErrorRetryNotification(generateProductProposal);
      } else {
        showErrorNotification(errorText);
      }
    } finally {
      dispatch(setPending(false));
    }
  };


  const footer = <DiscoverSummary frameworkCard={DISCOVER_CARD} generateProductProposal={generateProductProposal} />

  return (
    <div className={css.root}>
      <PortfolioStagesTopBar onUpdateClick={onUpdateClick} />
      {productProposal && 
        <ProductProposalSummary 
          portfolioId={portfolio.id} 
          stateCode={STATE_CODES.APIProductProposal} 
          productProposal={productProposal}
          title='API Product Proposal'
          description={portfolio.name}
          regenerateProductProposal={generateProductProposal}
        />
      }
      {!productProposal &&
        <div className={css.cardWrapper}>
          <ScrollBars>
            <div className={css.rootForm}>
            <FrameworkCard {...DISCOVER_CARD} 
              cx={css.card} 
              onStageClick={handleStageClick} 
              isSingleCard={true} 
              footerElement={footer} />
            </div>
          </ScrollBars>
        </div>
      }
    </div>
  )
}