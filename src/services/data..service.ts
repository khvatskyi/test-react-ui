import { delay } from "@epam/uui-test-utils";
import { STATE_CODES } from "../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure";
import { fetchWithAuth } from "../utilities/fetch-with-auth.utility";

export async function getCompletedModules(portfolioId: string): Promise<STATE_CODES[]> {

  // return delay(1000).then(() => Promise.resolve(portfolioId === '1'
  //   ? [
  //     STATE_CODES.APIProductJourneys,
  //     STATE_CODES.Capabilities
  //   ]
  //   : [
  //     STATE_CODES.ValueProposition,
  //     STATE_CODES.ConsumersAndNeeds
  //   ]
  // ));

  const params = new URLSearchParams({ portfolioId }).toString();
  const path = process.env.REACT_APP_API_ROOT + `/data/completedModules?` + params;

  const response = await fetchWithAuth(path, {
    method: 'GET'
  });

  return response.json();
}