// import React from 'react';
import { useParams } from 'react-router-dom';
import { DataRowProps } from '@epam/uui-core';
import { TreeListItem } from '@epam/uui-components';

import { PortfolioStateItem, items as docsMenuStructure} from './structure';
import { Sidebar } from './sidebar';
// import { useQuery } from '../../helpers';
// import { useQuery } from '../../../../utilities/getQuery';
// import { TMode } from './docsConstants';
// import { ThemeId } from '../../data';
// import { svc } from '../../services';

// type DocsQuery = {
//     id: string,
//     mode?: TMode,
//     isSkin?: boolean,
//     theme?: ThemeId,
//     category?: string
// };

// const redirectTo = (query: DocsQuery) =>
//     svc.uuiRouter.redirect({
//         pathname: '/documents',
//         query,
//     });

export default function PortfolioStagesSidebar() {
    // const { docsMenuStructure } = svc.uuiApp;
    // const mode = useQuery<DocsQuery['mode']>('mode') || TMode.doc;
    const queryParamId = 'about'; // const queryParamId: string = useQuery('id');
    const portfolioId = useParams<{ id?: string }>();
    
    // const isSkin = useQuery<DocsQuery['isSkin']>('isSkin');
    // const theme = useQuery<DocsQuery['theme']>('theme');

    const onChange = (row: DataRowProps<TreeListItem, string>) => {
      // alert('onChange')
        // if (row.parentId === 'components') {
        //     redirectTo({
        //         category: row.parentId,
        //         mode,
        //         id: row.id,
        //         isSkin,
        //         theme,
        //     });
        // } else {
        //     redirectTo({ id: row.id, category: row.parentId });
        // }
    };

    return (
        <Sidebar<PortfolioStateItem>
            value={ queryParamId }
            onValueChange={ onChange }
            items={ docsMenuStructure }
            getSearchFields={ (i) => [i.name] }
            getItemLink={ (row) =>
                !row.isFoldable && {
                    pathname: `/portfolio/stages/${portfolioId}`,                    
                    query: {
                        stage: row.id,
                        // mode: (row.parentId && mode),
                        // isSkin: (row.parentId && isSkin),
                        // category: row.parentId,
                    },
                } }
        />
    );
}
