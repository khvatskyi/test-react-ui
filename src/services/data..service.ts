// import { delay } from "@epam/uui-test-utils";
import { STATE_CODES } from "../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure";
import { IValueCreationModel } from "../typings/models/business-model.models";
import { fetchWithAuth } from "../utilities/fetch-with-auth.utility";

export async function getCompletedModules(portfolio_id: string): Promise<STATE_CODES[]> {

  // return delay(1000).then(() => Promise.resolve(portfolioId === '1'
  //   ? [
  //     STATE_CODES.APIProductJourney,
  //     STATE_CODES.Capabilities
  //   ]
  //   : [
  //     STATE_CODES.ValueProposition,
  //     STATE_CODES.ConsumersAndNeeds
  //   ]
  // ));

  const params = new URLSearchParams({ portfolio_id }).toString();
  const path = process.env.REACT_APP_API_ROOT + `/stage/completed-modules?` + params;

  const response = await fetchWithAuth(path, {
    method: 'GET'
  });

  return response.json();
}

export async function fetchValueCreationModules(): Promise<IValueCreationModel[]> {

  const path = process.env.REACT_APP_API_ROOT + `/stage/value-creation-modules`;

  const response = await fetchWithAuth(path, {
    method: 'GET'
  });

  return response.json();
}