import React, { useCallback, useMemo, useState } from 'react';
import { DataColumnProps, DataSourceState, IImmutableMap, ItemsMap, Metadata, PatchOrdering, useArrayDataSource } from '@epam/uui-core';
import { Button, FlexSpacer, DataTable, DataTableCell, FlexCell, FlexRow, Panel, TextArea, useForm, IconButton,  NumericInput} from '@epam/uui';

import { ReactComponent as deleteIcon } from '@epam/assets/icons/common/content-clear-18.svg';
import css from './KPITableEditor.module.scss';
import { useDataTableFocusManager } from '@epam/uui-components';
// import { ReactComponent as undoIcon } from '@epam/assets/icons/content-edit_undo-outline.svg';
// import { ReactComponent as redoIcon } from '@epam/assets/icons/content-edit_redo-outline.svg';
import { IKPI, IKpiTableItem } from '../../../../../../../typings/models/goals-and-kpis.model';
import { ReactComponent as AddIcon } from '@epam/assets/icons/action-add-fill.svg';


// Define a blank item - for use as a new item, and to simplify mock data definition below
const blankItem: Partial<IKpiTableItem> = {
    kpiId: '',
    name: '',
    description: '',
    targetValue: 0,
    measurementMethod: '',
    frequency: '',
    relatedObjectiveId: '',
    isDeleted: false,
    isStored: false,
};

// Interface to hold form data. Here we'll only store items, so we might use ToDoItem[] as a state.
// However, we'll have an object here to extend the form state if needed later.
interface FormState {
    items: IImmutableMap<number, IKpiTableItem>;
}

// Define form metadata to validate form data
const metadata: Metadata<FormState> = {
    props: {
        items: {
            all: {
                // 'all' allows to use the same metadata for each item in items array
                props: {
                    name: { isRequired: true },
                },
            },
        },
    },
};

let lastId = -1;


const savedItem: FormState = {
    // ItemsMap is an immutable map implementation provided by UUI.
    // You can also use plain JS Map, through it will be a bit less convenient.
    items: ItemsMap.blank<number, IKpiTableItem>({ getId: (item) => item.id }),
};

const defaultSorting: DataSourceState['sorting'] = [{ field: 'id', direction: 'asc' }];

export interface IKPITableEditorProps {
  kpis: IKPI[],
  onUpdateKPIs: (kpis: IKpiTableItem[]) => void;
}

