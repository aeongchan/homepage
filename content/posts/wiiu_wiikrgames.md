---
title: "Wii U에서 Wii 한국 정발 게임 구동하기"
date: 2024-07-24T19:25:40+09:00
draft: true
---

아무런 패치를 하지 않은 Wii 한국 정발 게임을 Wii U에서 구동 시킬려고 하면 로딩이 전혀 되질 않았다.\
이유는 단순한데, 게임 iOS가 ciOS가 적용된 249~251을 안써서 그런거였다.\
[priiloader](https://wii.hacks.guide/priiloader.html)로 [`Force Disc Games to run under IOSXXX`](https://dacotaco.github.io/priiloader/docs/HACKSLIST.html#force-disc-games-to-run-under-ios248249250251) 옵션을 키고 강제로 구동시켜 보기도 하고, Wiiflow Lite 또는 USB Loader GX에서 게임 언어를 한국어로 바꾸고, 강제로 게임 iOS를 변경해 보아도 로딩이 안되었다. (특히 priiloader 옵션킨건 vWii 부팅하자마자 위모트가 인식이 안되는 일종의 벽돌이 되었다..)

게임 파일 자체를 수정해야겠다고 판단, 바로 검색에 들어갔다.\
wiikeychanger 라는 툴을 이용하면 된다고 한다!

## 패치
### 준비물
- [wiikeychanger](http://gbatemp.net/downloads/%5B3332%5Dwiikeychanger_1.0.zip)[^1]

[^1]: https://gbatemp.net/download/wii-key-changer.2993/ 가 원본인걸로 보이는데, 인터넷에서 돌아다니는 1.01rc 버전은 아무리 찾아봐도 어디서 나온건지 못찾겠다.