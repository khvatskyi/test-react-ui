import { Panel, ScrollBars, FlexRow, FlexSpacer, Button, Text, FlexCell } from '@epam/uui';
import cx from 'classnames';
import css from './ProductProposalSummary.module.scss';
import { normalizeSummaryKey, normalizeSummaryKeys, STATE_CODES } from '../../../../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure';
import React from 'react';
import { SummaryExportButton } from '../../../../components/SummaryExportButton/SummaryExportButton';
import { ReactComponent as iconRefresh } from '@epam/assets/icons/navigation-refresh-outline.svg';
import { SummaryViewTitle } from '../../../../components/SummaryViewTitle/SummaryViewTitle';
import { IProductProposal, ITargetConsumer, ICapability, IGoalsAndKPIs } from '../../../../typings/models/api-product-proposal.models';
import ApiProductJorneySummarySteps from '../Modules/ApiProductJorneys/components/ApiProductJorneySummarySteps/ApiProductJorneySummarySteps';
import { IPersona } from '../../../../typings/models/product-journey.model';


const SIZES = {
  ColumnTitle: 160,
  ColumnValue: 448,
}

export interface IProductProposalSummaryProps {
  portfolioId: string;
  stateCode: STATE_CODES;
  productProposal: IProductProposal;
  title?: string;
  description?: string;
  regenerateProductProposal: () => void;
}

