import { FlexRow, FlexCell, Text, FlexSpacer, LinkButton } from '@epam/uui';

import css from './UncompletedModule.module.scss';
import { getStateTitle, STATE_CODES } from '../PortfolioStagesLeftPanel/structure';
import { useHistory } from 'react-router-dom';
import React from 'react';

const LABELS = {
  text: 'In order to continue, complete following modules first:'
};

export interface IUncompletedModuleProps {
    portfolioId: string;
    stageCodes: STATE_CODES[];
}

export default function UncompletedModule({ portfolioId, stageCodes }: IUncompletedModuleProps) {
  const history = useHistory();

  const onGoButtonClick = (event) => {
    const stage = event.currentTarget.dataset.stage;
    history.push(`/portfolio/stages/${portfolioId}?stage=${stage}`);
  };

  return (
    <FlexCell cx={css.root} width='100%'>
      <FlexSpacer />
      <FlexRow>
        <div style={{ textAlign: 'center' }}>
          <FlexRow>
          <FlexSpacer />
          <img src='/icons/uncompleted-module.svg' alt=''></img>
          <FlexSpacer />
          </FlexRow>
          <FlexRow cx={css.labelContainer}>
            <FlexSpacer />
              <Text fontSize='16' fontWeight='400' > {LABELS.text} </Text>
            <FlexSpacer />
          </FlexRow>
          {stageCodes.map( (stage, index) => {
            return ( 
              <React.Fragment key={index}>
                <FlexRow>
                  <FlexSpacer />
                    <LinkButton 
                      caption={getStateTitle(stage)} 
                      cx={css.linkButton}
                      rawProps={ { 'data-stage': stage } } 
                      color='primary' 
                      underline='solid' 
                      size='42' 
                      // link={ { pathname: `/portfolio/stages/${portfolioId}?stage=${stage}` } }
                      onClick={onGoButtonClick} 
                      />
                  <FlexSpacer />
                </FlexRow>
              </React.Fragment>
            )}
          )}
        </div>
      </FlexRow>
      <FlexSpacer />
    </FlexCell>
  );
}
