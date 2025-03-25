import { DropdownBodyProps, IDropdownToggler } from '@epam/uui-core';
import { Button, DropdownMenuBody, DropdownMenuButton } from '@epam/uui';
import { Dropdown } from '@epam/uui-components';

// import css from './SummaryExportButton.module.scss';
import { downloadJSON, exportToPDF, exportToPPT } from '../../utilities/export.utility';


interface ISummaryExportButtonProps {
  summaryObject: any;
}

export function SummaryExportButton( {summaryObject} : ISummaryExportButtonProps) {

  const exportOptions = (_: DropdownBodyProps) => {
    return (
      <DropdownMenuBody>
        <DropdownMenuButton caption='JSON' onClick={() => downloadJSON(summaryObject)} />
        <DropdownMenuButton caption='PDF' onClick={() => exportToPDF(summaryObject)} />
        <DropdownMenuButton caption='PowerPoint' onClick={() => exportToPPT(summaryObject)} />
      </DropdownMenuBody>
    );
  };

  return (
    <Dropdown 
    renderBody={exportOptions}
    renderTarget={(props: IDropdownToggler) => <Button caption='Export as' fill="ghost" color="secondary" {...props} />}
  />
);
}
