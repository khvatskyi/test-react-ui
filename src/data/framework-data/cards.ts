import { getStateTitle, STATE_CODES } from '../../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure';
import { FrameworkTab } from '../../typings/enums/framework-tab.enum';
import { IFrameworkCard } from '../../typings/models/framework.models';

export const CARDS: IFrameworkCard[] = [
  {
    title: FrameworkTab.Discover,
    description: 'API Portfolio Managers',
    categories: [
      {
        name: 'Portfolio',
        stages: [
          {
            code: STATE_CODES.Capabilities,
            name: getStateTitle(STATE_CODES.Capabilities),
            path: STATE_CODES.Capabilities
          },
          {
            code: STATE_CODES.BusinessModel,
            name: getStateTitle(STATE_CODES.BusinessModel),
            path: STATE_CODES.BusinessModel
          },
          {
            code: STATE_CODES.GoalsAndKPIs,
            name: getStateTitle(STATE_CODES.GoalsAndKPIs),
            path: STATE_CODES.GoalsAndKPIs
          // },
          // {
          //   code: STATE_CODES.Roadmap,
          //   name: getStateTitle(STATE_CODES.Roadmap),
          //   path: STATE_CODES.Roadmap
          }
        ]
      },
      {
        name: 'Product',
        stages: [
          {
            code: STATE_CODES.ValueProposition,
            name: getStateTitle(STATE_CODES.ValueProposition),
            path: STATE_CODES.ValueProposition
          },
          {
            code: STATE_CODES.ConsumersAndNeeds,
            name: getStateTitle(STATE_CODES.ConsumersAndNeeds),
            path: STATE_CODES.ConsumersAndNeeds
          },
          {
            code: STATE_CODES.APIProductJourney,
            name: getStateTitle(STATE_CODES.APIProductJourney),
            path: STATE_CODES.APIProductJourney
          // },
          // {
          //   code: STATE_CODES.PortfolioAlignment,
          //   name: getStateTitle(STATE_CODES.PortfolioAlignment),
          //   path: STATE_CODES.PortfolioAlignment
          }
        ]
      }
    ],
    summaryRequired: [
      STATE_CODES.ValueProposition,
      STATE_CODES.ConsumersAndNeeds,
      STATE_CODES.APIProductJourney,
      STATE_CODES.BusinessModel,
    ]  
  },
  {
    title: FrameworkTab.Define,
    description: 'Architects',
    categories: [
      {
        name: 'Concept',
        stages: [
          {
            code: STATE_CODES.CapabilityAlignment,
            name: getStateTitle(STATE_CODES.CapabilityAlignment),
            path: STATE_CODES.CapabilityAlignment
          },
          {
            code: STATE_CODES.ValueChain,
            name: getStateTitle(STATE_CODES.ValueChain),
            path: STATE_CODES.ValueChain
          },
          {
            code: STATE_CODES.InteractionalUseCases,
            name: getStateTitle(STATE_CODES.InteractionalUseCases),
            path: STATE_CODES.InteractionalUseCases
          },
          {
            code: STATE_CODES.RequirementsDefinition,
            name: getStateTitle(STATE_CODES.RequirementsDefinition),
            path: STATE_CODES.RequirementsDefinition
          }
        ]
      },
      {
        name: 'Model',
        stages: [
          {
            code: STATE_CODES.ResourceModel,
            name: getStateTitle(STATE_CODES.ResourceModel),
            path: STATE_CODES.ResourceModel
          },
          {
            code: STATE_CODES.Interactions,
            name: getStateTitle(STATE_CODES.Interactions),
            path: STATE_CODES.Interactions
          },
          {
            code: STATE_CODES.JourneyPlan,
            name: getStateTitle(STATE_CODES.JourneyPlan),
            path: STATE_CODES.JourneyPlan
          },
          {
            code: STATE_CODES.SecurityAndAccess,
            name: getStateTitle(STATE_CODES.SecurityAndAccess),
            path: STATE_CODES.SecurityAndAccess
          }
        ]
      }
    ],
    summaryRequired: []
  },
  {
    title: FrameworkTab.Design,
    description: 'Design & Engineering',
    categories: [
      {
        name: 'Interface',
        stages: [
          {
            code: STATE_CODES.DesignItem,
            name: 'Specification',
            path: '/'
          },
          {
            code: STATE_CODES.DesignItem,
            name: 'Operations',
            path: '/'
          },
          {
            code: STATE_CODES.DesignItem,
            name: 'Prototype',
            path: '/'
          },
          {
            code: STATE_CODES.DesignItem,
            name: 'Implementation Requirements',
            path: '/'
          },
          {
            code: STATE_CODES.DesignItem,
            name: 'Interface Documentation',
            path: '/'
          }
        ]
      },
      {
        name: 'Infrastructure',
        stages: [
          {
            code: STATE_CODES.DesignItem,
            name: 'Gateways',
            path: '/'
          },
          {
            code: STATE_CODES.DesignItem,
            name: 'Deployment Design',
            path: '/'
          },
          {
            code: STATE_CODES.DesignItem,
            name: 'Security Controls',
            path: '/'
          },
          {
            code: STATE_CODES.DesignItem,
            name: 'Operational Design',
            path: '/'
          }
        ]
      }
    ],
    summaryRequired: []
  },
  {
    title: FrameworkTab.Develop,
    description: 'Design & Engineering',
    categories: [
      {
        name: 'Code',
        stages: [
          {
            code: STATE_CODES.DevelopItem,
            name: 'API Implementation',
            path: '/'
          },
          {
            code: STATE_CODES.DevelopItem,
            name: 'Unit Testing',
            path: '/'
          },
          {
            code: STATE_CODES.DevelopItem,
            name: 'Version Management',
            path: '/'
          },
          {
            code: STATE_CODES.DevelopItem,
            name: 'Agile & Release Management',
            path: '/'
          }
        ]
      },
      {
        name: 'Test',
        stages: [
          {
            code: STATE_CODES.DevelopItem,
            name: 'Functional & Performance',
            path: '/'
          },
          {
            code: STATE_CODES.DevelopItem,
            name: 'Security & Integration',
            path: '/'
          },
          {
            code: STATE_CODES.DevelopItem,
            name: 'Compliance & Progression',
            path: '/'
          },
          {
            code: STATE_CODES.DevelopItem,
            name: 'Documentation Validation',
            path: '/'
          }
        ]
      }
    ],
    summaryRequired: []
  },
  {
    title: FrameworkTab.Deliver,
    description: 'Design & Engineering',
    categories: [
      {
        name: 'Launch',
        stages: [
          {
            code: STATE_CODES.DeliverItem,
            name: 'Operational Change Mgmt',
            path: '/'
          },
          {
            code: STATE_CODES.DeliverItem,
            name: 'Stakeholder Communication',
            path: '/'
          },
          {
            code: STATE_CODES.DeliverItem,
            name: 'Support & Ops Readiness',
            path: '/'
          },
          {
            code: STATE_CODES.DeliverItem,
            name: 'Production Deployment',
            path: '/'
          }
        ],
      },
      {
        name: 'Enable',
        stages: [
          {
            code: STATE_CODES.DeliverItem,
            name: 'Support & Feedback',
            path: '/'
          },
          {
            code: STATE_CODES.DeliverItem,
            name: 'Community Engagement',
            path: '/'
          },
          {
            code: STATE_CODES.DeliverItem,
            name: 'Developer Activity Insights',
            path: '/'
          },
          {
            code: STATE_CODES.DeliverItem,
            name: 'API Consumer Onboarding',
            path: '/'
          }
        ]
      }
    ],
    summaryRequired: []
  }
];
