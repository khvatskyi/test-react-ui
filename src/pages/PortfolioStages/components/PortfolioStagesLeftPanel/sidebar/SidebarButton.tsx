import * as React from 'react';

import { cx } from '@epam/uui-core';

import { VerticalTabButton, VerticalTabButtonProps } from '@epam/uui';
import { ReactComponent as DropdownIcon } from '@epam/assets/icons/common/navigation-chevron-down-18.svg';
import css from './SidebarButton.module.scss';

export type SidebarButtonProps = VerticalTabButtonProps & {
  isActive: boolean;
  indent?: number;
};

export default function SidebarButton(props: SidebarButtonProps) {

  return (
    <VerticalTabButton
      icon={props.icon}
      iconPosition={props.iconPosition}
      {...props}
      rawProps={{
        role: props.isDropdown ? undefined : 'tab',
        'aria-expanded': props.isDropdown,
        'aria-disabled': props.isDisabled,
        'aria-current': props.isActive,
      }}
      isLinkActive={props.isActive}
      cx={cx(
        css.root,
        css['indent-' + props.indent],
        props.cx
      )}
      dropdownIcon={DropdownIcon}
      size="36"
      isDisabled={props.isDisabled}
    />
  );
}
