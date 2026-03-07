
export type Language = 'ko' | 'en';

export const translations = {
  ko: {
    siteTitle: "진성 난수 로또 추출기 | True Random Lotto",
    heroBadge: "True Random 기반 로또 번호 추출기",
    heroTitle: "True Random Lotto",
    heroSubtitle1: "5가지 서로 다른 물리적 소스에서 추출한 진성 난수를 사용하여",
    heroSubtitle2: "예측 불가능한 행운의 조합을 생성합니다.",
    generateBtn: "번호 생성하기",
    generating: "추출 중...",
    emptyPrompt: "버튼을 눌러 5가지 물리적 소스로부터 번호를 생성하세요.",
    sourceLabels: {
      atmospheric: "Random.org (대기 소음 잡음)",
      quantum: "ANU QRNG (양자 불확정성)",
      thermal: "CSPRNG (열 잡음/하드웨어 노이즈)",
      jitter: "Nano-Jitter (시스템 클록 미세 오차)",
      user: "User Input (사용자 마우스 엔트로피)"
    },
    adTitle: "당신을 위한 최적의 정보",
    adSubtitle: "광고주의 웹사이트에서 더 많은 혜택을 확인해 보세요.",
    adClose: "광고 닫기",
    adSkip: "초 후 건너뛰기",
    adViewMore: "자세히 보기",
    infoSection: {
      mathTitle: "로또 확률의 수학적 이해",
      mathDesc: "대한민국 로또 6/45의 당첨 확률은 수학적으로 1등 기준 1/8,145,060입니다. 이는 45개의 숫자 중 6개를 순서와 상관없이 뽑는 조합의 결과입니다. 매주 수백만 장의 복권이 팔리지만, 각 개별 게임이 당첨될 확률은 독립적이며 항상 동일합니다. 본 앱은 이러한 확률의 영역에서 조금 더 특별한 경험을 제공하기 위해 양자 역학적 현상과 대기 소음 등 자연계의 무작위성을 활용합니다.",
      strategyTitle: "로또 당첨을 위한 통계적 팁",
      strategyDesc: "모든 번호의 출현 확률은 동일하지만, 통계적으로 다음과 같은 패턴이 자주 관찰됩니다. 1) 홀수와 짝수의 비율을 3:3 또는 2:4로 맞추는 것이 유리할 때가 많습니다. 2) 연속된 번호(예: 12, 13)는 한 쌍 정도 포함되는 경우가 흔합니다. 3) 이전 회차 당첨 번호가 1~2개 다시 나오는 '이월 번호' 현상도 주목할 만합니다. 하지만 이 모든 것은 확률일 뿐 절대적인 법칙은 아닙니다.",
      responsibleTitle: "건전한 복권 문화 캠페인",
      responsibleDesc: "복권은 소액으로 즐기는 건전한 레저 활동입니다. 지나친 몰입은 본인과 가족에게 해가 될 수 있습니다. 한 주에 본인이 감당할 수 있는 소액(예: 5,000원~10,000원)으로만 즐기시길 권장합니다. 도박 문제로 어려움을 겪고 계신다면 헬프라인 1336을 통해 전문가의 도움을 받으실 수 있습니다.",
      randomTitle: "진성 난수(True Random)란 무엇인가?",
      randomDesc: "컴퓨터 알고리즘이 생성하는 일반적인 난수는 '의사 난수(Pseudo Random)'라고 불리며, 특정 수식과 시드(Seed) 값에 의해 결정되므로 이론적으로 예측이 가능합니다. 반면, 진성 난수는 물리적 현상의 불확실성을 측정하여 생성됩니다.",
      sources: [
        { name: "Atmospheric (대기 소음)", desc: "지구 대기에서 발생하는 전자기적 소음을 캡처하여 생성." },
        { name: "Quantum (양자)", desc: "아원자 입자의 불확정적 거동을 기반으로 생성하여 물리적으로 완벽한 무작위성 제공." },
        { name: "Thermal Noise (열 잡음)", desc: "전자 기기 내부에서 발생하는 열 역학적 미세 진동을 활용." },
        { name: "Hardware Jitter", desc: "CPU의 처리 시간 미세 오차(나노초 단위)를 추출." }
      ]
    },
    footer: {
      rights: "© 2026 True Random Lotto Generator. All rights reserved.",
      warning: "본 사이트는 물리적 무작위성을 활용하지만, 당첨을 보장하지 않습니다. 과도한 복권 구매는 도박입니다.",
      privacy: "개인정보 처리방침",
      terms: "이용약관",
      contact: "문의: superhky@hotmail.com"
    },
    privacyPolicy: {
        title: "개인정보 처리방침",
        content: "1. 수집하는 개인정보 항목: 본 서비스는 이름, 전화번호 등 일체의 개인정보를 수집하지 않습니다.\n2. 개인정보 수집 목적: 수집하는 정보가 없으므로 목적 또한 없습니다.\n3. 쿠키의 사용: 본 사이트는 구글 애드센스 등 제3자 광고 서비스를 이용하며, 이를 위해 쿠키가 사용될 수 있습니다. 사용자는 브라우저 설정에서 이를 거부할 수 있습니다.\n4. 제3자 제공: 어떠한 개인정보도 제3자에게 제공하지 않습니다."
    },
    termsOfService: {
        title: "서비스 이용약관",
        content: "제1조 (목적)\n본 약관은 True Random Lotto(이하 '서비스')가 제공하는 모든 서비스의 이용 조건 및 절차를 규정합니다.\n\n제2조 (서비스의 내용)\n본 서비스는 물리적 현상을 이용한 난수 생성 결과를 제공하며, 이는 단순 참고용입니다.\n\n제3조 (책임의 한계)\n본 서비스는 생성된 번호의 당첨 여부에 대해 어떠한 법적 책임도 지지 않습니다. 모든 복권 구매의 책임은 사용자 본인에게 있습니다.\n\n제4조 (광고 노출)\n본 서비스는 무료 제공을 위해 구글 애드센스 광고를 게재할 수 있습니다.\n\n제5조 (준거법)\n본 약관은 대한민국 법령을 따릅니다."
    }
  },
  en: {
    siteTitle: "True Random Lotto Generator | Predictable Luck",
    heroBadge: "True Random Based Lotto Generator",
    heroTitle: "True Random Lotto",
    heroSubtitle1: "Using true random numbers extracted from 5 different physical sources,",
    heroSubtitle2: "we generate unpredictable lucky combinations.",
    generateBtn: "Generate Numbers",
    generating: "Generating...",
    emptyPrompt: "Click the button to generate numbers from 5 physical sources.",
    sourceLabels: {
      atmospheric: "Random.org (Atmospheric Noise)",
      quantum: "ANU QRNG (Quantum Indeterminacy)",
      thermal: "CSPRNG (Thermal/Hardware Noise)",
      jitter: "Nano-Jitter (System Clock Jitter)",
      user: "User Input (Mouse Entropy)"
    },
    adTitle: "Optimized Information for You",
    adSubtitle: "Check out more benefits on the advertiser's website.",
    adClose: "Close Ad",
    adSkip: "Skip in ",
    adViewMore: "View More",
    infoSection: {
      mathTitle: "Mathematical Understanding of Lotto Odds",
      mathDesc: "The mathematical probability of winning the 6/45 lottery is 1 in 8,145,060. This is the result of 45C6, a combination of picking 6 numbers out of 45 regardless of order. While millions of tickets are sold weekly, the probability for each individual game is independent and always the same.",
      strategyTitle: "Statistical Tips for Lotto",
      strategyDesc: "While every number has an equal chance, common patterns include: 1) A balance of odd and even numbers (3:3 or 2:4). 2) Including at least one pair of consecutive numbers. 3) Checking 'carry-over' numbers from the previous draw. Remember, these are just statistics, not guarantees.",
      responsibleTitle: "Responsible Gaming Campaign",
      responsibleDesc: "Lottery is a form of leisure. Excessive obsession can be harmful. We recommend playing with a small amount you can afford. If you struggle with gambling issues, seek professional help via helpline 1336.",
      randomTitle: "What is True Random?",
      randomDesc: "Typical random numbers generated by computer algorithms are called 'Pseudo-Random', which are determined by specific formulas and seed values and are theoretically predictable. In contrast, True Random is generated by measuring the uncertainty of physical phenomena.",
      sources: [
        { name: "Atmospheric Noise", desc: "Generated by capturing electromagnetic noise in Earth's atmosphere." },
        { name: "Quantum", desc: "Provides physically perfect randomness based on the indeterminate behavior of subatomic particles." },
        { name: "Thermal Noise", desc: "Utilizes thermodynamic micro-vibrations occurring inside electronic devices." },
        { name: "Hardware Jitter", desc: "Extracts micro-errors in CPU processing time (nanoseconds)." }
      ]
    },
    footer: {
      rights: "© 2026 True Random Lotto Generator. All rights reserved.",
      warning: "This site uses physical randomness but does not guarantee winning. Play responsibly.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact: superhky@hotmail.com"
    },
    privacyPolicy: {
        title: "Privacy Policy",
        content: "1. Data Collection: We do not collect any personal information like names or emails.\n2. Cookies: This site uses Google AdSense and third-party cookies for ad optimization. You can opt-out in settings.\n3. Third-party: No data is shared with third parties."
    },
    termsOfService: {
        title: "Terms of Service",
        content: "Article 1 (Purpose)\nThese terms govern the use of the True Random Lotto service.\n\nArticle 2 (Content)\nThis service provides random numbers based on physical phenomena for reference only.\n\nArticle 3 (Limitation of Liability)\nWe are not responsible for any lottery outcomes or losses. Responsibility lies with the user.\n\nArticle 4 (Ads)\nWe may display Google AdSense ads to provide the service for free."
    }
  }
};
