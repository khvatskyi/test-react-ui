import { useState } from 'react';

import { FlexCell, FlexRow, IconContainer } from '@epam/uui';

import { ReactComponent as ExpandIcon } from '@epam/assets/icons/navigation-chevron_right-outline.svg';
import { ReactComponent as CollapseIcon } from '@epam/assets/icons/navigation-chevron_down-outline.svg';

import css from './ObjectiveEditor.module.scss';
import TextValueEditor from '../../../../../../../components/Editors/TextValueEditor/TextValueEditor';
import { IKPI, IKpiTableItem } from '../../../../../../../typings/models/goals-and-kpis.model';
import KPITableEditor from './KPITableEditor';


interface IObjectiveInfo {
  objectiveId: string, 
  relatedGoalId: string, 
  description: string,
}

export interface IObjectiveEditorProps {
  keyInfo: IObjectiveInfo;
  kpis: IKPI[],
  onEdit: (id: any, newText: string) => void
  onDelete?: (id: any) => void
  onUpdateKPIs: (kpis: IKpiTableItem[]) => void;
}

export default function ObjectiveEditor({ keyInfo, kpis, onEdit, onDelete, onUpdateKPIs }: IObjectiveEditorProps) {
  const [isExpand, setIsExpand] = useState(false);

  const handleUpdateKPIs = (kpis: IKpiTableItem[]) => {
    kpis.forEach( 
      kpi => kpi.relatedObjectiveId = keyInfo.objectiveId
    );
    onUpdateKPIs(kpis);
  }
 
  return (<>
    <FlexRow cx={css.root} justifyContent='space-between'>
      <FlexCell width="auto">
      {isExpand && <IconContainer onClick={() => setIsExpand(false)} cx={css.buttonEdit} size='20' icon={CollapseIcon} />}
      {!isExpand && <IconContainer onClick={() => setIsExpand(true)} cx={css.buttonEdit} size='20' icon={ExpandIcon} />}
      </FlexCell>
      <FlexCell width="auto" grow={ 1 } >
        <TextValueEditor id={keyInfo} value={keyInfo.description} onEditValue={onEdit} onDelete={onDelete} showButton='always' />
      </FlexCell>
    </FlexRow>
    {isExpand && <>
      <FlexRow>
        <h4 style={{ margin: '0px' }}>KPI(s)</h4>
      </FlexRow>
        {console.log('ObjectiveEditor', kpis) }
        <FlexRow cx={css.tableKPI}>
          <KPITableEditor kpis={kpis} onUpdateKPIs={handleUpdateKPIs}/>
        </FlexRow>
    </>}
  </>);
}