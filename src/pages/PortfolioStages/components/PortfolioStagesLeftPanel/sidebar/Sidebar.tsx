import * as React from 'react';
import css from './Sidebar.module.scss';
import { ScrollBars } from '@epam/promo';
import { Tree, TreeListItem } from '@epam/uui-components';
import { SidebarButton } from './SidebarButton';
import { DataRowProps, DataSourceState, Link } from '@epam/uui-core';
import { PortfolioStateItem} from '../structure';

export interface SidebarProps<TItem extends TreeListItem = TreeListItem> {
    value: string;
    items: TItem[];
    getItemLink?: (item: DataRowProps<TItem, string>) => Link;
}

export function Sidebar<TItem extends TreeListItem>(props: SidebarProps<TItem>) {
    const [value, setValue] = React.useState<DataSourceState>({ search: '', folded: {} });
      
    const handleClick = React.useCallback((row: DataRowProps<TItem, string>) => {
        row.isFoldable && row.onFold(row);
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
                                link={ props.getItemLink(row) }
                                indent={ (row.indent - 1) * 12 }
                                isOpen={ !row.isFolded }
                                isDropdown={ row.isFoldable }
                                icon={ (row.value as PortfolioStateItem).icon }
                                iconPosition={ (row.value as PortfolioStateItem).iconPosition }
                                isDisabled={ (row.value as PortfolioStateItem).isLocked }                                
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
