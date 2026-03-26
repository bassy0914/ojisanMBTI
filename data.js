// === QUESTION DATA: 3 questions per spectrum ===
export const spectrums = [
  {
    id: 'EI',
    labels: ['E', 'I'],
    fullLabels: ['Extraversion', 'Introversion'],
    questions: [
      {
        text: '社交的なイベントの後…',
        a: 'エネルギーが湧いてくる',
        b: '一人で静かに過ごしたくなる',
      },
      {
        text: 'グループの中では…',
        a: '話す側になることが多い',
        b: '聞く側になることが多い',
      },
      {
        text: '新しい環境に入ると…',
        a: 'すぐに人に話しかける',
        b: 'まず周りを観察する',
      },
    ],
  },
  {
    id: 'SN',
    labels: ['S', 'N'],
    fullLabels: ['Sensing', 'Intuition'],
    questions: [
      {
        text: '何かを学ぶとき…',
        a: '具体的・実践的な例を重視する',
        b: '未来の可能性や抽象的な概念を重視する',
      },
      {
        text: '問題を解くとき…',
        a: '過去の経験やデータに頼る',
        b: '直感やひらめきに頼る',
      },
      {
        text: '説明を受けるとき好むのは…',
        a: 'ステップバイステップの詳細',
        b: '全体像とビジョン',
      },
    ],
  },
  {
    id: 'TF',
    labels: ['T', 'F'],
    fullLabels: ['Thinking', 'Feeling'],
    questions: [
      {
        text: '友人が悩んでいるとき…',
        a: '論理的な解決策を提案する',
        b: '共感して気持ちに寄り添う',
      },
      {
        text: '重要な決断をするとき…',
        a: '客観的な事実と論理を優先する',
        b: '人への影響や価値観を優先する',
      },
      {
        text: '議論の中で大切なのは…',
        a: '正しい結論に到達すること',
        b: '全員が納得できること',
      },
    ],
  },
  {
    id: 'JP',
    labels: ['J', 'P'],
    fullLabels: ['Judging', 'Perceiving'],
    questions: [
      {
        text: '週末の過ごし方は…',
        a: 'だいたいの予定を立てておく',
        b: 'その場のノリで決める',
      },
      {
        text: '仕事のスタイルは…',
        a: '計画通りに進めるのが好き',
        b: '締め切り直前に集中して仕上げる',
      },
      {
        text: '旅行の計画は…',
        a: '事前にしっかり調べて予約する',
        b: '現地で気ままに動く方が楽しい',
      },
    ],
  },
  {
    id: 'AT',
    labels: ['A', 'T'],
    fullLabels: ['Assertive', 'Turbulent'],
    questions: [
      {
        text: 'ミスをした後は…',
        a: 'すぐ切り替えて次に進む',
        b: '深く振り返り、何度も反芻する',
      },
      {
        text: 'プレッシャーの中では…',
        a: '落ち着いて自分を信じられる',
        b: '不安が高まり、より慎重になる',
      },
      {
        text: '他人の評価について…',
        a: 'あまり気にならない',
        b: 'つい気になってしまう',
      },
    ],
  },
  {
    id: 'HL',
    labels: ['H', 'L'],
    fullLabels: ['Harmony', 'Lone Wolf'],
    questions: [
      {
        text: 'プロジェクトの成功とは…',
        a: 'チームの調和と共有された目標の達成',
        b: '個人の専門性とユニークな価値の証明',
      },
      {
        text: '理想の働き方は…',
        a: 'チームで協力しながら進める',
        b: '一人で集中して成果を出す',
      },
      {
        text: '評価されたいのは…',
        a: 'チームへの貢献度',
        b: '個人としてのスキルや実績',
      },
    ],
  },
];

