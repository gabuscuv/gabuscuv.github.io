import { OnGoingValue } from '../utils/dates';
import { createTranslator } from 'use-intl/core';

export enum JobTypeEnum {
  All,
  Lite,
  GameDev,
  GameDevTools,
  Backend,
  WebDev,
  EmbeddedSystem,
  Multimedia
}

export const roles = [
  {value: JobTypeEnum.All, label: 'all'},
  {value: JobTypeEnum.Lite, label: 'lite'},
  {value: JobTypeEnum.GameDev, label: 'gameDev'},
  {value: JobTypeEnum.GameDevTools, label: 'gameDevTools'},
  {value: JobTypeEnum.Backend, label: 'backend'},
  {value: JobTypeEnum.WebDev, label: 'web'},
  {value: JobTypeEnum.EmbeddedSystem, label: 'embeddedSystem'},
  {value: JobTypeEnum.Multimedia, label: 'multimedia'},
] as const;

export type RoleDefinition = (typeof roles)[number];

export type CertificateEnumType =
  | 'network'
  | 'design'
  | 'gamedev'
  | 'office';

class CommonMinimum {
  Title = '';
  StartDate = 0;
  EndDate = 0;
}

class CommonMinimumWithLocation extends CommonMinimum {
  Location = '';
  Url = '';
}

export class MultimediaContent {
  text = '';
  url = '';
}

export enum BulletCategory {
  Impact = 'impact',
  Architecture = 'architecture',
  Engineering = 'engineering',
  Automation = 'automation',
  Integration = 'integration',
  Quality = 'quality',
  Delivery = 'delivery',
}

export type CategoryWeights = Record<BulletCategory, number>;

export const defaultCategoryWeights: CategoryWeights = {
  [BulletCategory.Impact]: 0.9,
  [BulletCategory.Architecture]: 1.0,
  [BulletCategory.Engineering]: 1.0,
  [BulletCategory.Automation]: 0.8,
  [BulletCategory.Integration]: 0.9,
  [BulletCategory.Quality]: 0.8,
  [BulletCategory.Delivery]: 0.7,
};

export interface IExperienceBullet {
  id: string;
  translationKey: string;
  categories: Partial<Record<BulletCategory, number>>;
  translation?: string;
}

export class JobsType extends CommonMinimum {
  Description = '';
  JobType = JobTypeEnum.All;
  BulletPoints: Array<IExperienceBullet> = [];
  techStack: Array<string> = [];
  multimediaContent?: Array<MultimediaContent> = [];
}

export class CompanyType extends CommonMinimumWithLocation {
  typeOfHire = '';
  typeOfPresence = '';
  Jobs: Array<JobsType> = [];
}

export class EducationType extends CommonMinimumWithLocation {
  IssuerOrg = '';
  EFramework = '';
  originalTitle = '';
  techStack: Array<string> = [];
}

export type CertificateType = {
  Title: string;
  type: CertificateEnumType;
  IssuerOrg: string;
  date: number;
};

export type TalksType = {
  Title: string;
  location: string;
  date: number;
};

export type ResumeType = {
  Jobs: Array<CompanyType>;
  Education: Array<EducationType>;
  Certificate: Array<CertificateType>;
  Talks: Array<TalksType>;
};

type ResumeTranslator = ReturnType<typeof createTranslator>;

