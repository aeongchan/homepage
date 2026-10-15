---
title: 집에 가성비 OpenWrt 공유기가 있다는걸 몰랐다
description: ipTIME AX3000Q 공유기 OpenWrt 펌웨어 설치기
date: 2026-10-15
draft: false
tags:
  - iptime
  - 공유기
  - openwrt
image: '@/assets/images/posts/8494cfd024f6.png'
---

## 갖게된 계기

현재 인터넷에 연결되어 있는 구조가 로컬망에 접근하기 힘든 상태여서(컴퓨터 -> 모뎀, 핸드폰 또는 VR -> 다른 방 공유기 -> 모뎀) 개인용으로 필요했다.

더군다나 그당시 VR 입문을 했을 때여서 무선으로 원활하게 연결하기 위해서 더더욱 필요하기도 했다.

사기 전에 tailscale이나 wireguard 등을 통해 로컬망을 공유하는 방법도 써봤지만, 연결 프로그램 자체가 사용자 지정 ip를 제공 안해줄 때도 있어서 갈수록 복잡하게 해결하기가 귀찮았다.

하드하게 사용할 것도 아니고 그냥 부드럽게만 연결 잘해주면 좋겠다고 생각해 친구들을 통해서 IpTIME AX3000Q 공유기를 쿠팡에서 구입했다.

[![수익링크 아님](@/assets/images/posts/f812c32c6d9b.png)](https://www.coupang.com/vp/products/8615288894?itemId=24991184475&vendorItemId=91996534872)

_저 가격 그대로 산건 아니고, 웰컴백 한 25,000원 쿠폰 받고나서 산거다_

구입 후 기본 펌웨어만으로도 충분히 만족하면서 지냈는데.. 최근 우연히 [OpenWrt가 해당 공유기를 지원한다는 것](https://openwrt.org/toh/iptime/ax3000q)을 알게 되었다!!

## 설치

공식 문서에서는 [24.10.5](https://openwrt.org/releases/24.10.5 "releases:24.10.5")를 기준으로 펌웨어 파일들이 적혀있는데, 그냥 당당하게 최신 펌웨어로 사용하기로 했다.

1. 작성일 기준 [25.12.5](https://openwrt.org/releases/24.10.5)이 최신이여서 펌웨어 선택 사이트에서 factory 펌웨어를 구한다.

[https://firmware-selector.openwrt.org/?version=25.12.5&target=mediatek%2Ffilogic&id=iptime_ax3000q](https://firmware-selector.openwrt.org/?version=25.12.5&target=mediatek%2Ffilogic&id=iptime_ax3000q)

2. 그리고 IpTIME 공식 OEM 복구 소프트웨어를 통해 펌웨어를 플래시한다.

[![](@/assets/images/posts/4c4e53a5624c.png)](https://openwrt.org/toh/iptime/ax3000q#specific_values_needed_for_the_oem_recovery_software)

3. 끝

## 테마 설치

![](@/assets/images/posts/2abd062b3c56.png)

설치는 다했는데 기본 테마가 너무 딱딱해서 다른걸로 바꿀려고 한다.

가능한 luci 기본 테마 구조를 유지하는 걸 찾다가 [luci-theme-material3](https://github.com/michioxd/luci-theme-material3) 테마가 있어서 설치했다.

```shellscript
# 작성일 기준 0.1이 최신
wget -O luci-theme-material3-0.1-r20260703.apk "https://github.com/michioxd/luci-theme-material3/releases/download/0.1/luci-theme-material3-0.1-r20260703.apk"
apk add ./luci-theme-material3-0.1-r20260703.apk
# 문제 없을시 파일 삭제
rm ./luci-theme-material3-0.1-r20260703.apk
```

이왕 쉘 접근 한겸 한국어 패키지도 넣었다.

```shellscript
apk add luci-i18n-base-ko luci-i18n-firewall-ko
```

[http://192.168.1.1/cgi-bin/luci/admin/system/system](http://192.168.1.1/cgi-bin/luci/admin/system/system) 로 가서 언어는 한국어와 디자인은 Material3로 정한 뒤 `저장 및 적용` 누르면 끝


---

나머지는 귀찮아서 나중에 추가할 예정.
