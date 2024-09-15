---
layout: page
title: CheatSheet
permalink: /misc/cheatsheet/
---

## VR

### Force use to Use X VR API

- OpenXR
  - Override "XR_RUNTIME_JSON" Environment variable
  - Examples
    - Windows+Oculus: `XR_RUNTIME_JSON=%OCULUSHOME%\Support\oculus-runtime\oculus_openxr_64.json`
    - Windows+SteamVR: `XR_RUNTIME_JSON=X:\Program Files (x86)\Steam\steamapps\common\SteamVR\steamxr_win64.json`
    - GNU/Linux+monado: `XR_RUNTIME_JSON=/usr/share/openxr/1/openxr_monado.json`
    - GNU/Linux+SteamVR: `XR_RUNTIME_JSON=~/.steam/steam/steamapps/common/SteamVR/steamxr_linux64.json`
- "Legacy" APIs (OVR/OpenVR)
  - Unreal Engine-based Games:
    - `%command% -hmd=SteamVR`
    - `%command% -hmd=OculusHMD`

  - Unity-based Games:
    - `%command% -vrmode openvr`
    - `%command% -vrmode oculus`
      - Require "OVRPlugin.dll" support
  
### Nice Wrappers

- [LibOVRWrapper (Oculus SDK<=0.8)](https://github.com/kalavaras/LibOVRWrapper)
- [Hydra-OpenVR](https://github.com/CrossVR/Hydra-OpenVR)
  
## Misc Stuff

### My Typical collage

- `montage * -label '%c' -tile 3x -resize 1920x1080 -frame 2 -geometry +0+0 ./finish/result.jpg`

### Fixing setcap for SteamVR Linux

`sudo setcap CAP_SYS_NICE+ep ~/.local/share/Steam/steamapps/common/SteamVR/bin/linux64/vrcompositor-launcher`

### Use SteamVR Controllers in No-Vive Ecosystem

TL;DR: It's will cost you about ~675.98€
which is about 400€ saves vs buying a Valve Index full Kit (1079€).

- VS Rift S Cheapest possible pricetag is 399€ (Black Friday sales).
  You only will save 4€, So It's only recommended for already users.

- VS Quest 2, You will save 104.02€ (so ,maybe could be a deal).

- VS Reverb G2 (Without Controllers), You will loss -195.98€.

The "Hardware" requirements for Lighthouse are next ones:

- [2x Lighthouses 2.0/1.0, 159€*2=305€](https://store.steampowered.com/app/1059570/Valve_Index_Base_Station/)

- [Valve Index Controllers, 299€](https://store.steampowered.com/app/1059550/Valve_Index_Controllers/)

- [2x Vive USB Trackers, 28.99$*2=57.98$](https://tundra-labs.com/shop/vive-dongle)

You will get required installed these Software:

- [OpenVR Space Calibrator](https://github.com/pushrax/OpenVR-SpaceCalibrator)

- [OpenVR-AdvancedSettings](https://github.com/OpenVR-Advanced-Settings/OpenVR-AdvancedSettings/releases)

There are some VideoTutorial which can guide you.

- [Do The Valve Index Controllers Work With The Oculus Rift?](https://www.youtube.com/watch?v=5QKy3nxqLI8)

- [HOW TO USE THE HP REVERB G2 WITH INDEX CONTROLLERS](https://www.youtube.com/watch?v=r_SepHooREo)
