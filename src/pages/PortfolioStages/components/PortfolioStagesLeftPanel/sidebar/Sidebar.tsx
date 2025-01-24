import * as React from 'react';
import css from './Sidebar.module.scss';
import { ScrollBars } from '@epam/promo';
import { Tree } from '@epam/uui-components';
import SidebarButton from './SidebarButton';
import { DataRowProps, DataSourceState, Link } from '@epam/uui-core';
import { PortfolioStateItem } from '../structure';

export interface SidebarProps {
  value: string;
  items: PortfolioStateItem[];
  itemCx: string;
  getItemLink?: (item: DataRowProps<PortfolioStateItem, string>) => Link;
}

export function Sidebar(props: SidebarProps) {
  const [value, setValue] = React.useState<DataSourceState>({ search: '', folded: {} });

  const handleClick = React.useCallback((row: DataRowProps<PortfolioStateItem, string>) => {
    row.isFoldable && row.onFold(row);
  }, []);

  return (
    <aside className={css.root}>
      <div className={css.tree} role="tablist">
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
      </div>
    </aside>
  );
}
