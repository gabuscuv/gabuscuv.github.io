import {GameToolProjects} from '@/src/data/ProjectDataTypes';
import {getTranslations} from 'next-intl/server';

export async function GameToolProjectsList() {
  const t = await getTranslations('Projects.gameTools');
  return [
    new GameToolProjects(
      'project-16',
      'Async Map Framework',
      ['unreal', 'cpp'],
      2021,
      '',
      '',
      `
      <p>${t('WorkInProgressDescription')}</p>

      <a href="https://github.com/gabuscuv/AsyncMapFramework"><img src="https://opengraph.githubassets.com/a2ecbd5836e9df8799bc72db1eaf9432781e55f22b3da85036716adcf36a00b1/gabuscuv/AsyncMapFramework" /> </a>
      `,
      [],
      '#c10606',
      false,
      false,
    ),
    new GameToolProjects(
      'project-17',
      'OpenXR Controller Integration',
      ['unreal', 'cpp'],
      2021,
      '/img/projects/project-17-icon.gif',
      t('OXI.Description'),
      `
      <p>${t('WorkInProgressDescription')}</p>
        <a href="https://github.com/gabuscuv/CustomOpenXRControllerIntegration"><img src="https://opengraph.githubassets.com/79762130c9bbd1f90ef3b2fcc247eb55c37fea6dfbd7fb9aa27b0db43bbeb3e8/gabuscuv/CustomOpenXRControllerIntegration" /> </a>

      `,
      [],
      '#c10606',
      false,
      false,
    ),
    new GameToolProjects(
      'project-6',
      'ArrowDialogueParse',
      ['golang'],
      2021,
      '/img/projects/project-6-icon.png',
      '',
      `
    <div class="paragraph">
      <strong>ArrowDialogueParse</strong> is a simple & quick format converter program/script written in golang. <br />
      This parser allows converts all dialogue from a Arrow project to CSV which makes importable to another Game Engine like Unreal Engine.
            </div>
            <div class="paragraph center">
            <div class="notice">
            Available on <a href="https://github.com/gabuscuv/ArrowDialogueParser" target="_blank">Github</a>
            </div>
        </div>

          <div class="paragraph">
            Main features :
            <ul>
            <li>Fast, Quick & Simple</li>
            <li>Unattended mode using a JSON config file!</li>
            <li>Allows use Node Notes as Metadata!</li>
            </ul>
        </div>

    `,
      [],
      '#c10606',
      false,
      false,
    ),
    new GameToolProjects(
      'project-7',
      'DialogueToTTS',
      ['csharp'],
      2021,
      '/img/projects/DialogueToTTS-icon.png',
      '',
      `
    <div class="paragraph">
      <strong>DialogueToTTS</strong> is a program written in C#/.NETCore<br />
      This program is an automatized "frontend" for <a href="https://github.com/mozilla/TTS">TTS from Mozilla/coqui-ai</a> which allows
      convert tons of dialogues/data generated/based from <a href="https://github.com/gabuscuv/ArrowDialogueParser" target="_blank">ArrowDialogueParser</a>
      to TTS (Program) for WaveForms Generation, For a easy Placeholder/Mock Data/Testing.
            </div>
            <div class="paragraph center">
            <div class="notice">
            Available on <a href="https://github.com/gabuscuv/DialogueToTTS" target="_blank">Github</a>
            </div>
        </div>

          <div class="paragraph">
            Main features :
            <ul>
            <li>Multi-plataform</li>
            <li>CLI Support or Unattended mode using a JSON config file!</li>
            <li>Done in half a day (!)</li>
            </ul>
        </div>

    `,
      [],

      '#c10606',
      false,
      false,
    ),
    new GameToolProjects(
      'project-8',
      'UE4 Toolkit',
      ['powershell', 'bash'],
      2020,
      '/img/projects/toolkit/cmd.jpg',
      '',
      `
    <div class="paragraph">
                <strong>UE4 Toolkit</strong> is a set of scripts written in Powershell & Bash that helps about automatization compiling and cooking UE4 Games since CLI. <br />
                without need open UE4Editor, Ideal for Continous Integration Tasks.
          </div>

    <div class="paragraph center">
              <div class="notice">
                Available on <a href="https://github.com/gabuscuv/UE4-Toolkit-Public" target="_blank">Github</a>
              </div>
          </div>

            <div class="paragraph">
              Main features :
              <ul>
              <li>Allows Cooking your UE4 Game, copy all extra files (like README, NOTICE or ChangeLog files) & compress in one-click/enter</li>
              <li>Allows you retry failed compilations or initial compilations in one-click/enter</li>
              <li>Make easy set up custom ssh keys, name, e-mail commits, and checks if it's not installed git lfs</li>
              </ul>
          </div>

`,
      [],
      '#1ca1e2',
      false,
      true,
    ),
  ];
}
