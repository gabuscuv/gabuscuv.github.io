'use client';
import {GameProjects as GameProjectsType} from '@/src/data/ProjectDataTypes';
import {useTranslations} from 'next-intl';

export function GameProjects() {
  const t = useTranslations('Projects.gameProjects');
  return [
    new GameProjectsType(
      'project-34',
      't!Ut3h7YYFv9k1MDeaAhU=',
      ['unreal'],
      2024,
      '/img/projects/project-34-icon.png',
      'MalagaJam 2024',
      `
      <p>${t('WorkInProgressDescription')}</p>
      <iframe frameborder="0"
      src="https://itch.io/embed/2494020"
      width="552"
      height="167">
     </iframe>`,
      [],
      '#23bd69',
      true
    ),
    new GameProjectsType(
      'project-33',
      't!WtXn9NQ4/v45Nw==',
      ['unreal', 'wwise'],
      2023,
      '/img/projects/project-33-icon.png',
      'Spain Game Jam IV',
      `
      <p>${t('WorkInProgressDescription')}</p>
      <iframe frameborder="0" src="https://itch.io/embed/2274926" width="552" height="167"></iframe>
      `,
      [],
      '#23bd69',
      true
    ),
    new GameProjectsType(
      'project-32',
      't!Td3h9JsP/v4lNCeX',
      ['unity', 'csharp', 'fmod'],
      2023,
      '/img/projects/project-32-icon.png',
      'MalagaJam 2023 Summer Edition',
      `
      <p>${t('WorkInProgressDescription')}</p>
      <iframe frameborder="0" src="https://itch.io/embed/2194730" width="552" height="167"></iframe>
      `,
      [],
      '#23bd69',
      true
    ),
    new GameProjectsType(
      'project-1',
      't!TNr+7YAA+vZ8EgbSKgLUSKeDdHZjk1EJ',
      ['unreal', 'fmod'],
      2022,
      '/img/projects/project-31-icon.png',
      t('VRProject.Description'),
      `
      <p>${t('TranslationMissing')}</p>

    <div class="paragraph">
     <strong>VRProject</strong> is my latest project. You can check the real game page <a href="https://cutt.ly/LHTkwEH"><strong>here</strong></a> <br/>

    You can find some (maybe outdated?) essential information about the development <a href="https://github.com/gabuscuv/VRProjectLiteForRecruiter-HR">here.</a> <br/>
     You can find <a href="https://www.youtube.com/playlist?list=PLUjwTJzEXpjZi-vGFN79H84W2OptAIlkG"> here </a> an (outdated)  playlist about the different features/mechanics of the game. 
     <br/>Placeholder Photo by <a href="https://unsplash.com/@unblume?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jannis Blume</a> on <a href="https://unsplash.com/s/photos/virtual-reality-woman?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>.
     </div>

     <div class="paragraph center">
     <div class="notice">
         Windows build available on <a class="oldlink" href="https://cutt.ly/4HEqUQu" target="_blank">itch.io (Under a pen-name)</a>.<br/>
         It's possible to ask for a verification by a message & digital signature <a class="oldlink" href="https://cutt.ly/gHR0BaF">here</a><br/>
         Please Contact me if It's necessary
     </div>
     <div class="paragraph center">
     <iframe class="youtube" src="https://www.youtube-nocookie.com/embed/videoseries?list=PLUjwTJzEXpjZi-vGFN79H84W2OptAIlkG" frameborder="0" allowfullscreen></iframe>
     </div>
    </div>

    `,
      [],
      '#23bd69',
      true
    ),
    new GameProjectsType(
      'project-2',
      'Kübler',
      ['love2d', 'lua'],
      2020,
      '/img/projects/project-2-icon.png',
      'Spain Game Jam II',
      `
      <p>${t('TranslationMissing')}</p>
    <div class="paragraph">
        <strong>Kübler</strong> is a "unfinished" project leaded by Juanjo Salvador for Spain GameDev II, Written in Love2D. <br />
        It's only in Spanish
    </div>
    <div class="paragraph">
    Main Tasks :
    <ul>
    <li>ImGui Tools/Debugger Programmer</li>
    <li>Game Programmer</li>
    <li>Music Composition (No Published)</li>
    <li>CI Automatization (for Release & Debug Builds)</li>
    </ul>
    </div>
    <div class="paragraph center">
        <iframe class="youtube" src="https://www.youtube-nocookie.com/embed/bR4uboKmQQU" frameborder="0" allowfullscreen></iframe>
    </div>

    <div class="paragraph">
    <div class="notice">
        Windows build available on <a class="oldlink" href="https://juanjosalvador.itch.io/kubler" target="_blank">itch.io</a>.
    </div>
    </div>
    `,
      [
        '/img/projects/Kubler/MainTitle.jpg',
        'https://img.itch.zone/aW1hZ2UvNzcxMzE3LzQzMTUzNDcucG5n/250x600/Q3WTMj.png',
        '/img/projects/Kubler/Shield.jpg',
        '/img/projects/Kubler/Boss.jpg',
      ],
      '#5a78af'
    ),
    new GameProjectsType(
      'project-3',
      'TestingGround++',
      ['unreal', 'cpp'],
      2019,
      '/img/projects/project-3-icon.png',
      t('TestingGround.Description'),
      `
      <p>${t('TranslationMissing')}</p>
    <div class="paragraph">
        <strong>TestingGround++</strong> is an improvement of the last exercise from the UE4 course made by <a href="https://www.udemy.com/user/bentristem/">Ben Tristem</a><br/>
        Adding some must-have features.
    </div>
    <div class="paragraph center"><iframe class="youtube" src="https://www.youtube-nocookie.com/embed/UFTDGFCA2vI" frameborder="0" allowfullscreen></iframe></div>
    <div class="paragraph">
        New Features :
        <ul>
        <li>Added Multi-Tile Support (+ 2 New tiles extras).</li>
        <li>Added Enemies Multiplier.</li>
        <li>Added Title Screen, Dead Screen, Tutorial Screen, Settings Screen and Pause Screen.</li>
        <li>Added Revive/Lives/Attempts mode</li>
        <li>Added Aim Mode.</li>
        <li>Added Walk/Run Mode.</li>
        <li>Added Footsteps Sounds.</li>
        <li> Added Multi-language Support (English and Spanish).
        <li> Better Memory Management.</li>
        <li> Better Textures.</li>
        <li> Better Performance.</li>
        <li> Improved UI.</li>
        <li> The capacity to save high scores.</li>
        </ul>
    </div>

    <div class="paragraph">
        <div class="notice">
        Windows/Linux builds available <a class="oldlink" href="https://github.com/gabuscuv/TestingGrounds-Public/releases" target="_blank">here</a>.
        Source code is available on <a class="oldlink" href="https://github.com/gabuscuv/TestingGrounds-Public" target="_blank">GitHub</a>.
        </div>
    </div>

    `,
      [
        '/img/projects/TestingGrounds/MainMenu.jpg',
        '/img/projects/TestingGrounds/NormalBattle.jpg',
        '/img/projects/TestingGrounds/AmmoItem.jpg',
        '/img/projects/TestingGrounds/DeathScreen.jpg',
      ],
      '#383838'
    ),
    new GameProjectsType(
      'project-4',
      '_4thof4th',
      ['monogame', 'csharp'],
      2017,
      '/img/projects/project-4-icon.png',
      'An end-of-degree 2D Game Engine',
      `
      <p>${t('TranslationMissing')}</p>
    <div class="paragraph">
    <strong>_4thof4th (2017)</strong> was my end of degree project (note: 9) using my game engine (Usagi Engine) based on MonoGame Game Framework. (C#). <br />
    The Game is about a supposed cute game which suffers a simulated buffer overflow and because of this causes a virtual reboot <br />
    booting in a fake operating system (based on FreeBSD's appearance) and (again, fictional/virtual) running some unknown routines which activate a typical evil AI. (like HAL900, GLaDOS) <br />
    It shows some tricks like toggling keyboard LEDs lights and reading some desktop filenames (again, it's safe)
    and produces some beepings (a little melody!), all with a cheap end battle which is poor bullet hell.
    And It doesn't have an ending so, yeah, An unfinished project.
    </div>
    <br/>Placeholder Image by <a class="oldlink" target="_blank" href="https://www.pexels.com/fr-fr/@neo8iam">NEOSiAM 2020</a>.
    
    <div class="paragraph">
        Main features :
        <ul>
        <li>Emulate a Customized POST with your computer data (your real BIOS and CPU are shown)!!</li>
        <li>Simulate a FreeBSD Bootstrap!!</li>
        <li>Uses your PC-Speaker (DOS-Style)</li>
        <li>Enables lights from your keyboard!!!! (?)</li>
        <li>It's not work that I can be proud of, as it was my first "game" (and one quite bad) for my own way but hey!. Not bad for a beginner, right? (?)</li>
        </ul>
    </div>

    <!-- <div class="paragraph"><div class="notice">Windows build available on <a href="https://some.where/nice" target="_blank">itch.io</a>.</div> -->
    </div>

    <div class="paragraph">
    Trivia: Mono means "Monkey" in Spanish and Usagi means "Rabbit" in Japanese, So... <br /> Is It Rabbit over a Monkey? <br />
    *Ba dum tss*
    </div>
    `,
      [
        '/img/projects/4thof4th/MainTitle.jpg',
        '/img/projects/4thof4th/Overflow.jpg',
        '/img/projects/4thof4th/VirtualBios.jpg',
        '/img/projects/4thof4th/InGame.jpg',
      ],
      '#e80fb7'
    ),
  ];
}

export default GameProjects;