export default function ProductProposalSummary({ portfolioId, stateCode, productProposal, regenerateProductProposal, title, description }: IProductProposalSummaryProps) {

  const handleRegenerate = () => {
    regenerateProductProposal();
  }

  const getTextOrArrayItems = (value) => {
    return (<>
        { (typeof value === 'string') && 
          <Text fontSize='16' fontWeight='400' lineHeight='24' > {String(value)} </Text>
        }

        { (Array.isArray(value)) && 
          <ul>
            {value.map((item, index) => {
              return(
                <React.Fragment key={index}>
                  <li className={css.arrayItem}>{`${item}`}</li>
                </React.Fragment>
              )
            })}
          </ul>
        }
    </>)
  }
  const getOptionTitle = (title) => {
    return <h4 style={{ marginTop: '12px', marginBottom: '6px'}}>{title}</h4>
  }

  const getGeneralData = (data: any, skippedKey: string[] = [], allowedOnly: string[] = []) => (
    Object.entries(data)
      .filter(([key]) => !skippedKey.includes(key))
      .filter(([key]) => (allowedOnly.length === 0) || allowedOnly.includes(key))
      .map(([key, value]) =>
        <React.Fragment key={key}>
          {getOptionTitle(normalizeSummaryKey(key))}
          {getTextOrArrayItems(value)}
        </React.Fragment>
      )
  ); 
  

  const getTargetConsumerTableTopRow = (title, value) => {
    return (<>
      <FlexRow cx={cx(css.tableRow, css.borderTop, css.borderLeft, css.borderRight)} alignItems="stretch">
        <FlexCell width={ SIZES.ColumnTitle } cx={ cx(css.cellTitleColor, css.borderRight) } >
          <FlexRow cx={ cx(css.titleMargin) }>
            <Text fontSize='14' fontWeight='400' lineHeight='24' >{title}</Text>
          </FlexRow>
        </FlexCell>
        <FlexCell width={ SIZES.ColumnValue } cx={ cx(css.borderBottom, css.valueMargin) }>
          {getTextOrArrayItems(value)}
        </FlexCell>
      </FlexRow>
    </>)
  }

  const getTargetConsumerTableMidleRow = (title, value) => {
    return (<>
      <FlexRow cx={cx(css.tableRow, css.borderLeft, css.borderRight)} vPadding="12" alignItems="stretch">
        <FlexCell width={ SIZES.ColumnTitle } cx={ cx(css.cellTitleColor, css.borderRight) } >
          <FlexRow cx={ cx(css.titleMargin) }>
            <Text fontSize='14' fontWeight='400' lineHeight='24' >{title}</Text>
          </FlexRow>
        </FlexCell>
        <FlexCell width={ SIZES.ColumnValue } cx={ cx(css.borderBottom, css.valueMargin) }>
          {getTextOrArrayItems(value)}
        </FlexCell>
      </FlexRow>
    </>)
  }
  
  const getTargetConsumerTableBottomRow = (title, value) => {
    return (<>
      <FlexRow cx={cx(css.tableRow, css.borderBottom, css.borderLeft, css.borderRight)} vPadding="12" alignItems="stretch">
        <FlexCell width={ SIZES.ColumnTitle } cx={ cx(css.cellTitleColor, css.borderRight) }  >
          <FlexRow cx={ cx(css.titleMargin) }>
            <Text fontSize='14' fontWeight='400' lineHeight='24' >{title}</Text>
          </FlexRow>
        </FlexCell>
        <FlexCell width={ SIZES.ColumnValue } cx={ cx(css.valueMargin) }>
          {getTextOrArrayItems(value)}
        </FlexCell>
      </FlexRow>
    </>)
  }
  


  const getTargetConsumer = (value: ITargetConsumer) => {
    return(<>
      <h3 style={{ marginTop: '12px', marginBottom: '6px'}}>Segment name</h3>
      <Text cx={css.segmentDesc} fontSize='16' fontWeight='400' lineHeight='24' > {value.segmentName} </Text>
      
      {getTargetConsumerTableTopRow('Segment Description', value.segmentDescription)}
      {getTargetConsumerTableMidleRow('Industry Sector', value.industrySector)}
      {getTargetConsumerTableMidleRow('Organization Size', value.organizationSize)}
      {getTargetConsumerTableMidleRow('Geographical Location', value.geographicalLocation)}
      {getTargetConsumerTableMidleRow('Technical Maturity', value.technicalMaturity)}
      {getTargetConsumerTableMidleRow('Primary Use Case', value.primaryUseCase)}
      {getTargetConsumerTableMidleRow('Business Model', value.businessModel)}
      {getTargetConsumerTableMidleRow('Integration Patterns', value.integrationPatterns)}
      {getTargetConsumerTableMidleRow('Frequency And Volume', value.frequencyAndVolume)}
      {getTargetConsumerTableMidleRow('Data Sensitivity', value.dataSensitivity)}
      {getTargetConsumerTableMidleRow('Primary Pain Points Or Goals', value.primaryPainPointsOrGoals)}
      {getTargetConsumerTableBottomRow('Security Requirements', value.securityRequirements)}

    </>)
  }


  const getPersonasTable = (personas: IPersona[]) => {
    return (<>
      <h3 style={{ marginTop: '24px', marginBottom: '6px'}}>Personas</h3>
      <table className={css.roundedTable}>
        <thead>
          <tr>
            <th className={css.columnPersonaWidth}>Name</th>
            <th className={css.columnPersonaWidth}>Role</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => {
              return(
                <tr>
                  <td>{persona.name}</td>
                  <td>{persona.role}</td>
                  <td>{persona.description}</td>
                </tr>
              )
          })}
        </tbody>
      </table>
    </>)
  }


  const getCapabilityData = (capability: ICapability) => {
    return (<>
      <h3 style={{ marginTop: '24px', marginBottom: '6px'}}>• {capability.name}</h3>
      {getGeneralData(capability, [], ['description', 'category'])}

      {getOptionTitle('Owner name')}
      {getTextOrArrayItems(capability.owner.name)}
      {getOptionTitle('Owner email')}
      {capability.owner.email && <>
        {getTextOrArrayItems(capability.owner.email)}
        {getGeneralData(capability, [], ['domain', 'subdomain', 'capabilityLevel', 'lifecycleStage', 'businessValue'])}
      </>}
      {getOptionTitle('Industry standard aligment')}
      <Text fontSize='16' fontWeight='400' lineHeight='24' > {capability.industryStandardAlignment.isAligned ? 'Yes' : 'No'} </Text>
      {capability.industryStandardAlignment.standard && <>
        {getOptionTitle('Industry standard aligment')}
        {getTextOrArrayItems(capability.industryStandardAlignment.standard)}
      </>}

      {capability.keyProcesses && <>
        {getOptionTitle('Key processes')}
        {getTextOrArrayItems(capability.keyProcesses.map(item => item.name))}
      </>}
      {capability.relatedAPIs && <>
        {getOptionTitle('Related APIs')}
        {getTextOrArrayItems(capability.relatedAPIs.map(item => item.name))}
      </>}
      {capability.dependencies && <>
        {getOptionTitle('Dependancies')}
        {getTextOrArrayItems(capability.dependencies.map(item => item.name))}
      </>}
      {capability.performanceMetrics && <>
        {getOptionTitle('Performance metrics')}
        {getTextOrArrayItems(capability.performanceMetrics.map(item => item.name))}
      </>}

      {capability.governance?.complianceStandards && <>
        {getOptionTitle('Governance standards')}
        {getTextOrArrayItems(capability.governance.complianceStandards)}
      </>}

    </>)
  }

  const getGoalsAndKPIsData = (summary: IGoalsAndKPIs) => {
    return (<>
      {summary.goals.map( goal => {
        return (
          <React.Fragment key={goal.goalId}>
            {getOptionTitle('Goal')}
            {getTextOrArrayItems(goal.description)}
            {summary.objectives
              .filter(objective => objective.relatedGoalId === goal.goalId)
              .map( (objective) => {
                return (
                  <React.Fragment key={objective.objectiveId}>
                    {getOptionTitle('Objective')}
                    {getTextOrArrayItems(objective.description)}
                    {getOptionTitle('KPI(s)')}
                    <table className={css.roundedTable}>
                      <thead>
                        <tr className={css.kpiTableHeader}>
                          <th className={css.columnKpiName}>Name</th>
                          <th>Description</th>
                          <th className={css.columnKpiTarget}>Target value</th>
                          <th>Measurement method</th>
                          <th>Frequency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {summary.kpis
                          .filter(kpi => kpi.relatedObjectiveId === objective.objectiveId)
                          .map( kpi => {
                            return(
                              <React.Fragment key={kpi.kpiId}>
                                <tr className={css.rowTableTop}>
                                  <td>{kpi.name}</td>
                                  <td>{kpi.description}</td>
                                  <td>{kpi.targetValue}% growth</td>
                                  <td>{kpi.measurementMethod}</td>
                                  <td>{kpi.frequency}</td>
                                </tr>
                              </React.Fragment>
                            )}
                        )}
                      </tbody>
                    </table>
                  </React.Fragment>
                )
              })
            }
          </React.Fragment>)
      })

      }
    </>)
  }


  return productProposal && (
    <div className={css.content}>
      <ScrollBars>
        <div className={css.rootForm}>
          <Panel cx={css.formPanel} background='surface-main'>
            <FlexRow columnGap='12' cx={css.titleForm}>
              <h3 style={{ margin: '0px' }}>API Product Proposal</h3>
              <FlexSpacer />
              <SummaryExportButton summaryObject={normalizeSummaryKeys(productProposal)} />
              <Button color='primary' caption='Regenerate' icon={iconRefresh} onClick={handleRegenerate} />
            </FlexRow>
            <div className={css.scroll}>

              <SummaryViewTitle title='Product Overview' />
              {getGeneralData(productProposal.productOverview)}
              
              <SummaryViewTitle title='Value Proposition' marginTop={12} />
              {getGeneralData(productProposal.valueProposition)}

              <SummaryViewTitle title='Target Consumers' marginTop={12} />
              {productProposal.targetConsumers.map((value) => {
                return getTargetConsumer(value);
              })}

              <SummaryViewTitle title='Product Journey' marginTop={12} />
              {getPersonasTable(productProposal.productJourney.personas)}

              <h3 style={{ marginTop: '24px', marginBottom: '6px'}}>Scenario details</h3>
              {getGeneralData(productProposal.productJourney.scenario, ['id'])}

              <h3 style={{ marginTop: '24px', marginBottom: '12px'}}>Steps</h3>
              <ApiProductJorneySummarySteps steps={productProposal.productJourney.steps}/> 

              <SummaryViewTitle title='Business Model' />
              {getGeneralData(productProposal.businessModel)}

              {productProposal.capabilities.length > 0 && <>
                <SummaryViewTitle title='Capabilities' />
                {productProposal.capabilities.map((value) => {
                  return getCapabilityData(value);
                })}
              </>}

              {productProposal.goalsAndKPIs.goals.length > 0 && <>
                <SummaryViewTitle title='Goals & KPIs' />
                {getGoalsAndKPIsData(productProposal.goalsAndKPIs)}
              </>}

            </div>
          </Panel>
        </div>
      </ScrollBars>
    </div>
  );
}
