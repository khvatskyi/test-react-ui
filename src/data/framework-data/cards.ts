import { FrameworkTab } from '../../typings/enums/framework-tab.enum';
import { StageStatus } from '../../typings/enums/stage-status.enum';
import { IFrameworkCard } from '../../typings/models/framework.models';

export const CARDS: IFrameworkCard[] = [
  {
    title: FrameworkTab.Discover,
    description: 'API Portfolio Managers',
    categories: [
      {
        name: 'Portfolio',
        path: '/portfolios',
        stages: [
          {
            name: 'Consumer needs',
            path: '/',
            status: StageStatus.Complete
          },
          {
            name: 'Capabilities',
            path: '/'
          },
          {
            name: 'Business Model',
            path: '/'
          },
          {
            name: 'Goals & KPIs',
            path: '/'
          },
          {
            name: 'Roadmap',
            path: '/'
          }
        ]
      },
      {
        name: 'Product',
        path: '/portfolios',
        stages: [
          {
            name: 'Value Proposition',
            path: '/'
          },
          {
            name: 'Consumer Needs',
            path: '/'
          },
          {
            name: 'API Product Journeys',
            path: '/',
            status: StageStatus.Complete
          },
          {
            name: 'Portfolio Alignment',
            path: '/'
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
