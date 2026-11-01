
import {JobTypeEnum} from './types';

type TechnologyWeights = Record<string, number>;

export const MIN_JOB_SCORE: Record<JobTypeEnum, number> = {
  [JobTypeEnum.All]: 0,
  [JobTypeEnum.GameDev]: 4,
  [JobTypeEnum.Backend]: 4,
  [JobTypeEnum.WebDev]: 4,
  [JobTypeEnum.EmbeddedSystem]: 4,
  [JobTypeEnum.Lite]: 4,
  [JobTypeEnum.GameDevTools]: 4,
  [JobTypeEnum.Multimedia]: 4
};

export const jobTypeFilter: Partial<
  Record<JobTypeEnum, TechnologyWeights>
> = {
  [JobTypeEnum.All]: {},

  [JobTypeEnum.GameDev]: {
    // Primary game engines
    gamedev: 12,
    unreal: 12,
    unity: 10,
    godot: 10,

    // Game development libraries and middleware
    fmod: 10,

    // General-purpose programming
    cpp: 7,
    csharp: 5,
    python: 2,

    // Real-time software, simulation and tooling
    qt: 3,
    dds: 3,
    zmq: 3,
    grpc: 2,

    // Deprioritize unrelated web development
    wordpress: -5,
    react: -3,
    nextjs: -3,
  },

  [JobTypeEnum.Backend]: {
    // Core backend languages
    cpp: 5,
    csharp: 5,
    typescript: 3,
    python: 3,

    // APIs and communication
    grpc: 4,
    expressjs: 3,
    nodejs: 3,
    dds: 3,
    zmq: 3,
    restapi: 3,
    protobuf: 3,

    // Databases and cloud
    sqlserver: 3,
    postgresql: 3,
    mysql: 2,
    entity: 2,
    azure: 2,
    docker: 2,

    // Supporting technologies
    qt: 2,
    linux: 2,
    git: 1,

    // Deprioritize unrelated specializations
    react: -3,
    nextjs: -2,
    unreal: -3,
    unity: -3,
    wordpress: -3,
  },

  [JobTypeEnum.WebDev]: {
    // Frontend
    typescript: 5,
    javascript: 5,
    react: 5,
    nextjs: 5,
    html: 4,
    css: 4,
    bootstrap: 2,

    // Backend and full-stack web
    nodejs: 4,
    expressjs: 3,
    restapi: 3,
    grpc: 2,
    csharp: 2,
    sqlserver: 2,
    postgresql: 2,

    // CMS and web tooling
    wordpress: 2,
    oxygen: 2,
    php: 2,
    exchangeapi: 1,
    eslint: 1,
    prettier: 1,

    // Deprioritize unrelated specializations
    cpp: -10,
    unreal: -10,
    unity: -10,
    godot: -10,
  },

  [JobTypeEnum.EmbeddedSystem]: {
    // Systems and low-level programming
    cpp: 7,
    c: 7,
    csharp: 2,
    python: 3,

    // Hardware and embedded platforms
    embedded: 7,
    esp32: 7,
    arduino: 5,
    microcontroller: 5,
    firmware: 5,
    nfc: 3,

    // Networking and communications
    networking: 5,
    tcpip: 4,
    udp: 4,
    zmq: 4,
    dds: 4,
    protobuf: 3,
    nmea: 3,
    dis: 3,

    // Operating systems and integration
    linux: 4,
    rtos: 4,
    qt: 3,
    cmake: 3,
    grpc: 2,

    // Deprioritize unrelated web and game specialization
    wordpress: -4,
    react: -3,
    nextjs: -3,
  },

  [JobTypeEnum.Lite]: {
    // Generalist profile: prioritize broadly applicable development
    cpp: 4,
    csharp: 4,
    typescript: 4,
    javascript: 3,
    python: 3,

    // Common application technologies
    react: 3,
    nodejs: 3,
    qt: 3,
    sqlserver: 2,
    restapi: 2,
    grpc: 2,
    linux: 2,

    // Engineering practices and delivery
    architecture: 3,
    testing: 3,
    quality: 3,
    automation: 2,
    integration: 2,
    git: 1,

    // Lower priority for highly specialized stacks
    unreal: 1,
    unity: 1,
    godot: 1,
    wordpress: 1,
  },

  [JobTypeEnum.GameDevTools]: {
    // Developer tools and game-engine ecosystems
    gamedev: 8,
    unreal: 8,
    unity: 7,
    godot: 5,

    // Core languages and scripting
    cpp: 7,
    csharp: 6,
    python: 5,
    typescript: 3,
    lua: 4,

    // Build systems and automation
    cmake: 5,
    automation: 5,
    buildsystem: 5,
    ci: 4,
    git: 3,
    linux: 3,

    // Editor tooling and UI frameworks
    qt: 5,
    imgui: 5,
    editor: 4,
    commandlet: 4,
    tooling: 5,

    // Content pipelines and integration
    grpc: 3,
    protobuf: 3,
    dds: 2,
    zmq: 2,
    openxml: 2,

    // Deprioritize unrelated web specialization
    wordpress: -4,
    nextjs: -2,
  },

  [JobTypeEnum.Multimedia]: {
    // Real-time multimedia and graphics
    cpp: 6,
    csharp: 3,
    python: 3,
    qt: 5,
    opengl: 5,
    vulkan: 5,
    directx: 4,
    sdl: 4,
    raylib: 4,
    skia: 4,

    // Audio and video
    multimedia: 7,
    audio: 6,
    video: 6,
    fmod: 5,
    wasapi: 3,
    ffmpeg: 4,
    streaming: 4,
    gstreamer: 3,

    // Real-time systems and integration
    unreal: 4,
    unity: 3,
    dds: 3,
    zmq: 3,
    networking: 3,
    protobuf: 2,

    // Tooling and deployment
    linux: 3,
    cmake: 3,
    automation: 2,
    git: 1,

    // Deprioritize unrelated web specialization
    wordpress: -3,
    nextjs: -2,
  },
};