import { FrameworkTab } from "../enums/framework-tab.enum";
import { StageStatus } from "../enums/stage-status.enum";

export interface IStage {
  name: string;
  status?: StageStatus;
  path?: string;
  stages?: IStage[];
}

export interface IFrameworkCard {
  title: string;
  description: string;
  categories: IStage[];
}

export interface ITab {
  name: FrameworkTab;
  cards: IFrameworkCard[];
}
