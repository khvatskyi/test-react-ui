import {
  FlexCell, FlexRow, FlexSpacer, Panel, LabeledInput, RichTextView, TextInput, TextArea,
  PickerInput, RadioGroup, Text, Button
} from '@epam/uui';
import { IFormApi, useArrayDataSource } from '@epam/uui-core';

import { IClientProfileInfo } from '../ClientProfile.models';
import { appData } from '../../../data/source';
import css from './ClientProfileForm.module.scss';
import { ItemList } from './ItemList';

interface IClientProfileFormProps {
  form: IFormApi<IClientProfileInfo>
  isExtendedForm?: boolean;
  onEditClientDefinition: () => void;
}

export function ClientProfileForm({ form, isExtendedForm = false, onEditClientDefinition }: IClientProfileFormProps) {

  const { lens } = form;

  const industryDataSource = useArrayDataSource(
    {
      items: appData.industries
    },
    []
  );

  return (
    <div className={css.rootForm}>
      <FlexCell width="100%">
        <RichTextView >
          <h2 style={{ textAlign: "center" }}>Add client profile</h2>
        </RichTextView>
        <FlexSpacer />
      </FlexCell>
      {
        isExtendedForm &&
        <Text fontSize="16" lineHeight="30" color="primary">
          Please check enhanced client profile based on the information provided and do any corrections if needed.
        </Text>
      }
      <Panel cx={css.formPanel + (isExtendedForm ? ` ${css.extendedForm}` : '')} >
        <FlexCell width="100%">
          <FlexRow vPadding="24">
            <FlexCell minWidth={324} width="100%">
              <LabeledInput htmlFor="companyName" label="Name" maxLength={72} charCounter={true} {...lens.prop('name').toProps()}>
                <TextInput  {...lens.prop('name').toProps()} id="companyName" placeholder="Please type text" maxLength={72} isDisabled={isExtendedForm} />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding="24">
            <FlexCell minWidth={324} width="100%">
              <LabeledInput htmlFor="companyDescription" label="Description" {...lens.prop('description').toProps()}>
                <TextArea {...lens.prop('description').toProps()} id="companyDescription" placeholder="Please type text" isDisabled={isExtendedForm} rows={5} />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding="24">
            <FlexCell minWidth={324} width="100%">
              <LabeledInput htmlFor={'companyIndustry'} label="Industry" {...lens.prop('industry').toProps()}>
                <PickerInput
                  {...lens.prop('industry').toProps()}
                  dataSource={industryDataSource}
                  selectionMode="single"
                  getName={(item) => item!.industry}
                  valueType="id"
                  id={'companyIndustry'}
                  placeholder="Please select"
                  isDisabled={isExtendedForm}
                />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding="24">
            <FlexCell minWidth={324} width="100%">
              <LabeledInput htmlFor={'companySize'} label="Size" {...lens.prop('size').toProps()}>
                <RadioGroup
                  {...lens.prop('size').toProps()}
                  name="companySize"
                  items={[
                    { id: 'Small', name: 'Small' }, { id: 'Medium', name: 'Medium' }, { id: 'Large', name: 'Large' },
                  ]}
                  direction="horizontal"
                  isDisabled={isExtendedForm}
                />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding="24">
            <FlexCell minWidth={324} width="100%">
              <LabeledInput htmlFor="coreProducts" label="Core products / Business lines" info="Core products / Business lines" isOptional={true} {...lens.prop('coreProducts').toProps()}>
                <TextArea {...lens.prop('coreProducts').toProps()} id="coreProducts" placeholder="Please type text" isDisabled={isExtendedForm} />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          {isExtendedForm && (<>
            <FlexRow vPadding="24">
              <Button caption='Edit client definition' color='primary' onClick={onEditClientDefinition} />
            </FlexRow>
            <FlexRow>
              <h3>Key Highlights</h3>
            </FlexRow>
            <FlexCell>
              <LabeledInput label='Strengths' />
              <ItemList form={form} controlName='strengths' />
            </FlexCell>
            <FlexRow vPadding="24">
              <FlexCell minWidth={324} width="100%">
                <LabeledInput htmlFor="competitiveEdge" label="Competitive edge" {...lens.prop('competitiveEdge').toProps()}>
                  <TextInput {...lens.prop('competitiveEdge').toProps()} id="competitiveEdge" placeholder="Please type text" />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
            <FlexRow vPadding="24">
              <FlexCell minWidth={324} width="100%">
                <LabeledInput htmlFor="marketPosition" label="Market Position" {...lens.prop('marketPosition').toProps()}>
                  <TextInput {...lens.prop('marketPosition').toProps()} id="marketPosition" placeholder="Please type text" />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
            <FlexRow>
              <h3>Main Operations</h3>
            </FlexRow>
            <FlexRow vPadding="24">
              <FlexCell minWidth={324} width="100%">
                <LabeledInput htmlFor="headquarters" label="Headquarters" {...lens.prop('headquarters').toProps()}>
                  <TextInput {...lens.prop('headquarters').toProps()} id="headquarters" placeholder="Please type text" />
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
            <FlexRow vPadding="24">
              <FlexCell minWidth={324} width="100%">
                <LabeledInput htmlFor="website" label="Website" {...lens.prop('website').toProps()}>
                  <TextInput {...lens.prop('website').toProps()} id="website" placeholder="Please type text" />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
            <FlexRow>
              <h4>Social Media</h4>
            </FlexRow>
            <FlexRow vPadding="24">
              <FlexCell minWidth={324} width="100%">
                <LabeledInput htmlFor="linkedIn" label="LinkedIn" {...lens.prop('linkedIn').toProps()}>
                  <TextInput {...lens.prop('linkedIn').toProps()} id="linkedIn" placeholder="Please type text" />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
            <FlexRow vPadding="24">
              <FlexCell minWidth={324} width="100%">
                <LabeledInput htmlFor="xDotCom" label="Twitter" {...lens.prop('xDotCom').toProps()}>
                  <TextInput {...lens.prop('xDotCom').toProps()} id="xDotCom" placeholder="Please type text" />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
            <FlexRow vPadding="24">
              <FlexCell minWidth={324} width="100%">
                <LabeledInput htmlFor="facebook" label="Facebook" {...lens.prop('facebook').toProps()}>
                  <TextInput {...lens.prop('facebook').toProps()} id="facebook" placeholder="Please type text" />
                </LabeledInput>
              </FlexCell>
            </FlexRow>
            <FlexCell>
              <LabeledInput label='Other' />
              <ItemList form={form} controlName='other' />
            </FlexCell>
          </>)}
        </FlexCell>
      </Panel>
    </div>
  )
}
