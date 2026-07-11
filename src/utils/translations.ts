
export type Language = 'ko' | 'en';

export const translations = {
  ko: {
    siteTitle: "행운 번호 로또/연금복권 추출기 | Lucky Numbers Generator",
    heroBadge: "행운 번호 로또 & 연금복권 추출기",
    heroTitle: "Lucky Numbers Generator",
    heroSubtitle1: "5가지 서로 다른 특수 소스에서 추출한 진성 난수를 사용하여",
    heroSubtitle2: "예측 불가능한 행운의 번호를 생성합니다.",
    generateBtn: "번호 생성하기",
    generating: "추출 중...",
    generatingNumbers: "번호 생성 중...",
    downloadImage: "결과 저장하고 공유하기",
    downloadImageOnly: "이미지 저장하기",
    shareImageOnly: "공유하기",
    shareText: "나의 로또 번호! 🍀\n\n#로또 #TrueRandom\n",
    emptyPrompt: "버튼을 눌러 5가지 물리적 소스로부터 번호를 생성하세요.",
    wealthLuck: {
      title: "지금 이 순간 당신의 재물운은?",
      level4: "🔥 대박 기운! 지금 당장 번호를 생성하세요!",
      level3: "✨ 흐름이 아주 좋습니다! 행운이 따를지도 모릅니다.",
      level2: "👍 평온한 상태입니다. 직감에 맡겨보세요.",
      level1: "😅 잠시 기운을 모으고 다시 시도해보는 건 어떨까요?",
      refreshBtn: "다시 시도하기",
    },
    sourceLabels: {
      atmospheric: "대기 잡음",
      quantum: "양자 불확정성",
      thermal: "열 잡음",
      jitter: "하드웨어 시계 지터",
      user: "사용자 엔트로피",
      space: "우주 방사선/태양풍",
      financial: "글로벌 금융 지터",
      network: "네트워크 핑 지연",
      kinetic: "키네틱 가속도",
      ambient: "주변 어쿠스틱 노이즈"
    },
    adTitle: "당신을 위한 최적의 정보",
    adSubtitle: "광고주의 웹사이트에서 더 많은 혜택을 확인해 보세요.",
    adClose: "광고 닫기",
    adSkip: "초 후 건너뛰기",
    adViewMore: "자세히 보기",
    lottoInfoSection: {
      mathTitle: "로또 확률의 수학적 이해",
      mathDesc: "대한민국 로또 6/45의 당첨 확률은 수학적으로 1등 기준 1/8,145,060입니다. 이는 45개의 숫자 중 6개를 순서와 상관없이 뽑는 조합의 결과입니다. 매주 수백만 장의 복권이 팔리지만, 각 개별 게임이 당첨될 확률은 독립적이며 항상 동일합니다. 본 앱은 이러한 확률의 영역에서 조금 더 특별한 경험을 제공하기 위해 양자 역학적 현상과 대기 소음 등 자연계의 무작위성을 활용합니다.",
      strategyTitle: "로또 당첨을 위한 통계적 팁",
      strategyDesc: "모든 번호의 출현 확률은 동일하지만, 통계적으로 다음과 같은 패턴이 자주 관찰됩니다. 1) 홀수와 짝수의 비율을 3:3 또는 2:4로 맞추는 것이 유리할 때가 많습니다. 2) 연속된 번호(예: 12, 13)는 한 쌍 정도 포함되는 경우가 흔합니다. 3) 이전 회차 당첨 번호가 1~2개 다시 나오는 '이월 번호' 현상도 주목할 만합니다. 하지만 이 모든 것은 확률일 뿐 절대적인 법칙은 아닙니다.",
      responsibleTitle: "건전한 복권 문화 캠페인",
      responsibleDesc: "복권은 소액으로 즐기는 건전한 레저 활동입니다. 지나친 몰입은 본인과 가족에게 해가 될 수 있습니다. 한 주에 본인이 감당할 수 있는 소액(예: 5,000원~10,000원)으로만 즐기시길 권장합니다. 도박 문제로 어려움을 겪고 계신다면 헬프라인 1336을 통해 전문가의 도움을 받으실 수 있습니다.",
      randomTitle: "진성 난수(True Random)란 무엇인가?",
      randomDesc: "컴퓨터 알고리즘이 생성하는 일반적인 난수는 '의사 난수(Pseudo Random)'라 불리며, 특정 수식과 시드(Seed) 값에 의해 결정됩니다. 반면, 진성 난수는 물리적 현상의 불확실성을 직접 측정해 생성합니다. 예를 들어, 대기 잡음은 지구 대기에서 발생하는 전자기적 잡음(태양 활동, 번개, 인공 위성 신호 등)을 고속 샘플링하여 난수 시드로 변환합니다. 양자 불확정성은 아원자 입자의 불확정적 거동과 얽힘을 측정해 완전한 무작위성을 제공합니다.",
      sources: [
        { name: "대기 잡음", desc: "지구 대기에서 발생하는 전자기적 잡음(태양 활동, 번개, 인공 위성 신호 등)을 마이크나 특수 센서로 고속 샘플링하여 아날로그 신호를 디지털 값으로 변환합니다. 이 디지털 값은 미세한 전압 변화나 신호의 불규칙성을 나타내며, 이를 특정 알고리즘(예: 해싱, 비트 추출)을 통해 로또 번호 범위(1~45)에 맞춰 난수 시드로 가공합니다. 예를 들어, 수집된 여러 비트의 데이터를 일정한 크기로 묶고, 이를 45로 나눈 나머지 값에 1을 더하여 숫자를 생성하는 방식입니다." },
        { name: "양자 불확정성", desc: "양자 역학적 현상(예: 양자 진공 잡음, 광자의 분극 상태)을 측정하여 얻은 원시 비트열을 난수 시드로 사용합니다. 예를 들어, 호주 국립 대학교(ANU)의 QRNG API는 양자 현상에서 생성된 8비트 정수(Uint8) 배열을 제공하며, 앱은 이 값들을 45로 나눈 나머지 값에 1을 더하여 로또 번호로 변환하고 중복을 제거합니다." },
        { name: "열 잡음", desc: "전자 기기 내부의 저항에서 발생하는 무작위적인 전압 변동(열 잡음)을 측정하여 난수 시드를 얻습니다. 이 앱은 브라우저의 암호학적으로 강력한 난수 생성기(CSPRNG)를 활용하여 하드웨어 기반의 열 잡음 원리를 시뮬레이션하며, 생성된 숫자들을 45로 나눈 나머지 값에 1을 더해 로또 번호로 만듭니다." },
        { name: "하드웨어 시계 지터", desc: "컴퓨터 CPU의 내부 시계가 작동하는 미세한 시간 간격의 불규칙한 변동(지터)을 측정하여 엔트로피 풀을 생성합니다. 예를 들어, `performance.now()`와 같은 고정밀 타이머를 반복적으로 측정하여 얻은 미세한 시간차를 수집하고, 이를 가공하여 45 이내의 난수 시드를 추출합니다. 추출된 시드 값들은 45로 나눈 나머지 값에 1을 더하여 로또 번호로 변환하고 중복을 제거합니다." },
        { name: "사용자 엔트로피", desc: "사용자의 마우스 움직임, 키보드 입력 타이밍, 터치 스크린 제스처 등 예측 불가능한 물리적 상호작용에서 발생하는 미세한 시간 및 공간 정보를 수집합니다. 이러한 불규칙한 입력 값들을 조합하여 수학적 알고리즘(예: 암호학적 해시 함수)을 거쳐 통계적으로 편향되지 않은 고품질의 난수 시드를 생성하고, 이를 로또 번호로 변환합니다." }
      ]
    },
    pensionInfoSection: {
      mathTitle: "연금복권 확률의 수학적 이해",
      mathDesc: "대한민국 연금복권 720+의 1등 당첨 확률은 1/5,000,000입니다. 이는 1부터 5까지의 조와 0부터 9까지의 6자리 숫자를 정확하게 맞춰야 하는 확률입니다. 매주 수백만 장의 복권이 팔리지만 각 개별 게임이 당첨될 확률은 독립적입니다. 본 앱은 이러한 확률의 영역에서 특별한 경험을 제공하기 위해 다양한 특수 소스를 결합하여 고유한 난수를 생성합니다.",
      strategyTitle: "연금복권 당첨을 위한 팁",
      strategyDesc: "연금복권은 조와 6자리 숫자를 모두 맞춰야 하기 때문에 숫자 패턴 분석보다는 '연속 번호'나 같은 조의 번호 세트를 여러 장 구매하여 1등과 2등을 동시에 노리는 전략이 흔히 쓰입니다. 그러나 숫자가 뽑히는 과정은 완벽한 무작위이므로 결국 확률의 영역입니다.",
      responsibleTitle: "건전한 복권 문화 캠페인",
      responsibleDesc: "복권은 소액으로 즐기는 건전한 레저 활동입니다. 지나친 몰입은 본인과 가족에게 해가 될 수 있습니다. 한 주에 본인이 감당할 수 있는 소액(예: 5,000원~10,000원)으로만 즐기시길 권장합니다. 도박 문제로 어려움을 겪고 계신다면 헬프라인 1336을 통해 전문가의 도움을 받으실 수 있습니다.",
      randomTitle: "특수 소스란 무엇인가?",
      randomDesc: "기존의 물리적 난수 대신 연금복권만의 특이한 조합을 생성하기 위해 환경, 경제, 네트워크 등 5가지 이색적인 소스에서 추출된 엔트로피를 활용합니다. 이를 통해 단순히 컴퓨터 알고리즘에 의존하는 것을 넘어 보다 창의적이고 예측 불가능한 번호를 추출합니다.",
      sources: [
        { name: "우주 방사선/태양풍 (Space Weather)", desc: "우주 방사선이나 태양풍의 변화를 시뮬레이션하여 얻은 값을 바탕으로 난수 시드를 형성하고, 이를 토대로 무작위 조와 번호를 추출합니다." },
        { name: "글로벌 금융 지터 (Financial Entropy)", desc: "시간과 무작위성을 결합한 금융 시계열의 변동성을 시뮬레이션하여 번호를 생성합니다." },
        { name: "네트워크 핑 지연 (Network Latency)", desc: "실제 외부 서버로 핑(Ping)을 전송하여 발생한 미세한 지연 시간(Latency)을 측정해 시드로 활용합니다." },
        { name: "키네틱 가속도 (Kinetic Acceleration)", desc: "사용자의 마우스 움직임이나 터치 제스처에서 가속도와 운동량(Velocity) 변화를 추적하여 생성합니다." },
        { name: "주변 어쿠스틱 노이즈 (Ambient Acoustic)", desc: "WebCrypto를 활용해 백색 소음 스펙트럼을 모사하여 발생시킨 값으로 난수 시드를 만듭니다." }
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
    siteTitle: "Lucky Numbers Lotto/Pension Generator | Predictable Luck",
    heroBadge: "Lucky Numbers Lotto & Pension Generator",
    heroTitle: "Lucky Numbers Generator",
    heroSubtitle1: "Using true random numbers extracted from 5 different special sources,",
    heroSubtitle2: "we generate unpredictable lucky combinations.",
    generateBtn: "Generate Numbers",
    generating: "Generating...",
    generatingNumbers: "Generating numbers...",
    downloadImage: "Save and Share Result",
    downloadImageOnly: "Save Image",
    shareImageOnly: "Share",
    shareText: "My True Random Lotto Numbers! 🍀\n\n#Lotto #QuantumLotto #TrueRandom\n",
    emptyPrompt: "Click the button to generate numbers from 5 physical sources.",
    wealthLuck: {
      title: "Your Wealth Luck at This Exact Moment",
      level4: "🔥 Huge energy! Generate numbers right now!",
      level3: "✨ Great flow! Luck might be on your side.",
      level2: "👍 Peaceful state. Trust your intuition.",
      level1: "😅 How about gathering energy and trying again in a bit?",
      refreshBtn: "Try Again",
    },
    sourceLabels: {
      atmospheric: "Atmospheric Noise",
      quantum: "Quantum Indeterminacy",
      thermal: "Thermal Noise",
      jitter: "Hardware Clock Jitter",
      user: "User Entropy",
      space: "Cosmic Ray/Space Weather",
      financial: "Global Financial Jitter",
      network: "Network Latency Jitter",
      kinetic: "Kinetic Acceleration",
      ambient: "Ambient Acoustic Noise"
    },
    adTitle: "Optimized Information for You",
    adSubtitle: "Check out more benefits on the advertiser's website.",
    adClose: "Close Ad",
    adSkip: "Skip in ",
    adViewMore: "View More",
    lottoInfoSection: {
      mathTitle: "Mathematical Understanding of Lotto Odds",
      mathDesc: "The mathematical probability of winning the 6/45 lottery is 1 in 8,145,060. This is the result of 45C6, a combination of picking 6 numbers out of 45 regardless of order. While millions of tickets are sold weekly, the probability for each individual game is independent and always the same.",
      strategyTitle: "Statistical Tips for Lotto",
      strategyDesc: "While every number has an equal chance, common patterns include: 1) A balance of odd and even numbers (3:3 or 2:4). 2) Including at least one pair of consecutive numbers. 3) Checking 'carry-over' numbers from the previous draw. Remember, these are just statistics, not guarantees.",
      responsibleTitle: "Responsible Gaming Campaign",
      responsibleDesc: "Lottery is a form of leisure. Excessive obsession can be harmful. We recommend playing with a small amount you can afford. If you struggle with gambling issues, seek professional help via helpline 1336.",
      randomTitle: "What is True Random?",
      randomDesc: "Typical random numbers generated by computer algorithms are called 'Pseudo-Random', which are determined by specific formulas and seed values and are theoretically predictable. In contrast, True Random is generated by measuring the uncertainty of physical phenomena.",
      sources: [
        { name: "Atmospheric Noise", desc: "Generated by capturing electromagnetic noise in Earth's atmosphere (e.g., solar activity, lightning, satellite signals) using microphones or specialized sensors, converting analog signals into digital values. These digital values represent minute voltage changes or signal irregularities, which are then processed through specific algorithms (e.g., hashing, bit extraction) to generate random seeds within the lottery number range (1-45). For instance, collected bits are grouped, and a number is derived by taking the remainder after division by 45 and adding 1." },
        { name: "Quantum", desc: "Utilizes raw bit streams obtained by measuring quantum mechanical phenomena (e.g., quantum vacuum fluctuations, photon polarization states) as random seeds. For instance, the ANU QRNG API provides an array of 8-bit integers (Uint8) derived from quantum events. The app converts these values into lottery numbers by taking the remainder after division by 45 and adding 1, then ensuring uniqueness." },
        { name: "Thermal Noise", desc: "Measures random voltage fluctuations (thermal noise) generated in the resistors within electronic devices to obtain random seeds. This app utilizes the browser's Cryptographically Secure Pseudo-Random Generator (CSPRNG) to simulate the principles of hardware-based thermal noise, converting the generated numbers into lottery numbers by taking the remainder after division by 45 and adding 1." },
        { name: "Hardware Clock Jitter", desc: "Generates an entropy pool by measuring minute, irregular variations (jitter) in the timing intervals of a computer's CPU internal clock. For example, precise timers like `performance.now()` are repeatedly measured to collect subtle time differences. These differences are then processed to extract random seeds within the 1-45 range, converted into lottery numbers by taking the remainder after division by 45 and adding 1, and uniqueness is ensured." },
        { name: "User Entropy", desc: "Collects subtle temporal and spatial information from unpredictable physical interactions, such as user mouse movements, keyboard input timings, or touchscreen gestures. These irregular input values are combined and processed through mathematical algorithms (e.g., cryptographic hash functions) to generate high-quality, statistically unbiased random seeds, which are then converted into lottery numbers." }
      ]
    },
    pensionInfoSection: {
      mathTitle: "Mathematical Understanding of Pension 720+ Odds",
      mathDesc: "The probability of winning 1st prize in the Pension 720+ lottery is 1 in 5,000,000. This requires matching the Group (1-5) and a 6-digit number (0-9) exactly. While millions of tickets are sold, the probability for each individual game is independent. This app utilizes 5 distinct special sources to provide a unique random generation experience.",
      strategyTitle: "Tips for Pension Lottery",
      strategyDesc: "Since you must match both the group and 6-digit number, purchasing consecutive numbers or multiple sets of the same group is a common strategy to aim for 1st and 2nd prizes simultaneously. However, the drawing process is entirely random.",
      responsibleTitle: "Responsible Gaming Campaign",
      responsibleDesc: "Lottery is a form of leisure. Excessive obsession can be harmful. We recommend playing with a small amount you can afford. If you struggle with gambling issues, seek professional help.",
      randomTitle: "What are Special Sources?",
      randomDesc: "Instead of standard physical noise, we use 5 exotic sources (e.g. environment, economy, network) to generate entropy specifically for the Pension Lottery. This provides more creative and unpredictable numbers than standard algorithms.",
      sources: [
        { name: "Space Weather", desc: "Generates a random seed by simulating variations in cosmic rays or solar wind, extracting random groups and numbers." },
        { name: "Financial Entropy", desc: "Simulates the volatility of financial time series combining time and randomness to generate numbers." },
        { name: "Network Latency", desc: "Sends pings to an external server and measures the minute latency differences to use as a seed." },
        { name: "Kinetic Acceleration", desc: "Tracks acceleration and velocity changes from user mouse movements or touch gestures to generate entropy." },
        { name: "Ambient Acoustic", desc: "Utilizes WebCrypto to simulate a white noise spectrum, creating a random seed." }
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
