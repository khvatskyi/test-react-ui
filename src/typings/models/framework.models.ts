import { STATE_CODES } from "../../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure";
import { FrameworkTab } from "../enums/framework-tab.enum";
import { StageStatus } from "../enums/stage-status.enum";

export interface IStage {
  code: STATE_CODES;
  name: string;
  status?: StageStatus;
  path?: string;
}

export interface ICategory {
  name: string;
  stages?: IStage[];
}

export interface IFrameworkCard {
  title: string;
  description: string;
  categories: ICategory[];
  summaryRequired: STATE_CODES[];
}

export interface ITab {
  name: FrameworkTab;
  cards: IFrameworkCard[];
}
