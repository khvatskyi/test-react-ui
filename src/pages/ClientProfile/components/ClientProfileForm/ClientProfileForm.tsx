import {
  FlexCell, FlexRow, FlexSpacer, Panel, LabeledInput, RichTextView, TextInput, TextArea,
  PickerInput, RadioGroup, Text, Button
} from '@epam/uui';
import { IFormApi, useArrayDataSource } from '@epam/uui-core';

import css from './ClientProfileForm.module.scss';
import { IClientProfileInfo } from '../../../../typings/models/client-info.models';
import { ItemList, KeyServicesOrProducts } from '..';
import { ISimpleIndustry } from '../../../../typings/models/industry.model';

export interface IClientProfileFormProps {
  form: IFormApi<IClientProfileInfo>
  industries: ISimpleIndustry[];
  isExtendedForm?: boolean;
  onEditClientDefinition: () => void;
}

export default function ClientProfileForm({ form, isExtendedForm = false, industries, onEditClientDefinition }: IClientProfileFormProps) {

  const { lens } = form;
  const industryDataSource = useArrayDataSource({ items: structuredClone(industries) }, []);

  return (
    <div className={css.rootForm}>
      <FlexCell width='100%'>
        <RichTextView >
          <h2 style={{ textAlign: 'center' }}>{isExtendedForm ? 'Client profile' : 'Add client profile'}</h2>
        </RichTextView>
        <FlexSpacer />
      </FlexCell>
      {
        isExtendedForm &&
        <Text fontSize='16' lineHeight='30' color='primary'>
          Please check enhanced client profile based on the information provided and do any corrections if needed.
        </Text>
      }
      <Panel cx={css.formPanel + (isExtendedForm ? ` ${css.extendedForm}` : '')} >
        <FlexCell width='100%'>
          <FlexRow vPadding='24'>
            <FlexCell minWidth={324} width='100%'>
              <LabeledInput htmlFor='companyName' label='Name' maxLength={72} charCounter={true} {...lens.prop('name').toProps()}>
                <TextInput  {...lens.prop('name').toProps()} id='companyName' placeholder='Please type text' maxLength={72} isDisabled={isExtendedForm} />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding='24'>
            <FlexCell minWidth={324} width='100%'>
              <LabeledInput htmlFor='companyDescription' label='Description' {...lens.prop('description').toProps()}>
                <TextArea {...lens.prop('description').toProps()} id='companyDescription' placeholder='Please type text' isDisabled={isExtendedForm} rows={5} />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding='24'>
            <FlexCell minWidth={324} width='100%'>
              <LabeledInput htmlFor={'companyIndustry'} label='Industry' {...lens.prop('industry').toProps()}>
                <PickerInput
                  {...lens.prop('industry').toProps()}
                  dataSource={industryDataSource}
                  selectionMode='single'
                  getName={(item) => item!.industry}
                  valueType='id'
                  id={'companyIndustry'}
                  placeholder='Please select'
                  isDisabled={isExtendedForm}
                />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding='24'>
            <FlexCell minWidth={324} width='100%'>
              <LabeledInput htmlFor={'companySize'} label='Size' {...lens.prop('size').toProps()}>
                <RadioGroup
                  {...lens.prop('size').toProps()}
                  name='companySize'
                  items={[
                    { id: 'Small', name: 'Small' }, { id: 'Medium', name: 'Medium' }, { id: 'Large', name: 'Large' },
                  ]}
                  direction='horizontal'
                  isDisabled={isExtendedForm}
                />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding='24'>
            <FlexCell minWidth={324} width='100%'>
              <LabeledInput cx={css.optionalInfoOnTheRightSide} htmlFor='coreProducts' label='Core products / Business lines' info='Core products / Business lines' isOptional={true} {...lens.prop('coreProducts').toProps()}>
                <TextArea {...lens.prop('coreProducts').toProps()} id='coreProducts' placeholder='Please type text' isDisabled={isExtendedForm} />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          {isExtendedForm && (<>
            <FlexRow vPadding='24'>
              <Button caption='Edit client definition' color='primary' onClick={onEditClientDefinition} />
            </FlexRow>
            <FlexRow>
              <h3>Key Highlights</h3>
            </FlexRow>
            <FlexCell>
              <LabeledInput label='Strengths' />
              <ItemList form={form} controlName='strengths' />
            </FlexCell>
            <FlexRow vPadding='24'>
              <FlexCell minWidth={324} width='100%'>
                <LabeledInput htmlFor='competitiveEdge' label='Competitive edge' {...lens.prop('competitiveEdge').toProps()}>
                  <TextInput {...lens.prop('competitiveEdge').toProps()} id='competitiveEdge' placeholder='Please type text' />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
            <FlexRow vPadding='24'>
              <FlexCell minWidth={324} width='100%'>
                <LabeledInput htmlFor='marketPosition' label='Market Position' {...lens.prop('marketPosition').toProps()}>
                  <TextInput {...lens.prop('marketPosition').toProps()} id='marketPosition' placeholder='Please type text' />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
            <FlexRow>
              <h3>Main Operations</h3>
            </FlexRow>
            <FlexRow vPadding='24'>
              <FlexCell minWidth={324} width='100%'>
                <LabeledInput htmlFor='headquarters' label='Headquarters' {...lens.prop('headquarters').toProps()}>
                  <TextInput {...lens.prop('headquarters').toProps()} id='headquarters' placeholder='Please type text' />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
            <FlexCell>
              <LabeledInput label='Primary locations' />
              <ItemList form={form} controlName='primaryLocations' />
            </FlexCell>
            <FlexRow>
              <h3>Digital Presence</h3>
            </FlexRow>
            <FlexRow vPadding='24'>
              <FlexCell minWidth={324} width='100%'>
                <LabeledInput htmlFor='website' label='Website' {...lens.prop('website').toProps()}>
                  <TextInput {...lens.prop('website').toProps()} id='website' placeholder='Please type text' />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
            <FlexRow>
              <h4>Social Media</h4>
            </FlexRow>
            <FlexRow vPadding='24'>
              <FlexCell minWidth={324} width='100%'>
                <LabeledInput htmlFor='linkedIn' label='LinkedIn' {...lens.prop('linkedIn').toProps()}>
                  <TextInput {...lens.prop('linkedIn').toProps()} id='linkedIn' placeholder='Please type text' />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
            <FlexRow vPadding='24'>
              <FlexCell minWidth={324} width='100%'>
                <LabeledInput htmlFor='twitter' label='Twitter' {...lens.prop('twitter').toProps()}>
                  <TextInput {...lens.prop('twitter').toProps()} id='twitter' placeholder='Please type text' />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
            <FlexRow vPadding='24'>
              <FlexCell minWidth={324} width='100%'>
                <LabeledInput htmlFor='facebook' label='Facebook' {...lens.prop('facebook').toProps()}>
                  <TextInput {...lens.prop('facebook').toProps()} id='facebook' placeholder='Please type text' />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
            <FlexCell>
              <LabeledInput label='Other' />
              <ItemList form={form} controlName='otherSocialMedia' />
            </FlexCell>

            <FlexRow>
              <h3>Business Details</h3>
            </FlexRow>
            <FlexRow vPadding='24'>
              <FlexCell minWidth={324} width='100%'>
                <LabeledInput htmlFor='revenue' label='Revenue' {...lens.prop('revenue').toProps()}>
                  <TextInput {...lens.prop('revenue').toProps()} id='revenue' placeholder='Please type text' />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
            <FlexRow vPadding='24'>
              <FlexCell minWidth={324} width='100%'>
                <LabeledInput htmlFor='numberOfEmployees' label='Number of Employees' {...lens.prop('numberOfEmployees').toProps()}>
                  <TextInput {...lens.prop('numberOfEmployees').toProps()} id='numberOfEmployees' placeholder='Please type text' />
                </LabeledInput>
              </FlexCell>
            </FlexRow>

            <FlexRow>
              <h4>Key Services or Products</h4>
            </FlexRow>
            <FlexCell>
              <KeyServicesOrProducts form={form} controlName='keyServicesOrProducts' />
            </FlexCell>

            <FlexRow>
              <h3>Strategic Goals</h3>
            </FlexRow>
            <FlexCell>
              <LabeledInput label='Short-term' />
              <ItemList form={form} controlName='strategicGoalsShortTerm' />
            </FlexCell>
            <FlexCell>
              <LabeledInput label='Long-term' />
              <ItemList form={form} controlName='strategicGoalsLongTerm' />
            </FlexCell>

            <FlexRow>
              <h3>Partnerships or Affiliations</h3>
            </FlexRow>
            <FlexCell>
              <ItemList form={form} controlName='partnershipsOrAffiliations' />
            </FlexCell>

            <FlexRow>
              <h3>Contact Information</h3>
            </FlexRow>
            <FlexRow vPadding='24'>
              <FlexCell minWidth={324} width='100%'>
                <LabeledInput htmlFor='phone' label='Phone' {...lens.prop('phone').toProps()}>
                  <TextInput {...lens.prop('phone').toProps()} id='phone' placeholder='Please type text' />
                </LabeledInput>
              </FlexCell>
            </FlexRow>

            <FlexRow vPadding='24'>
              <FlexCell minWidth={324} width='100%'>
                <LabeledInput htmlFor='email' label='Email' {...lens.prop('email').toProps()}>
                  <TextInput {...lens.prop('email').toProps()} id='email' placeholder='Please type text' />
                </LabeledInput>
              </FlexCell>
            </FlexRow>

            <FlexRow vPadding='24'>
              <FlexCell minWidth={324} width='100%'>
                <LabeledInput htmlFor='address' label='Address' {...lens.prop('address').toProps()}>
                  <TextInput {...lens.prop('address').toProps()} id='address' placeholder='Please type text' />
                </LabeledInput>
              </FlexCell>
            </FlexRow>


          </>)}
        </FlexCell>
      </Panel>
    </div>
  )
}