export default function KPITableEditor({kpis, onUpdateKPIs}: IKPITableEditorProps) {

  const demoItems: IKpiTableItem[] = [];
  kpis.forEach( (kpi, index) => {
    demoItems.push({ ...blankItem, 
      id: index, 
      kpiId: kpi.kpiId,
      name: kpi.name,
      description: kpi.description,
      targetValue: kpi.targetValue,
      measurementMethod: kpi.measurementMethod,
      frequency: kpi.frequency,
      relatedObjectiveId: kpi.relatedObjectiveId,
      isDeleted: false,
      isStored: true,
    })
  })

  console.log('KPITableEditor', kpis)

  const {
      lens, save, revert, /*undo, canUndo, redo, canRedo, */ value, setValue, isChanged,
  } = useForm<FormState>({
    value: savedItem,
    onSave: async (newValue) => {
        // At this point you usually call api.saveSomething(newValue) to actually send changed data to server
        // savedValue = value;

      const items: IKpiTableItem[] = [];
    
      Object.keys(newValue.items).forEach(key => {
        const value = newValue.items[key];
        if (value instanceof Map) {
          value.forEach((mapValue, mapKey) => {
            items.push(mapValue);
          });
        }
      });
      
      revert();
      console.log('items', items);
      onUpdateKPIs(items);

    },
    getMetadata: () => metadata,
  });

  const getData = () => {
    
    console.log(tableState);
    console.log("data", lens.toProps());
  }


    // Define data table focus manager, to enable focusing on cells with keyboard shortcuts
    // and programmatically.
    // For example, after adding a row, the first editable cell of the new row should be focused via `dataTableFocusManager`.
    const dataTableFocusManager = useDataTableFocusManager<IKpiTableItem['id']>({}, []);

    // Prepare callback to add a new item to the list.
    const handleNewItem = useCallback(() => {
        // It is possible to focus rows programmatically via dataTableFocusManager,
        // even those, still not present on the screen.
        dataTableFocusManager?.focusRow(lastId - 1);
    }, [dataTableFocusManager]);

    const handleDeleteItem = useCallback((item: IKpiTableItem) => {
        setValue((current) => ({ ...current, items: current.items.set(item.id, { ...item, isDeleted: true }) }));
    }, [setValue]);

    // Use state to hold DataTable state - current sorting, filtering, etc.
    const [tableState, setTableState] = useState<DataSourceState>({ sorting: defaultSorting });

    const onTableStateChange = useCallback((state: React.SetStateAction<DataSourceState>) => {
        setTableState((currentTableState) => {
            let updatedState: DataSourceState;
            if (typeof state === 'function') {
                updatedState = state(currentTableState);
            } else {
                updatedState = state;
            }
            
            if (!updatedState.sorting || !updatedState.sorting.length) {
                updatedState.sorting = defaultSorting;
            }
            return updatedState;
        });
    }, [setTableState]);

    // Define table columns. Using useMemo is required, otherwise the table will re-render on each change.
    const columns = useMemo(
        () =>
            [
                {
                    key: 'name',
                    caption: 'Name',
                    renderCell: (props) => (
                        <DataTableCell
                            { ...props.rowLens.prop('name').toProps() }
                            renderEditor={ (props) => <TextArea { ...props } /> }
                            key={props.key} {...props}
                        />
                    ),
                    width: 150,
                },
                {
                    key: 'description',
                    caption: 'Description',
                    renderCell: (props) => (
                        <DataTableCell
                            { ...props.rowLens.prop('description').toProps() }
                            renderEditor={ (props) => <TextArea { ...props } /> }
                            key={props.key} {...props}
                        />
                    ),
                    width: 150,
                  },
                  {
                    key: 'targetValue',
                    caption: 'Target Value',
                    renderCell: (props) => (
                        <DataTableCell
                            { ...props.rowLens.prop('targetValue').toProps() }
                            renderEditor={ (props) => 
                                <NumericInput { ...props } 
                                    // formatOptions={ { maximumFractionDigits: 1 } } 
                                    // formatValue={ (value) => value + '% growth' }
                                />
                            }
                            key={props.key} {...props}
                        />
                    ),
                    width: 110,
                  },
                  {
                    key: 'measurementMethod',
                    caption: 'Measurement Method',
                    renderCell: (props) => (
                        <DataTableCell
                            { ...props.rowLens.prop('measurementMethod').toProps() }
                            renderEditor={ (props) => <TextArea { ...props } /> }
                            key={props.key} {...props}
                        />
                    ),
                    width: 160,
                  },
                  {
                    key: 'frequency',
                    caption: 'Frequency',
                    renderCell: (props) => (
                        <DataTableCell
                            { ...props.rowLens.prop('frequency').toProps() }
                            renderEditor={ (props) => <TextArea { ...props } /> }
                            key={props.key} {...props}
                        />
                    ),
                    width: 95,
                  },
                {
                    key: 'actions',
                    render: (item) => (
                        <IconButton
                            icon={ deleteIcon }
                            onClick={ () => handleDeleteItem(item) }
                            color="secondary"
                        />
                    ),
                    width: 55,
                    alignSelf: 'center',
                    allowResizing: false,
                },
            ] as DataColumnProps<IKpiTableItem>[],
        [handleDeleteItem],
    );

    // Create data-source and view to supply filtered/sorted data to the table in form of DataTableRows.
    // DataSources describe the way to extract some list/tree-structured data.
    // Here we'll use ArrayDataSource - which gets data from an array, which we obtain from our Form.
    const dataSource = useArrayDataSource<IKpiTableItem, number, unknown>(
        {
            items: demoItems,
        },
        [],
    );

    // Make an IDataSourceView instance, which takes data from the DataSource, and transforms it into DataTableRows.
    // It considers current sorting, filtering, scroll position, etc. to get a flat list of currently visible rows.
    const view = dataSource.useView(tableState, onTableStateChange, {
        getRowOptions: (item: IKpiTableItem) => ({
            // Rows values are updated via lens.
            ...lens
                .prop('items')
                .key(item.id)
                .default(item)
                .onChange((_, current) => {
                    // If placeholder is modified, new placeholder should be added.
                    // For this purpose, lastId is updated. New placeholder will have id === lastId - 1.
                    lastId = Math.min(current.id, lastId);

                    return current;
                })
                .toProps(),
        }),
        // Changed/added/removed items are stored in value.items and applied to the dataSource via patch.
        patch: value.items.set(lastId - 1, { ...blankItem, id: lastId - 1 }), 
        // Position, new items from the patch should be placed.
        getNewItemPosition: () => PatchOrdering.BOTTOM,
        // Getter of deleted state of the item from the patch.
        isDeleted: (item) => item.isDeleted,
    });

    return (
        <Panel cx={ css.container }>
            <FlexRow columnGap="12" vPadding="12" cx={ css.buttonPanel }>
                <FlexCell width="auto">
                    <Button 
                        cx={css.buttonAddKPI}
                        caption="Add KPI" 
                        fill='ghost'
                        color='primary' 
                        size='36' 
                        onClick={handleNewItem} 
                        icon={AddIcon}
                    />

                </FlexCell>
                <FlexSpacer />
                {/* <FlexCell width="auto">
                    <Button size="18" icon={ undoIcon } onClick={ undo } isDisabled={ !canUndo } fill="outline" />
                </FlexCell>
                <FlexCell width="auto">
                    <Button size="18" icon={ redoIcon } onClick={ redo } isDisabled={ !canRedo } fill="outline" />
                </FlexCell> */}
                <FlexCell width="auto">
                    <Button caption="Revert" onClick={ revert } isDisabled={ !isChanged } color="secondary" fill="outline" />
                </FlexCell>
                <FlexCell width="auto">
                    <Button caption="getData" onClick={ getData } color="secondary" fill="outline" />
                </FlexCell>
                <FlexCell width="auto">
                    <Button caption="Save" onClick={ save } color="primary" isDisabled={ !isChanged } />
                </FlexCell>
            </FlexRow>
            <FlexRow cx={ css.container }>
                <Panel cx={css.tablePanel}>
                    <DataTable
                        { ...view.getListProps() }
                        getRows={ view.getVisibleRows }
                        value={ tableState }
                        onValueChange={ onTableStateChange }
                        columns={ columns }
                        headerTextCase="upper"
                        dataTableFocusManager={ dataTableFocusManager }
                    />
                </Panel>
            </FlexRow>
        </Panel>
    );
}