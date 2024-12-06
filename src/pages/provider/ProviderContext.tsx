import React, { useState } from 'react';
import { UuiContexts, useUuiContext } from '@epam/uui-core';
import type { CompanyInfo} from './types';
import type { TApi } from '../../data';
import { ILens, useArrayDataSource } from '@epam/uui-core';
import { 
  FlexCell, FlexRow, FlexSpacer, Panel, LabeledInput, RichTextView, TextInput, SuccessNotification, Text, TextArea, Button, 
  PickerInput, RadioGroup, useForm
} from '@epam/uui';
import { defaultData} from './defaultData';
import { companyInfoSchema } from './validationShema';
import css from './ProviderContext.module.scss';
import { appData } from '../../data/source';
import { ReactComponent as iconAI } from '@epam/assets/icons/ai-copilot_magic_small-fill.svg';


export function ProviderContextForm() {
  const svc = useUuiContext<TApi, UuiContexts>();

  const industryDataSource = useArrayDataSource(
      {
          items: appData.industries,
      },
      [],
  );

  const [size, setSize] = useState<string | null>('large'); //TODO: need redesign

  const { lens, save } = useForm<CompanyInfo>({
      settingsKey: 'provider-context-form',
      value: defaultData,
      getMetadata: companyInfoSchema,
      onSave: (person) => Promise.resolve({ form: person }) /* place your save api call here */,
      onSuccess: () => {
          svc.uuiNotifications.show(
              (props) => (
                  <SuccessNotification { ...props }>
                      <Text size="36" fontSize="14">
                          Data has been saved!
                      </Text>
                  </SuccessNotification>
              ),
              { duration: 2 },
          ).catch(() => null);
      },
  });
  const info: ILens<CompanyInfo> = lens;
  console.log(css.rootForm );

  return (
    <div className={ css.root }>
        <Panel cx={ css.buttonPanel }>
            <FlexRow columnGap="12" cx={ css.buttonPanel }>
                <FlexSpacer />
                <Button caption="Save client profile" color="primary" onClick={ save } />
                <Button caption="Fill with AI" icon={ iconAI } fill="ghost" onClick={ save } />
            </FlexRow>
        </Panel>
        <div className={ css.rootForm }>
            <FlexCell width="100%">
                <RichTextView >
                  <h2 style={{textAlign: "center"}}>Client Profile</h2>
                  <div style={{textAlign: "center"}}>Tell us a little bit about the client you are working with</div>
                </RichTextView>
                <FlexSpacer />
            </FlexCell>
            <Panel cx={ css.formPanel } >
              <FlexCell width="100%">
                <FlexRow vPadding="12">
                  <FlexCell minWidth={ 324 } width="100%">
                      <LabeledInput htmlFor="companyName" label="Provider Name" info="Please enter your company name" { ...info.prop('name').toProps() }>
                          <TextInput { ...info.prop('name').toProps() } id="companyName" placeholder="Company Name" />
                      </LabeledInput>
                  </FlexCell>
                </FlexRow>
                <FlexRow vPadding="12">
                  <FlexCell minWidth={ 324 } width="100%">
                      <LabeledInput htmlFor="companyDescription" label="Description" { ...info.prop('description').toProps() }>
                          <TextArea { ...info.prop('description').toProps() } id="companyDescription" placeholder="Company Description" />
                      </LabeledInput>
                  </FlexCell>
                </FlexRow>
                <FlexRow>
                  <FlexCell minWidth={ 324 } width="100%">
                      <LabeledInput htmlFor={ 'companyIndustry' } label="Industry" { ...info.prop('industry').toProps() }>
                          <PickerInput
                              { ...info.prop('industry').toProps() }
                              dataSource={ industryDataSource }
                              selectionMode="single"
                              getName={ (item) => item!.industry }
                              valueType="id"
                              id={ 'companyIndustry' }
                              placeholder="Please select"
                          />
                      </LabeledInput>
                  </FlexCell>
                </FlexRow>
                <FlexRow>
                  <FlexCell minWidth={ 324 } width="100%">
                      <LabeledInput htmlFor={ 'companySize' } label="Size" { ...info.prop('size').toProps() }>
                          <RadioGroup
                              name="companySize"
                              items={ [
                                  { id: 'small', name: 'Small' }, { id: 'medium', name: 'Medium' }, { id: 'large', name: 'Large' },
                              ] }
                              value={ size }
                              onValueChange={ setSize }
                              direction="horizontal"
                          />
                      </LabeledInput>
                  </FlexCell>
                </FlexRow>
                <FlexRow vPadding="12">
                  <FlexCell minWidth={ 324 } width="100%">
                      <LabeledInput htmlFor="coreProducts" label="Core products / Business lines" info="Core products / Business lines" { ...info.prop('coreProducts').toProps() }>
                          <TextArea { ...info.prop('coreProducts').toProps() } id="coreProducts" placeholder="Enter a text" />
                      </LabeledInput>
                  </FlexCell>
                </FlexRow>
              </FlexCell>
            </Panel>
        </div>
    </div>
  );
}
