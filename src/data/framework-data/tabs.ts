import { FrameworkTab } from '../../typings/enums/framework-tab.enum';
import { ITab } from '../../typings/models/framework.models';
import { CARDS } from './cards';

export const TABS: ITab[] = [
  {
    name: FrameworkTab.EndToEnd,
    cards: CARDS
  },
  {
    name: FrameworkTab.Discover,
    cards: [CARDS.find(x => x.title === FrameworkTab.Discover)]
  },
  {
    name: FrameworkTab.Define,
    cards: [CARDS.find(x => x.title === FrameworkTab.Define)]
  },
  {
    name: FrameworkTab.Design,
    cards: [CARDS.find(x => x.title === FrameworkTab.Design)]
  },
  {
    name: FrameworkTab.Develop,
    cards: [CARDS.find(x => x.title === FrameworkTab.Develop)]
  },
  {
    name: FrameworkTab.Deliver,
    cards: [CARDS.find(x => x.title === FrameworkTab.Deliver)]
  }
];