import * as React from 'react';
import css from './Sidebar.module.scss';
import { ScrollBars } from '@epam/promo';
import { Tree, TreeListItem } from '@epam/uui-components';
import SidebarButton from './SidebarButton';
import { DataRowProps, DataSourceState, Link } from '@epam/uui-core';
import { PortfolioStateItem } from '../structure';

function getItemParents<TItem extends TreeListItem>(allItems: TItem[], itemId: string): string[] {
  const item = allItems.find((i) => i.id === itemId);
  const parents = [];
  if (item?.parentId) {
      parents.push(item.parentId);
      const otherParents = getItemParents(allItems, item.parentId);
      parents.push(...otherParents);
  }
  return parents;
}

export interface SidebarProps {
  value: string;
  items: PortfolioStateItem[];
  itemCx: string;
  getItemLink?: (item: DataRowProps<PortfolioStateItem, string>) => Link;
}

export function Sidebar(props: SidebarProps) {
  const [value, setValue] = React.useState<DataSourceState>({ search: '', folded: {} });

  React.useEffect(() => {
    if (props.items) {
        const parents = getItemParents(props.items, props.value);
        if (parents.length > 0) {
            const unfold = parents.reduce<Record<string, boolean>>((acc, parentId) => {
                acc[parentId] = false;
                return acc;
            }, {});
            setValue((stateValue) => ({ ...stateValue, folded: { ...stateValue.folded, ...unfold } }));
        }
    }
}, [props.value, props.items]);  

  const handleClick = React.useCallback((row: DataRowProps<PortfolioStateItem, string>) => {
    row.isFoldable && row.onFold(row);
  }, []);

  return (
    <aside className={css.root}>
      <ScrollBars>
        <Tree<PortfolioStateItem>
          items={props.items}
          value={value}
          onValueChange={setValue}
          renderRow={(row) => (<SidebarButton
            cx={props.itemCx}
            key={row.key}
            link={props.getItemLink(row)}
            indent={(row.indent - 1) * 12}
            isOpen={!row.isFolded}
            isDropdown={row.isFoldable}
            icon={row.value.icon}
            iconPosition={row.value.iconPosition}
            isDisabled={row.value.isLocked}
            isActive={row.id === props.value}
            caption={row.value.name}
            onClick={() => handleClick(row)}
          />)
          }
        />
      </ScrollBars>
    </aside>
  );
}
