import { FlexCell, FlexRow, FlexSpacer, LabeledInput, Panel, PickerInput, RichTextView, TextArea, TextInput } from '@epam/uui';

import { IPortfolioDetails } from '../portfolioDetails.models';
import { IFormApi, useArrayDataSource } from '@epam/uui-core';
import { appData } from '../../../data/source';

import css from './PortfolioForm.module.scss';

interface IPortfolioDetailsFormProps {
  form: IFormApi<IPortfolioDetails>
}

export function PortfolioDetailsForm({ form: { lens } }: IPortfolioDetailsFormProps) {

  const industryDataSource = useArrayDataSource(
    {
      items: appData.industries
    },
    []
  );

  return (
    <div className={css.rootForm}>
      <FlexCell width='100%'>
        <RichTextView >
          <h2 style={{ textAlign: 'center' }}>{lens.prop('name').toProps().value || '_'}</h2>
        </RichTextView>
        <FlexSpacer />
      </FlexCell>
      <Panel cx={css.formPanel} >
        <FlexCell width='100%'>
          <FlexRow vPadding='12'>
            <FlexCell minWidth={324} width='100%'>
              <LabeledInput htmlFor='portfolioName' label='Portfolio name' {...lens.prop('name').toProps()}>
                <TextInput {...lens.prop('name').toProps()} id='portfolioName' placeholder='Enter a text' />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding='12'>
            <FlexCell minWidth={324} width='100%'>
              <LabeledInput htmlFor='portfolioDescription' label='Description' {...lens.prop('description').toProps()}>
                <TextArea {...lens.prop('description').toProps()} id='portfolioDescription' placeholder='What this portfolio is about?' />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow>
            <FlexCell minWidth={324} width='100%'>
              <LabeledInput htmlFor={'portfolioIndustry'} label='Industry' {...lens.prop('industry').toProps()}>
                <PickerInput
                  {...lens.prop('industry').toProps()}
                  dataSource={industryDataSource}
                  selectionMode='single'
                  getName={(item) => item!.industry}
                  valueType='id'
                  id={'portfolioIndustry'}
                  placeholder='Please select'
                />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding='12'>
            <FlexCell minWidth={324} width='100%'>
              <LabeledInput htmlFor='goalsOrObjectives' label='Goals ? Objectives' {...lens.prop('goalsOrObjectives').toProps()}>
                <TextArea {...lens.prop('goalsOrObjectives').toProps()} id='goalsOrObjectives' placeholder='What business is trying to achieve with this portfolio?' />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding='12'>
            <FlexCell minWidth={324} width='100%'>
              <LabeledInput htmlFor='businessCapabilities' label='Business Capabilities' info='Business capabilities' {...lens.prop('businessCapabilities').toProps()}>
                <TextArea {...lens.prop('businessCapabilities').toProps()} id='businessCapabilities' placeholder='What business capabilities are in the scope of this portfolio?' />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding='12'>
            <FlexCell minWidth={324} width='100%'>
              <LabeledInput htmlFor='industryStandards' label='Industry Standards' info='Industry Standards' {...lens.prop('industryStandards').toProps()}>
                <TextArea {...lens.prop('industryStandards').toProps()} id='industryStandards' placeholder='Enter a text' />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding='12'>
            <FlexCell minWidth={324} width='100%'>
              <LabeledInput htmlFor='keyPartners' label='Key Partners' info='Key Partners' {...lens.prop('keyPartners').toProps()}>
                <TextArea {...lens.prop('keyPartners').toProps()} id='keyPartners' placeholder='Enter a text' />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding='12'>
            <FlexCell minWidth={324} width='100%'>
              <LabeledInput htmlFor='keySuppliers' label='Key Suppliers' info='Key Suppliers' {...lens.prop('keySuppliers').toProps()}>
                <TextArea {...lens.prop('keySuppliers').toProps()} id='keySuppliers' placeholder='Enter a text' />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
        </FlexCell>
      </Panel>
    </div>
  )
}