export async function ResumeContent(t: ResumeTranslator): Promise<ResumeType> {
  const translate = (company: CompanyType) => ({
  ...company,
  Jobs: company.Jobs.map(job => ({
    ...job,
    BulletPoints: job.BulletPoints.map(bullet => ({
      ...bullet,
      translation: t(bullet.translationKey),
    })),
  })),
});
  // const t = useTranslations('Resume'); // for preview with i18n-ally
  return {
    Jobs: [
      {
        Title: 'Ghenova Digital',
        Location: t('Locations.SanFernando'),
        Url: 'https://digital.ghenova.com/',
        StartDate: Date.parse('2025/02/26'),
        EndDate: OnGoingValue,
        typeOfHire: 'full',
        typeOfPresence: 'hybrid',
        Jobs: [
          {
            Title: 'C++ Developer (Internally Called Software/Infra Developer)',
            Description: t('Jobs.ghenova.cpp.description'),
            JobType: JobTypeEnum.Backend,
            StartDate: Date.parse('2025/02/26'),
            EndDate: OnGoingValue,
            techStack: ['cpp', 'qt', 'rhel', 'gst', 'dds'],
            BulletPoints: [{
              id: 'infrastructureMonitoring',
              translationKey:
                'Jobs.ghenova.cpp.bulletpoints.infrastructureMonitoring',
              categories: {
                [BulletCategory.Engineering]: 1.0,
                [BulletCategory.Integration]: 1.0,
                [BulletCategory.Impact]: 0.8,
                [BulletCategory.Quality]: 0.7,
              },
            },
            {
              id: 'monitoringPlatformEvolution',
              translationKey:
                'Jobs.ghenova.cpp.bulletpoints.monitoringPlatformEvolution',
              categories: {
                [BulletCategory.Engineering]: 1.0,
                [BulletCategory.Impact]: 0.9,
                [BulletCategory.Architecture]: 0.8,
                [BulletCategory.Integration]: 0.7,
              },
            },
            {
              id: 'reliabilityAndAuditing',
              translationKey:
                'Jobs.ghenova.cpp.bulletpoints.reliabilityAndAuditing',
              categories: {
                [BulletCategory.Quality]: 1.0,
                [BulletCategory.Engineering]: 0.9,
                [BulletCategory.Impact]: 0.9,
                [BulletCategory.Automation]: 0.6,
              },
            },
            {
              id: 'stabilityAndMaintainability',
              translationKey:
                'Jobs.ghenova.cpp.bulletpoints.stabilityAndMaintainability',
              categories: {
                [BulletCategory.Architecture]: 1.0,
                [BulletCategory.Quality]: 1.0,
                [BulletCategory.Engineering]: 0.9,
                [BulletCategory.Impact]: 0.8,
                [BulletCategory.Delivery]: 0.7,
              },
            },
            {
              id: 'platformMigration',
              translationKey:
                'Jobs.ghenova.cpp.bulletpoints.platformMigration',
              categories: {
                [BulletCategory.Integration]: 1.0,
                [BulletCategory.Engineering]: 0.9,
                [BulletCategory.Delivery]: 0.9,
                [BulletCategory.Quality]: 0.7,
                [BulletCategory.Architecture]: 0.6,
              },
            },
            {
              id: 'hmiModernization',
              translationKey:
                'Jobs.ghenova.cpp.bulletpoints.hmiModernization',
              categories: {
                [BulletCategory.Engineering]: 1.0,
                [BulletCategory.Impact]: 0.9,
                [BulletCategory.Quality]: 0.9,
                [BulletCategory.Architecture]: 0.7,
                [BulletCategory.Integration]: 0.6,
              },
            },
            {
              id: 'videoWallSystems',
              translationKey:
                'Jobs.ghenova.cpp.bulletpoints.videoWallSystems',
              categories: {
                [BulletCategory.Engineering]: 1.0,
                [BulletCategory.Integration]: 1.0,
                [BulletCategory.Automation]: 0.9,
                [BulletCategory.Quality]: 0.9,
                [BulletCategory.Impact]: 0.9,
                [BulletCategory.Architecture]: 0.7,
              },
            },
            {
              id: 'softwareLifecycle',
              translationKey:
                'Jobs.ghenova.cpp.bulletpoints.softwareLifecycle',
              categories: {
                [BulletCategory.Delivery]: 1.0,
                [BulletCategory.Quality]: 0.9,
                [BulletCategory.Integration]: 0.8,
                [BulletCategory.Engineering]: 0.7,
                [BulletCategory.Impact]: 0.6,
              },
            },
            ],
          },
        ],
      },
      {
        Title: 'Abance',
        Location: t('Locations.Puerto'),
        Url: 'https://www.abance.es/',
        StartDate: Date.parse('2023/09/25'),
        EndDate: Date.parse('2025/02/25'),
        Jobs: [
          {
            Title: 'C++ Backend Developer',
            Description: t('Jobs.abance.cppusv.description'),
            JobType: JobTypeEnum.Backend,
            StartDate: Date.parse('2024/10/15'),
            EndDate: Date.parse('2024/12/30'),
            techStack: ['cpp', 'qt', 'zmq', 'dds'],
            BulletPoints: [{
              id: 'navigationAndSensorSimulators',
              translationKey:
                'Jobs.abance.cppusv.bulletpoints.navigationAndSensorSimulators',
              categories: {
                [BulletCategory.Engineering]: 1.0,
                [BulletCategory.Integration]: 1.0,
                [BulletCategory.Automation]: 0.8,
                [BulletCategory.Quality]: 0.8,
                [BulletCategory.Impact]: 0.8,
              },
            },
            {
              id: 'zeromqDdsBridge',
              translationKey:
                'Jobs.abance.cppusv.bulletpoints.zeromqDdsBridge',
              categories: {
                [BulletCategory.Integration]: 1.0,
                [BulletCategory.Architecture]: 1.0,
                [BulletCategory.Engineering]: 1.0,
                [BulletCategory.Impact]: 0.9,
              },
            },
            {
              id: 'heterogeneousSystemIntegration',
              translationKey:
                'Jobs.abance.cppusv.bulletpoints.heterogeneousSystemIntegration',
              categories: {
                [BulletCategory.Integration]: 1.0,
                [BulletCategory.Engineering]: 0.9,
                [BulletCategory.Architecture]: 0.8,
                [BulletCategory.Impact]: 0.7,
              },
            },
            {
              id: 'buildAndDeploymentModernization',
              translationKey:
                'Jobs.abance.cppusv.bulletpoints.buildAndDeploymentModernization',
              categories: {
                [BulletCategory.Automation]: 1.0,
                [BulletCategory.Delivery]: 1.0,
                [BulletCategory.Quality]: 0.9,
                [BulletCategory.Engineering]: 0.9,
                [BulletCategory.Architecture]: 0.7,
              },
            },
            {
              id: 'timeConstrainedDelivery',
              translationKey:
                'Jobs.abance.cppusv.bulletpoints.timeConstrainedDelivery',
              categories: {
                [BulletCategory.Delivery]: 1.0,
                [BulletCategory.Impact]: 0.9,
                [BulletCategory.Engineering]: 0.8,
              },
            },
            ],
          },
          {
            Title: 'Main Typescript / React / Next.JS Developer',
            Description: t('Jobs.abance.nextreact.description'),
            JobType: JobTypeEnum.WebDev,
            StartDate: Date.parse('2024/05/15'),
            EndDate: Date.parse('2025/02/25'),
            techStack: ['typescript', 'react', 'nextjs'],
            BulletPoints: [
              {
                id: 'wordpressToNextMigration',
                translationKey:
                  'Jobs.abance.nextreact.bulletpoints.wordpressToNextMigration',
                categories: {
                  [BulletCategory.Architecture]: 1.0,
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Impact]: 0.9,
                  [BulletCategory.Quality]: 0.8,
                  [BulletCategory.Delivery]: 0.8,
                },
              },
              {
                id: 'multilingualRouting',
                translationKey:
                  'Jobs.abance.nextreact.bulletpoints.multilingualRouting',
                categories: {
                  [BulletCategory.Integration]: 1.0,
                  [BulletCategory.Engineering]: 0.9,
                  [BulletCategory.Quality]: 0.9,
                  [BulletCategory.Impact]: 0.8,
                },
              },
              {
                id: 'customPhpIntegration',
                translationKey:
                  'Jobs.abance.nextreact.bulletpoints.customPhpIntegration',
                categories: {
                  [BulletCategory.Integration]: 1.0,
                  [BulletCategory.Engineering]: 0.9,
                  [BulletCategory.Delivery]: 0.9,
                  [BulletCategory.Impact]: 0.8,
                },
              },
              {
                id: 'fullStackApplication',
                translationKey:
                  'Jobs.abance.nextreact.bulletpoints.fullStackApplication',
                categories: {
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Architecture]: 0.9,
                  [BulletCategory.Impact]: 0.8,
                  [BulletCategory.Delivery]: 0.8,
                },
              },
              {
                id: 'crossPlatformBackendIntegration',
                translationKey:
                  'Jobs.abance.nextreact.bulletpoints.crossPlatformBackendIntegration',
                categories: {
                  [BulletCategory.Integration]: 1.0,
                  [BulletCategory.Architecture]: 0.9,
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Impact]: 0.9,
                },
              },
              {
                id: 'frontendEngineering',
                translationKey:
                  'Jobs.abance.nextreact.bulletpoints.frontendEngineering',
                categories: {
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Quality]: 0.8,
                  [BulletCategory.Impact]: 0.8,
                },
              },
              {
                id: 'codeQuality',
                translationKey:
                  'Jobs.abance.nextreact.bulletpoints.codeQuality',
                categories: {
                  [BulletCategory.Quality]: 1.0,
                  [BulletCategory.Engineering]: 0.8,
                  [BulletCategory.Architecture]: 0.6,
                },
              },
            ],
            multimediaContent: [{ text: "Wordpress To React (Video)", url: "https://www.youtube.com/watch?v=l_dvgEPhykQ" }]

          },
          {
            Title: 'Wordpress Developer',
            Description: t('Jobs.abance.wordpress.description'),
            JobType: JobTypeEnum.WebDev,
            StartDate: Date.parse('2024/03/10'),
            EndDate: Date.parse('2024/08/10'),
            techStack: ['oxygen'],
            BulletPoints: [
              {
                id: 'wordpressMaintenance',
                translationKey:
                  'Jobs.abance.wordpress.bulletpoints.wordpressMaintenance',
                categories: {
                  [BulletCategory.Engineering]: 0.9,
                  [BulletCategory.Delivery]: 0.9,
                  [BulletCategory.Quality]: 0.8,
                  [BulletCategory.Impact]: 0.7,
                },
              },
              {
                id: 'legacyPluginTroubleshooting',
                translationKey:
                  'Jobs.abance.wordpress.bulletpoints.legacyPluginTroubleshooting',
                categories: {
                  [BulletCategory.Engineering]: 0.9,
                  [BulletCategory.Quality]: 1.0,
                  [BulletCategory.Integration]: 0.9,
                  [BulletCategory.Impact]: 0.7,
                },
              },
              {
                id: 'websiteModernizationAssessment',
                translationKey:
                  'Jobs.abance.wordpress.bulletpoints.websiteModernizationAssessment',
                categories: {
                  [BulletCategory.Architecture]: 1.0,
                  [BulletCategory.Impact]: 0.9,
                  [BulletCategory.Quality]: 0.8,
                  [BulletCategory.Engineering]: 0.7,
                },
              },
            ],
          },
          {
            Title: 'Main C# Software Developer',
            Description: t('Jobs.abance.csharpdev.description'),
            JobType: JobTypeEnum.Backend,
            StartDate: Date.parse('2024/02/24'),
            EndDate: Date.parse('2025/02/25'),
            techStack: ['csharp', 'grpc'],
            BulletPoints: [
              {
                id: 's1000dAutomation',
                translationKey:
                  'Jobs.abance.csharpdev.bulletpoints.s1000dAutomation',
                categories: {
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Automation]: 1.0,
                  [BulletCategory.Impact]: 0.9,
                  [BulletCategory.Integration]: 0.8,
                  [BulletCategory.Delivery]: 0.8,
                },
              },
              {
                id: 'officeDocumentProcessing',
                translationKey:
                  'Jobs.abance.csharpdev.bulletpoints.officeDocumentProcessing',
                categories: {
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Integration]: 0.9,
                  [BulletCategory.Impact]: 0.8,
                  [BulletCategory.Quality]: 0.7,
                },
              },
              {
                id: 'applicationQualityAndRefactoring',
                translationKey:
                  'Jobs.abance.csharpdev.bulletpoints.applicationQualityAndRefactoring',
                categories: {
                  [BulletCategory.Quality]: 1.0,
                  [BulletCategory.Architecture]: 0.9,
                  [BulletCategory.Automation]: 0.9,
                  [BulletCategory.Engineering]: 0.9,
                  [BulletCategory.Impact]: 0.8,
                },
              },
              {
                id: 'crossProcessIntegration',
                translationKey:
                  'Jobs.abance.csharpdev.bulletpoints.crossProcessIntegration',
                categories: {
                  [BulletCategory.Integration]: 1.0,
                  [BulletCategory.Architecture]: 0.9,
                  [BulletCategory.Engineering]: 0.9,
                  [BulletCategory.Impact]: 0.7,
                },
              },
              {
                id: 'softwareArchitectureAndTechnologyDecisions',
                translationKey:
                  'Jobs.abance.csharpdev.bulletpoints.softwareArchitectureAndTechnologyDecisions',
                categories: {
                  [BulletCategory.Architecture]: 1.0,
                  [BulletCategory.Engineering]: 0.9,
                  [BulletCategory.Impact]: 0.8,
                  [BulletCategory.Integration]: 0.7,
                  [BulletCategory.Delivery]: 0.7,
                },
              },
            ],
          },
          {
            Title: 'Main Unreal Engine VR Developer',
            Description: t('Jobs.abance.unreal.description'),
            StartDate: Date.parse('2023/09/25'),
            EndDate: Date.parse('2024/02/24'),
            JobType: JobTypeEnum.GameDev,
            techStack: ['unreal', 'csharp', 'cpp', 'python', 'grpc'],
            BulletPoints: [
              {
                id: 'multiplayerReplication',
                translationKey:
                  'Jobs.abance.unreal.bulletpoints.multiplayerReplication',
                categories: {
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Integration]: 1.0,
                  [BulletCategory.Architecture]: 0.9,
                  [BulletCategory.Impact]: 0.8,
                },
              },
              {
                id: 'assetPipelineOptimization',
                translationKey:
                  'Jobs.abance.unreal.bulletpoints.assetPipelineOptimization',
                categories: {
                  [BulletCategory.Impact]: 1.0,
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Architecture]: 0.9,
                  [BulletCategory.Quality]: 0.9,
                  [BulletCategory.Automation]: 0.8,
                },
              },
              {
                id: 'automatedBuildPipelines',
                translationKey:
                  'Jobs.abance.unreal.bulletpoints.automatedBuildPipelines',
                categories: {
                  [BulletCategory.Automation]: 1.0,
                  [BulletCategory.Delivery]: 1.0,
                  [BulletCategory.Engineering]: 0.9,
                  [BulletCategory.Quality]: 0.9,
                  [BulletCategory.Integration]: 0.8,
                },
              },
              {
                id: 'editorAutomationTooling',
                translationKey:
                  'Jobs.abance.unreal.bulletpoints.editorAutomationTooling',
                categories: {
                  [BulletCategory.Automation]: 1.0,
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Impact]: 0.9,
                  [BulletCategory.Delivery]: 0.8,
                },
              },
              {
                id: 'qtContentProcessingIntegration',
                translationKey:
                  'Jobs.abance.unreal.bulletpoints.qtContentProcessingIntegration',
                categories: {
                  [BulletCategory.Integration]: 1.0,
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Architecture]: 0.9,
                  [BulletCategory.Automation]: 0.9,
                  [BulletCategory.Impact]: 0.8,
                },
              },
              {
                id: 'nativeCppOptimization',
                translationKey:
                  'Jobs.abance.unreal.bulletpoints.nativeCppOptimization',
                categories: {
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Impact]: 0.9,
                  [BulletCategory.Architecture]: 0.9,
                  [BulletCategory.Quality]: 0.8,
                },
              },
            ],
          },
        ],
        typeOfHire: 'full',
        typeOfPresence: 'hybrid',
      },
      {
        Title: 'Itixo | ICT Capital s.r.o',
        Location: t('Locations.Prague'),
        Url: 'https://www.itixo.com/',
        StartDate: Date.parse('2018/02/27'),
        EndDate: Date.parse('2020/06/15'),
        Jobs: [
          {
            Title: 'Backend Developer',
            Description: t('Jobs.itixo.backend.description'),
            JobType: JobTypeEnum.Backend,
            StartDate: Date.parse('2018/02/27'),
            EndDate: Date.parse('2020/06/15'),
            techStack: [
              'csharp',
              'sqlserver',
              'azure',
              'msTests',
              'xunit',
              'entity',
            ],
            BulletPoints: [
              {
                id: 'dotnetModernization',
                translationKey:
                  'Jobs.itixo.backend.bulletpoints.dotnetModernization',
                categories: {
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Architecture]: 1.0,
                  [BulletCategory.Quality]: 0.9,
                  [BulletCategory.Integration]: 0.9,
                  [BulletCategory.Impact]: 0.9,
                  [BulletCategory.Delivery]: 0.8,
                },
              },
              {
                id: 'modularArchitecture',
                translationKey:
                  'Jobs.itixo.backend.bulletpoints.modularArchitecture',
                categories: {
                  [BulletCategory.Architecture]: 1.0,
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Quality]: 0.9,
                  [BulletCategory.Impact]: 0.8,
                },
              },
              {
                id: 'codeQualityAndTesting',
                translationKey:
                  'Jobs.itixo.backend.bulletpoints.codeQualityAndTesting',
                categories: {
                  [BulletCategory.Quality]: 1.0,
                  [BulletCategory.Engineering]: 0.9,
                  [BulletCategory.Architecture]: 0.8,
                  [BulletCategory.Impact]: 0.8,
                },
              },
              {
                id: 'businessMonitoringAndAlerting',
                translationKey:
                  'Jobs.itixo.backend.bulletpoints.businessMonitoringAndAlerting',
                categories: {
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Automation]: 0.9,
                  [BulletCategory.Quality]: 0.9,
                  [BulletCategory.Impact]: 0.9,
                  [BulletCategory.Architecture]: 0.8,
                },
              },
              {
                id: 'azureDevelopment',
                translationKey:
                  'Jobs.itixo.backend.bulletpoints.azureDevelopment',
                categories: {
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Integration]: 0.9,
                  [BulletCategory.Delivery]: 0.8,
                  [BulletCategory.Impact]: 0.7,
                },
              },
              {
                id: 'salesReportingAndVisualization',
                translationKey:
                  'Jobs.itixo.backend.bulletpoints.salesReportingAndVisualization',
                categories: {
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Impact]: 0.9,
                  [BulletCategory.Integration]: 0.8,
                  [BulletCategory.Quality]: 0.7,
                },
              },
              {
                id: 'developerToolingAndCodeGeneration',
                translationKey:
                  'Jobs.itixo.backend.bulletpoints.developerToolingAndCodeGeneration',
                categories: {
                  [BulletCategory.Automation]: 1.0,
                  [BulletCategory.Engineering]: 0.9,
                  [BulletCategory.Impact]: 0.8,
                  [BulletCategory.Delivery]: 0.8,
                },
              },
            ],
          },
        ],
        typeOfHire: 'freelance',
        typeOfPresence: 'remote',
      },
      {
        Title: 'KnowledgeMill',
        Location: t('Locations.London'),
        Url: 'https://knowledgemill.com/',
        StartDate: Date.parse('2017/07/27'),
        EndDate: Date.parse('2017/12/04'),
        Jobs: [
          {
            Title: 'WebApp Dev',
            Description: t('Jobs.knowledgemill.webapp.description'),
            JobType: JobTypeEnum.WebDev,
            StartDate: Date.parse('2017/07/27'),
            EndDate: Date.parse('2017/12/15'),
            techStack: [
              'nodejs',
              'expressjs',
              'bootstrap',
              'exchangeapi',
              'centos',
            ],
            BulletPoints: [
              {
                id: 'legacyApplicationModernization',
                translationKey:
                  'Jobs.knowledgemill.webapp.bulletpoints.legacyApplicationModernization',
                categories: {
                  [BulletCategory.Architecture]: 1.0,
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Integration]: 0.9,
                  [BulletCategory.Impact]: 0.9,
                  [BulletCategory.Delivery]: 0.8,
                },
              },
              {
                id: 'apiReverseEngineering',
                translationKey:
                  'Jobs.knowledgemill.webapp.bulletpoints.apiReverseEngineering',
                categories: {
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Integration]: 1.0,
                  [BulletCategory.Quality]: 0.8,
                  [BulletCategory.Architecture]: 0.8,
                  [BulletCategory.Impact]: 0.8,
                },
              },
              {
                id: 'exchangeIntegration',
                translationKey:
                  'Jobs.knowledgemill.webapp.bulletpoints.exchangeIntegration',
                categories: {
                  [BulletCategory.Integration]: 1.0,
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Impact]: 0.8,
                  [BulletCategory.Delivery]: 0.7,
                },
              },
              {
                id: 'frontendDevelopment',
                translationKey:
                  'Jobs.knowledgemill.webapp.bulletpoints.frontendDevelopment',
                categories: {
                  [BulletCategory.Engineering]: 1.0,
                  [BulletCategory.Impact]: 0.8,
                  [BulletCategory.Quality]: 0.7,
                },
              },
              {
                id: 'linuxBuildDeploymentAutomation',
                translationKey:
                  'Jobs.knowledgemill.webapp.bulletpoints.linuxBuildDeploymentAutomation',
                categories: {
                  [BulletCategory.Automation]: 1.0,
                  [BulletCategory.Delivery]: 1.0,
                  [BulletCategory.Engineering]: 0.9,
                  [BulletCategory.Integration]: 0.9,
                  [BulletCategory.Quality]: 0.8,
                },
              },
            ],
          }
        ],
        typeOfHire: 'full',
        typeOfPresence: 'On-site',
      },
      {
        Title: 'Viewnext',
        Url: 'https://www.viewnext.com/',
        Location: t('Locations.Caceres'),
        StartDate: Date.parse('2017/03/01'),
        EndDate: Date.parse('2017/06/01'),
        Jobs: [
          {
            Title: 'Trainee Software Developer',
            Description: '',
            JobType: JobTypeEnum.Backend,
            StartDate: Date.parse('2017/03/01'),
            EndDate: Date.parse('2017/06/01'),
            techStack: [],
            BulletPoints: [{
              id: 'enterpriseIntegrationFlows',
              translationKey:
                'Jobs.viewnext.websphere.bulletpoints.enterpriseIntegrationFlows',
              categories: {
                [BulletCategory.Integration]: 1.0,
                [BulletCategory.Engineering]: 0.8,
                [BulletCategory.Architecture]: 0.8,
                [BulletCategory.Impact]: 0.6,
              },
            },
            {
              id: 'enterpriseMessagingPatterns',
              translationKey:
                'Jobs.viewnext.websphere.bulletpoints.enterpriseMessagingPatterns',
              categories: {
                [BulletCategory.Integration]: 1.0,
                [BulletCategory.Architecture]: 0.9,
                [BulletCategory.Engineering]: 0.7,
              },
            },
            {
              id: 'ibmMiddlewareDevelopment',
              translationKey:
                'Jobs.viewnext.websphere.bulletpoints.ibmMiddlewareDevelopment',
              categories: {
                [BulletCategory.Integration]: 1.0,
                [BulletCategory.Engineering]: 0.9,
                [BulletCategory.Architecture]: 0.7,
                [BulletCategory.Quality]: 0.6,
              },
            },
            {
              id: 'enterpriseDevelopmentTooling',
              translationKey:
                'Jobs.viewnext.websphere.bulletpoints.enterpriseDevelopmentTooling',
              categories: {
                [BulletCategory.Delivery]: 0.9,
                [BulletCategory.Engineering]: 0.6,
                [BulletCategory.Quality]: 0.6,
              },
            },
            ],
          },
        ],
        typeOfHire: 'full',
        typeOfPresence: 'On-site',
      },
    ].map(translate),
    Education: [
      {
        Title: t('Education.DAM.Title'),
        originalTitle:
          'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma',
        EFramework: 'EQF5/ISCED5',
        IssuerOrg: 'I.E.S Agora',
        Location: t('Locations.Caceres'),
        StartDate: Date.parse('2015'),
        EndDate: Date.parse('2017'),
        Url: 'https://www.todofp.es/dam/jcr:7655e32d-08a3-47a7-a479-ddb6f032c63e/n-tsdesarrolloaplicacionesmultiplataformaen-pdf.pdf',
        techStack: ['java', 'csharp', 'sqlserver'],
      },
      {
        Title: t('Education.SMR.Title'),
        originalTitle: 'Técnico en Sistemas Microinformáticos y Redes',
        EFramework: 'ISCED3',
        IssuerOrg: 'Educatec',
        Location: t('Locations.Caceres'),
        StartDate: Date.parse('2012'),
        EndDate: Date.parse('2014'),
        Url: 'https://www.todofp.es/dam/jcr:3a2f6e25-6324-4ced-8c08-ca6f65927900/n-tsistemasmicroinformaticosredesen-pdf.pdf',
        techStack: [],
      },
    ],
    Certificate: [
      {
        Title: 'Unreal Engine C++ Developer: Learn C++ and Make Video Games',
        type: 'gamedev',
        IssuerOrg: 'Udemy',
        date: Date.parse('2019/05/01'),
      },
      {
        Title:
          'CCNA Discovery 2 : Working at a Small-to-Medium Business or ISP',
        type: 'network',
        IssuerOrg: 'Cisco',
        date: Date.parse('2013/06/01'),
      },
      {
        Title: 'Adobe Photoshop CS3 Course',
        type: 'design',
        IssuerOrg: 'Grupo System',
        date: Date.parse('2013/06/01'),
      },
      {
        Title: 'PowerPoint 2010',
        type: 'office',
        IssuerOrg: 'Grupo System',
        date: Date.parse('2013/06/01'),
      },
      {
        Title: 'Access 2010',
        type: 'office',
        IssuerOrg: 'Grupo System',
        date: Date.parse('2013/06/01'),
      },
      {
        Title: 'CCNA Discovery 1 : Networking for Home and Small Businesses',
        type: 'office',
        IssuerOrg: 'Grupo System',
        date: Date.parse('2013/02/01'),
      },
      {
        Title: 'OpenOffice Writer',
        type: 'office',
        IssuerOrg: 'Grupo System',
        date: Date.parse('2012/12/01'),
      },
    ],
    Talks: [
      {
        Title: 'Domestic Motion Capture',
        location: 'Cadiz GameDev MeetUp',
        date: Date.parse('2023/12/15'),
      },
      {
        Title: 'Audio Design through Audio Frameworks',
        location: 'Cadiz GameDev MeetUp',
        date: Date.parse('2025/08/05'),
      },
    ],
  };
}
