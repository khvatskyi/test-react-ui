import { STATE_CODES } from '../../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure';
import { FrameworkTab } from '../../typings/enums/framework-tab.enum';
import { IFrameworkCard } from '../../typings/models/framework.models';

export const CARDS: IFrameworkCard[] = [
  {
    title: FrameworkTab.Discover,
    description: 'API Portfolio Managers',
    categories: [
      {
        name: 'Portfolio',
        path: STATE_CODES.AboutPortfolio,
        stages: [
          {
            name: 'Capabilities',
            path: STATE_CODES.Capabilities
          },
          {
            name: 'Business Model',
            path: STATE_CODES.BusinessModels
          },
          {
            name: 'Goals & KPIs',
            path: STATE_CODES.GoalsKPIs
          },
          {
            name: 'Roadmap',
            path: STATE_CODES.Roadmap
          }
        ]
      },
      {
        name: 'Product',
        stages: [
          {
            name: 'Value Proposition',
            path: STATE_CODES.ValueProposition
          },
          {
            name: 'Consumers & Needs',
            path: STATE_CODES.ConsumersAndNeeds
          },
          {
            name: 'API Product Journeys',
            path: STATE_CODES.APIProductJourneys
          },
          {
            name: 'Portfolio Alignment',
            path: STATE_CODES.PortfolioAlignment
          }
        ]
      }
    ]
  },
  {
    title: FrameworkTab.Define,
    description: 'Architects',
    categories: [
      {
        name: 'Concept',
        path: '/',
        stages: [
          {
            name: 'Capability Alignment',
            path: '/'
          },
          {
            name: 'Value Chain',
            path: '/'
          },
          {
            name: 'Interactional Use Cases',
            path: '/'
          },
          {
            name: 'Requirements Definition',
            path: '/'
          },
          {
            name: 'Roadmap',
            path: '/'
          }
        ]
      },
      {
        name: 'Model',
        path: '/',
        stages: [
          {
            name: 'Resource Model',
            path: '/'
          },
          {
            name: 'Interactions',
            path: '/'
          },
          {
            name: 'Journey Map',
            path: '/'
          },
          {
            name: 'Security & Access',
            path: '/'
          }
        ]
      }
    ]
  },
  {
    title: FrameworkTab.Design,
    description: 'Design & Engineering',
    categories: [
      {
        name: 'Interface',
        path: '/',
        stages: [
          {
            name: 'Specification',
            path: '/'
          },
          {
            name: 'Operations',
            path: '/'
          },
          {
            name: 'Prototype',
            path: '/'
          },
          {
            name: 'Implementation Requirements',
            path: '/'
          },
          {
            name: 'Interface Documentation',
            path: '/'
          }
        ]
      },
      {
        name: 'Infrastructure',
        path: '/',
        stages: [
          {
            name: 'Gateways',
            path: '/'
          },
          {
            name: 'Deployment Design',
            path: '/'
          },
          {
            name: 'Security Controls',
            path: '/'
          },
          {
            name: 'Operational Design',
            path: '/'
          }
        ]
      }
    ]
  },
  {
    title: FrameworkTab.Develop,
    description: 'Design & Engineering',
    categories: [
      {
        name: 'Code',
        path: '/',
        stages: [
          {
            name: 'API Implementation',
            path: '/'
          },
          {
            name: 'Unit Testing',
            path: '/'
          },
          {
            name: 'Version Management',
            path: '/'
          },
          {
            name: 'Agile & Release Management',
            path: '/'
          }
        ]
      },
      {
        name: 'Test',
        path: '/',
        stages: [
          {
            name: 'Functional & Performance',
            path: '/'
          },
          {
            name: 'Security & Integration',
            path: '/'
          },
          {
            name: 'Compliance & Progression',
            path: '/'
          },
          {
            name: 'Documentation Validation',
            path: '/'
          }
        ]
      }
    ]
  },
  {
    title: FrameworkTab.Deliver,
    description: 'Design & Engineering',
    categories: [
      {
        name: 'Launch',
        path: '/',
        stages: [
          {
            name: 'Operational Change Mgmt',
            path: '/'
          },
          {
            name: 'Stakeholder Communication',
            path: '/'
          },
          {
            name: 'Support & Ops Readiness',
            path: '/'
          },
          {
            name: 'Production Deployment',
            path: '/'
          }
        ]
      },
      {
        name: 'Enable',
        path: '/',
        stages: [
          {
            name: 'Support & Feedback',
            path: '/'
          },
          {
            name: 'Community Engagement',
            path: '/'
          },
          {
            name: 'Developer Activity Insights',
            path: '/'
          },
          {
            name: 'API Consumer Onboarding',
            path: '/'
          }
        ]
      }
    ]
  }
];
