import * as React from 'react';
import css from './Sidebar.module.scss';
import { ScrollBars } from '@epam/promo';
import { Tree, TreeListItem } from '@epam/uui-components';
import { SidebarButton } from './SidebarButton';
import { DataRowProps, DataSourceState, Link/*, useUuiContext */ } from '@epam/uui-core';
import { DocItem} from '../structure';

// import { analyticsEvents } from '../../analyticsEvents';

export interface SidebarProps<TItem extends TreeListItem = TreeListItem> {
    value: string;
    onValueChange: (newVal: DataRowProps<TItem, string>) => void;
    getItemLink?: (item: DataRowProps<TItem, string>) => Link;
    items: TItem[];
    renderSearch?: () => React.ReactNode;
    getSearchFields?(item: TItem): string[];
}

// function getItemParents<TItem extends TreeListItem>(allItems: TItem[], itemId: string): string[] {
//     const item = allItems.find((i) => i.id === itemId);
//     const parents = [];
//     if (item?.parentId) {
//         parents.push(item.parentId);
//         const otherParents = getItemParents(allItems, item.parentId);
//         parents.push(...otherParents);
//     }
//     return parents;
// }

export function Sidebar<TItem extends TreeListItem>(props: SidebarProps<TItem>) {
    // const { uuiAnalytics } = useUuiContext();
    const [value, setValue] = React.useState<DataSourceState>({ search: '', folded: {} });
    
    // React.useEffect(() => {
    //     if (props.items) {
    //         const parents = getItemParents(props.items, props.value);
    //         if (parents.length > 0) {
    //             const unfold = parents.reduce<Record<string, boolean>>((acc, parentId) => {
    //                 acc[parentId] = false;
    //                 return acc;
    //             }, {});
    //             setValue((stateValue) => ({ ...stateValue, folded: { ...stateValue.folded, ...unfold } }));
    //         }
    //     }
    // }, [props.value, props.items]);

    const handleClick = React.useCallback((row: DataRowProps<TItem, string>) => {
        row.isFoldable && row.onFold(row);
        // const type = row.isFoldable ? 'folder' : 'document';
        alert(row.value.name)
        // uuiAnalytics.sendEvent(analyticsEvents.document.clickDocument(type, row.value.name, row.parentId));
    // }, [uuiAnalytics]);
    }, []);

    return (
        <aside className={ css.root }>
            <div className={ css.tree } role="tablist">
                <ScrollBars>
                    <Tree<TItem>
                        items={ props.items }
                        value={ value }
                        onValueChange={ setValue }
                        renderRow={ (row) => (
                            <SidebarButton
                                key={ row.key }
                                // link={ props.getItemLink(row) }
                                indent={ (row.indent - 1) * 12 }
                                isOpen={ !row.isFolded }
                                isDropdown={ row.isFoldable }
                                isDisabled={ (row.value as DocItem).isLocked }
                                icon={ (row.value as DocItem).icon }
                                iconPosition={  (row.value as DocItem).iconPosition }
                                isActive={ row.id === props.value }
                                caption={ row.value.name }
                                onClick={ () => handleClick(row) }
                            />
                        ) }
                    />
                </ScrollBars>
            </div>
        </aside>
    );
}
