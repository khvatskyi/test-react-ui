import { PortfolioStateItem, STATE_CODES, portfolioStates} from './structure';
import { Sidebar } from './sidebar';
import { useParamId, useQuery } from './../../../../utilities/route.utility';


export default function PortfolioStagesSidebar() {
    const portfolioId = useParamId();
    const selectedStage = useQuery('stage', STATE_CODES.AboutPortfolio);   

    return (
        <Sidebar<PortfolioStateItem>
            value={ selectedStage }
            items={ portfolioStates }
            getItemLink={ (row) => ({
                pathname: `/portfolio/stages/${portfolioId}`,
                query: {
                    stage: row.id,
                },
            })}
        />
    );
}