// === 16 MBTI TYPE RESULTS ===
export const typeResults = {
  ISTJ: {
    catchphrase: '信念を守る静かなる番人',
    description: 'ISTJのおじさんは、誠実で責任感が強く、規律を重んじる。黙々と組織を支え、約束は必ず守る。変化よりも安定を好み、長年培った経験と知識でチームの土台を築く。',
    prompt: 'A serious, dependable middle-aged Japanese man in a crisp white shirt and reading glasses, meticulously organizing files in a well-ordered traditional office. Warm wood tones, neat bookshelves, a vintage desk lamp. Symbolizes reliability and duty. Detailed illustration, warm lighting. --ar 16:9 --v 6.0',
  },
  ISFJ: {
    catchphrase: '皆を包む温もりの守護者',
    description: 'ISFJのおじさんは、控えめだが深い思いやりを持つ。周囲の人の小さな変化に気づき、さりげなくサポートする。伝統を大切にし、家族やチームのために献身的に働く。',
    prompt: 'A gentle, warm middle-aged Japanese man in a cozy knit sweater, carefully tending a small garden in the courtyard of a traditional Japanese home. Soft afternoon sunlight, blooming flowers, a cup of tea nearby. Symbolizes nurturing care. Watercolor style, gentle tones. --ar 16:9 --v 6.0',
  },
  INFJ: {
    catchphrase: '理想を紡ぐ孤高の預言者',
    description: 'INFJのおじさんは、深い洞察力と理想主義を持つ。表面上は穏やかだが、内面には強い信念が燃えている。人の心の奥底を見抜き、静かに世界をより良くしようとする。',
    prompt: 'A contemplative middle-aged Japanese man with deep, knowing eyes, sitting in a dimly lit study surrounded by philosophy books and a single candle. Rain patters on the window. An old fountain pen rests on an open journal. Mystical, introspective atmosphere. Oil painting style. --ar 16:9 --v 6.0',
  },
  INTJ: {
    catchphrase: '未来を設計する冷徹なる建築家',
    description: 'INTJのおじさんは、戦略的思考と独立心の塊。常に数手先を読み、非効率を嫌う。少数精鋭を好み、自分のビジョンを実現するために冷静かつ大胆に行動する。',
    prompt: 'A sharp, calculated middle-aged Japanese man with a neatly trimmed beard, in a dark minimalist suit, standing in a futuristic command center looking at transparent holographic schematics. Cold blue lighting, precise geometric patterns. High-tech atmosphere. --ar 16:9 --v 6.0',
  },
  ISTP: {
    catchphrase: '沈黙の中で機械を操る職人',
    description: 'ISTPのおじさんは、寡黙だが手先が器用で実践的。問題が起きたとき、冷静に状況を分析し、最小限の力で最大の効果を出す。自由を愛し、束縛を嫌う。',
    prompt: 'A quiet, focused middle-aged Japanese man in a worn leather apron, working on a vintage motorcycle in a cluttered but organized garage. Oil-stained hands, tools hanging on pegboard walls. Golden hour light through dusty windows. Realistic, cinematic style. --ar 16:9 --v 6.0',
  },
  ISFP: {
    catchphrase: '風に吹かれる自由な芸術家',
    description: 'ISFPのおじさんは、穏やかで感受性豊か。言葉より行動で愛情を表現する。美しいものに惹かれ、自分のペースで人生を楽しむ。争いを避け、調和を大切にする。',
    prompt: 'A serene middle-aged Japanese man in a paint-stained linen shirt, painting a landscape en plein air on a hilltop overlooking the sea. A gentle breeze, scattered wildflowers, an easel and palette. Impressionist style, soft pastel colors, peaceful atmosphere. --ar 16:9 --v 6.0',
  },
  INFP: {
    catchphrase: '内なる世界の繊細な仲介者',
    description: 'INFPのおじさんは、理想主義者で深い感情の持ち主。外見は穏やかだが、内面には豊かな想像の世界が広がる。人の痛みに敏感で、自分の価値観に忠実に生きる。',
    prompt: 'A thoughtful, weary-eyed middle-aged Japanese man with tousled graying hair, sitting by a quiet lake at dawn, holding a small journal. Dressed in a faded cardigan. Surreal, whimsical atmosphere with dreamlike reflections on the water. Soft, ethereal lighting. --ar 16:9 --v 6.0',
  },
  INTP: {
    catchphrase: '終わりなき思考の迷宮を歩む論理学者',
    description: 'INTPのおじさんは、知的好奇心の権化。常に「なぜ？」を問い続け、理論と可能性の世界に没頭する。社交は苦手だが、専門分野では驚くほど饒舌になる。',
    prompt: 'A disheveled, intellectual middle-aged Japanese man with round glasses, surrounded by whiteboards covered in complex equations and diagrams in a chaotic university office. Stacks of books everywhere, cold coffee on the desk. Warm but cluttered atmosphere. Academic, realistic style. --ar 16:9 --v 6.0',
  },
  ESTP: {
    catchphrase: '今この瞬間を生きるアクション起業家',
    description: 'ESTPのおじさんは、行動力とカリスマの持ち主。リスクを恐れず、目の前のチャンスを即座に掴む。退屈が大敵で、常に刺激と挑戦を求める。交渉術にも長ける。',
    prompt: 'A charismatic, energetic middle-aged Japanese man in a sharp casual jacket, confidently negotiating at a bustling street market in Asia. Dynamic pose, vibrant market colors, street food stalls in background. High energy, cinematic action style. --ar 16:9 --v 6.0',
  },
  ESFP: {
    catchphrase: '人生を祝うエンターテイナー',
    description: 'ESFPのおじさんは、場を明るくする天性のムードメーカー。今この瞬間を全力で楽しみ、周囲の人にも笑顔を届ける。直感的に人の気持ちを察し、楽しい空間を作る。',
    prompt: 'A jovial, animated middle-aged Japanese man in a colorful Hawaiian shirt, playing guitar at a lively izakaya surrounded by laughing friends. Warm lantern lighting, beer and yakitori on the table. Festive, joyful atmosphere. Vibrant illustration style. --ar 16:9 --v 6.0',
  },
  ENFP: {
    catchphrase: '可能性に恋する情熱の広報運動家',
    description: 'ENFPのおじさんは、好奇心と情熱に溢れる。新しいアイデアに次々と飛びつき、人々を巻き込む力がある。型にはまらず、自由な発想で世界に彩りを添える。',
    prompt: 'A charismatic, smiling middle-aged Japanese man with colorful accessories and a creative hairstyle, standing on a stage during a lively cultural festival, gesturing passionately to an engaged crowd. Vibrant banners, confetti, energetic atmosphere. Pop art style. --ar 16:9 --v 6.0',
  },
  ENTP: {
    catchphrase: '常識を壊す知的トリックスター',
    description: 'ENTPのおじさんは、議論と知的挑戦を愛する。既存のルールに疑問を投げかけ、新しい視点を提示する。ユーモアのセンスに優れ、退屈な会議を一変させる力を持つ。',
    prompt: 'A witty, sharp-eyed middle-aged Japanese man in a turtleneck, leaning against a wall covered with sticky notes and mind maps in a creative startup space. Mischievous smile, holding a marker. Modern, dynamic atmosphere with bold colors. Graphic novel style. --ar 16:9 --v 6.0',
  },
  ESTJ: {
    catchphrase: '組織を動かす鉄壁の指揮官',
    description: 'ESTJのおじさんは、責任感が強く決断力がある。ルールと秩序を重んじ、チームを効率的に導く。伝統を尊重しつつも、成果にこだわる実務家。頼れるリーダーの典型。',
    prompt: 'A commanding, well-built middle-aged Japanese man in a perfectly pressed suit, standing at the head of a boardroom table giving directions. Polished mahogany table, city skyline through floor-to-ceiling windows. Authoritative, corporate atmosphere. Realistic, high-detail style. --ar 16:9 --v 6.0',
  },
  ESFJ: {
    catchphrase: '皆の笑顔を守る太陽のような世話役',
    description: 'ESFJのおじさんは、社交的で思いやり深い。コミュニティの中心にいて、誰もが居心地よく過ごせるよう気を配る。伝統行事や人付き合いを大切にし、調和を保つ。',
    prompt: 'A warm, sociable middle-aged Japanese man in a neat polo shirt, hosting a neighborhood BBQ in a sunny backyard. Handing food to guests with a big smile, children playing nearby. Warm golden light, festive decorations. Wholesome, inviting atmosphere. Illustration style. --ar 16:9 --v 6.0',
  },
  ENFJ: {
    catchphrase: '人の才能を開花させるカリスマ教師',
    description: 'ENFJのおじさんは、天性のリーダーでありメンター。人の可能性を見出し、成長を支援することに喜びを感じる。情熱的なスピーチで人を動かし、チームの士気を高める。',
    prompt: 'A passionate, inspiring middle-aged Japanese man in a smart casual outfit, leading a community workshop with animated gestures. Engaged audience of diverse people. Whiteboard with motivational diagrams. Warm, uplifting atmosphere. Bright, editorial illustration style. --ar 16:9 --v 6.0',
  },
  ENTJ: {
    catchphrase: '帝国を築く大胆不敵な指揮官',
    description: 'ENTJのおじさんは、ビジョンと実行力を兼ね備えた天性の指揮官。大きな目標を設定し、周囲を巻き込んで達成する。効率を極めて追求し、弱さを見せることを嫌う。',
    prompt: 'A powerful, confident middle-aged Japanese man in a tailored dark overcoat, standing atop a skyscraper rooftop overlooking a glittering cityscape at night. Arms crossed, wind in his hair. Dramatic, cinematic lighting with city lights below. Epic, commanding atmosphere. --ar 16:9 --v 6.0',
  },
};
