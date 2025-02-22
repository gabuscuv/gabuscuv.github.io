import {getTranslations} from 'next-intl/server';

export enum JobTypeEnum {
  All,
  GameDev,
  Backend,
  WebDev,
}

class CommonMinimum {
  Title = '';
  StartDate = 0;
  EndDate = 0;
}

class CommonMinimumWithLocation extends CommonMinimum {
  Location = '';
  Url = '';
}

export class JobsType extends CommonMinimum {
  Description = '';
  JobType = JobTypeEnum.All;
  BulletPoints: Array<string> = [];
  techStack: Array<string> = [];
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

export type ResumeType = {
  Jobs: Array<CompanyType>;
  Education: Array<EducationType>;
  Certificate: Array<{
    Title: string;
    type: string;
    IssuerOrg: string;
    date: number;
  }>;
  Talks: Array<{Title: string; location: string; date: number}>;
};

export async function ResumeContent(): Promise<ResumeType> {
  const t = await getTranslations('Resume');
  // const t = useTranslations('Resume'); // for preview with i18n-ally
  return {
    Jobs: [
      {
        Title: 'Ghenova Digital',
        Location: t('Locations.Puerto'),
        Url: 'https://digital.ghenova.com/',
        StartDate: Date.parse('2025/02/26'),
        EndDate: 0,
        typeOfHire: 'full',
        typeOfPresence: 'hybrid',
        Jobs: [
          {
            Title: 'DevOps Developer',
            Description: '',
            JobType: JobTypeEnum.Backend,
            StartDate: Date.parse('2025/02/26'),
            EndDate: 0,
            techStack: ['cpp', 'qt', 'zmq', 'dds'],
            BulletPoints: [],
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
            Description: t('Jobs.Abance.e park.description'),
            JobType: JobTypeEnum.Backend,
            StartDate: Date.parse('2024/10/15'),
            EndDate: Date.parse('2024/12/30'),
            techStack: ['cpp', 'qt', 'zmq', 'dds'],
            BulletPoints: [
              t('Jobs.Abance.cppusv.bulletpoints.Simulators'),
              t('Jobs.Abance.cppusv.bulletpoints.Bridge'),
              t('Jobs.Abance.cppusv.bulletpoints.Deploy'),
              t('Jobs.Abance.cppusv.bulletpoints.Porting'),
            ],
          },
          {
            Title: 'Lead Typescript / React / Next.JS Developer',
            Description: t('Jobs.Abance.nextreact.description'),
            JobType: JobTypeEnum.WebDev,
            StartDate: Date.parse('2024/05/15'),
            EndDate: Date.parse('2025/02/25'),
            techStack: ['typescript', 'react', 'nextjs'],
            BulletPoints: [
              t('Jobs.Abance.nextreact.bulletpoints.AbanceReact'),
              t('Jobs.Abance.nextreact.bulletpoints.Magallanes'),
            ],
          },
          {
            Title: 'Wordpress Developer',
            Description: t('Jobs.Abance.wordpress.Description'),
            JobType: JobTypeEnum.WebDev,
            StartDate: Date.parse('2024/03/10'),
            EndDate: Date.parse('2024/08/10'),
            techStack: ['oxygen'],
            BulletPoints: [
              t('Jobs.Abance.wordpress.bulletpoints.content'),
              t('Jobs.Abance.wordpress.bulletpoints.redesign'),
              t('Jobs.Abance.wordpress.bulletpoints.animations'),
            ],
          },
          {
            Title: 'Lead C# Software Developer',
            Description: t('Jobs.Abance.csharpdev.Description'),
            JobType: JobTypeEnum.Backend,
            StartDate: Date.parse('2024/02/24'),
            EndDate: Date.parse('2025/02/25'),
            techStack: ['csharp', 'grpc'],
            BulletPoints: [
              t('Jobs.Abance.csharpdev.bulletpoints.ExcelParser'),
              t('Jobs.Abance.csharpdev.bulletpoints.HTMLScrapper'),
              t('Jobs.Abance.csharpdev.bulletpoints.MultimediaConverter'),
              t('Jobs.Abance.csharpdev.bulletpoints.DotNetConsultant'),
              t('Jobs.Abance.csharpdev.bulletpoints.UnitTestDesigner'),
            ],
          },
          {
            Title: 'Lead Unreal Engine VR Developer',
            Description: t('Jobs.Abance.unreal.Description'),
            StartDate: Date.parse('2023/09/25'),
            EndDate: Date.parse('2024/02/24'),
            JobType: JobTypeEnum.GameDev,
            techStack: ['unreal', 'csharp', 'cpp', 'python', 'grpc'],
            BulletPoints: [
              t('Jobs.Abance.unreal.bulletpoints.Networking'),
              t('Jobs.Abance.unreal.bulletpoints.importOptimizations'),
              t('Jobs.Abance.unreal.bulletpoints.buildPipeline'),
              t('Jobs.Abance.unreal.bulletpoints.qtTools'),
              t('Jobs.Abance.unreal.bulletpoints.ioOptimization'),
              t('Jobs.Abance.unreal.bulletpoints.pythonAuto'),
              t('Jobs.Abance.unreal.bulletpoints.accesibility'),
              t('Jobs.Abance.unreal.bulletpoints.features'),
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
            Description: t('Jobs.itixo.backend.Description'),
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
              t('Jobs.itixo.backend.bulletpoints.monitoring'),
              t('Jobs.itixo.backend.bulletpoints.refactoring'),
              t('Jobs.itixo.backend.bulletpoints.graphs'),
              t('Jobs.itixo.backend.bulletpoints.tests'),
              t('Jobs.itixo.backend.bulletpoints.azure'),
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
            Description: t('Jobs.knowledgemill.webapp.Description'),
            JobType: JobTypeEnum.WebDev,
            StartDate: Date.parse('2017/08/15'),
            EndDate: Date.parse('2017/12/15'),
            techStack: [
              'nodejs',
              'expressjs',
              'bootstrap',
              'exchangeapi',
              'centos',
            ],
            BulletPoints: [
              t('Jobs.knowledgemill.webapp.improvements'),
              t('Jobs.knowledgemill.webapp.redesign'),
              t('Jobs.knowledgemill.webapp.rpm'),
            ],
          },
          {
            Title: 'Apprenticeship WebApp Dev',
            Description: '',
            JobType: JobTypeEnum.WebDev,
            StartDate: Date.parse('2017/07/27'),
            EndDate: Date.parse('2017/08/15'),
            techStack: ['nodejs', 'bootstrap', 'exchangeapi', 'centos'],
            BulletPoints: [],
          },
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
            BulletPoints: [],
          },
        ],
        typeOfHire: 'full',
        typeOfPresence: 'On-site',
      },
    ],
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
    ],
  };
}
