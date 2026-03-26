export const BASE_PROMPT =
  'Detailed, expressive illustration of a Japanese middle-aged man (ojisan), realistic but with a touch of stylized character design, cinematic lighting, high quality, 8k. The illustration should be symbolic, capturing the essence of the personality type through his expression, clothing, and profession.';

export const mbtiTypes = {
  INTJ: {
    name: '冷静な戦略家',
    nickname: '孤高の設計者オジサン',
    description:
      '緻密な計画と長期的なビジョンで組織を動かす、孤高のストラテジスト。感情より論理、根回しより実力。「俺の構想は5年先を見ている」が口癖。',
    variantA: '揺るぎない自信で自分の戦略を押し通す鉄壁の論客。',
    variantT: '完璧主義が高じて、深夜まで資料を見直す自己要求型の論客。',
    imagePrompt:
      'A calculated, weary-eyed man with a neatly trimmed graying beard, in a sharp black minimalist suit, analyzing complex schematics on a holographic screen.',
    color: '#6366f1',
    emoji: '🧊',
  },
  INTP: {
    name: '孤独な理論家',
    nickname: '謎めいた研究者オジサン',
    description:
      '複雑な問題をひとりで解体し、独自理論を組み上げる知の求道者。会議では無言でも、退社後の居酒屋で突然熱弁をふるう。「要するにだな…」',
    variantA: 'マイペースに自説を展開し、批判されてもブレない論客。',
    variantT: '自分の理論の穴が気になって夜眠れない完璧主義者。',
    imagePrompt:
      'A brilliant but disheveled professor with messy gray hair, sitting in a chaotic study filled with books, scribbling abstract theories on a whiteboard.',
    color: '#8b5cf6',
    emoji: '🔬',
  },
  ENTJ: {
    name: '剛腕の指揮官',
    nickname: '天下取りの親分オジサン',
    description:
      '目標に向かって組織全体を引っ張る、生粋のリーダー。無駄を嫌い、意思決定が爆速。「グダグダ言うな、やれ！」の一言で会議を終わらせる。',
    variantA: '圧倒的な自信で前に突き進む最強の経営者気質。',
    variantT: '勝ちへの執着が強すぎて、時に己のプレッシャーに押しつぶされる。',
    imagePrompt:
      'A commanding, charismatic man with a confident smirk, in a tailored dark suit, standing on a skyscraper rooftop overlooking a metropolis.',
    color: '#dc2626',
    emoji: '👑',
  },
  ENTP: {
    name: '口達者な討論者',
    nickname: 'アイデア無双の議論王オジサン',
    description:
      '奇想天外なアイデアと弁舌で場を席巻する、永遠の反骨者。反論することが生きがい。会議でちゃぶ台をひっくり返してから「面白いな、これ」と笑う。',
    variantA: '論破することに喜びを感じる無敵の論客。',
    variantT: 'アイデアが多すぎて、どれに集中すべきか迷い続ける。',
    imagePrompt:
      'A witty, eloquent man with a mischievous smile, gesturing passionately with a microphone on a lively TV talk show stage.',
    color: '#f59e0b',
    emoji: '🎙️',
  },
  INFJ: {
    name: '静かな予言者',
    nickname: '人の心を読む哲学者オジサン',
    description:
      '深い洞察と強い信念で社会を変えようとする、静かな革命家。口数は少ないが一言一言が重い。数年後に「あの時の彼の言葉は正しかった」と言われるタイプ。',
    variantA: '自分のビジョンへの確信が強く、孤独をいとわない。',
    variantT: '人の感情に敏感すぎて、疲弊してしまうことがある。',
    imagePrompt:
      'A quiet, mystical man with profound eyes, sitting by a candlelit desk in a cozy room, gazing out a rainy window holding an old journal.',
    color: '#0891b2',
    emoji: '🕯️',
  },
  INFP: {
    name: '夢見る仲介者',
    nickname: '不器用な理想主義者オジサン',
    description:
      '強い価値観と豊かな感受性を持つ、心の中に宇宙を抱えたロマンチスト。外見はむっつりしているが、内面では熱い物語が進行中。懐かしのフォークソングで泣く。',
    variantA: '自分の価値観への確信があり、ブレない芯を持つ。',
    variantT: '理想と現実のギャップに悩み続ける繊細な魂。',
    imagePrompt:
      'A thoughtful, dreamy-eyed man with a gentle smile, sitting alone at dawn on a weathered bench by a misty lake.',
    color: '#10b981',
    emoji: '🌅',
  },
  ENFJ: {
    name: '熱血の主人公',
    nickname: '面倒見すぎの親分オジサン',
    description:
      '人を動かすカリスマと温かさを持つ、生きる人情ドラマの主人公。後輩の相談には深夜でも付き合う。部下の誕生日は全員分覚えている。',
    variantA: '揺るぎない自信で人を引きつけ、常に前向きなムードメーカー。',
    variantT: '他者の期待に応えようとしすぎて、自分を追い詰めることがある。',
    imagePrompt:
      'A charismatic, warm man with a beaming laugh, warmly shaking hands with people at a lively community festival.',
    color: '#f97316',
    emoji: '🤝',
  },
  ENFP: {
    name: '自由な広報屋',
    nickname: 'エネルギー全開の炎上商人オジサン',
    description:
      '情熱と創造性を爆発させながら生きる、永遠の青春組。アイデアが止まらず、会議を脱線させる天才。定年後も「俺にはまだ夢がある」と新事業を構想する。',
    variantA: '根拠なき自信で無謀な挑戦を続けるポジティブモンスター。',
    variantT: '熱しやすく冷めやすく、次の夢を追いかけ続けて落ち着かない。',
    imagePrompt:
      'An energetic man with a colorful scarf and a wide smile, gesturing enthusiastically at a vibrant street art festival.',
    color: '#ec4899',
    emoji: '🎆',
  },
  ISTJ: {
    name: '堅牢な管理者',
    nickname: 'ルール絶対の石頭オジサン',
    description:
      '伝統と規律を重んじ、組織の土台を支える岩盤のような存在。「昔からこうしてきた」が正義。地味だが絶対に仕事をミスしない信頼の大黒柱。',
    variantA: '自分のやり方に絶対の自信を持つ頑固な職人気質。',
    variantT: '完璧主義が過ぎて、手順から少しでもズレると心が乱れる。',
    imagePrompt:
      'A precise, serious man with thin-rimmed glasses, stamping a document with meticulous care at a perfectly organized wooden desk.',
    color: '#64748b',
    emoji: '📋',
  },
  ISFJ: {
    name: '献身の守護者',
    nickname: 'お人好しすぎる縁の下オジサン',
    description:
      '他人のために黙々と働く、縁の下の力持ち。自分のことは後回しにして周りを支える。定年退職の日、大量の花束と涙で見送られるタイプ。',
    variantA: '安定した自己肯定感で、誰からも愛される穏やかな存在。',
    variantT: '人の顔色を読みすぎて、NOと言えずにストレスをためがち。',
    imagePrompt:
      'A gentle, dedicated town doctor, softly smiling in a warm, rustic clinic filled with light and plants.',
    color: '#22c55e',
    emoji: '🌿',
  },
  ESTJ: {
    name: '鉄の幹部',
    nickname: '叩き上げの現場主義オジサン',
    description:
      '秩序と効率を愛する、組織の骨格を作る男。「やると言ったらやる」が信条の有言実行タイプ。会議の進行管理と根回しは天下一品。',
    variantA: '圧倒的な実行力と自信で、組織を力技で回す。',
    variantT: '完璧な計画が崩れると不機嫌になる几帳面な管理者。',
    imagePrompt:
      'A disciplined, authoritative man in a dark work uniform, standing with a clipboard and pointing with authority on an organized construction site.',
    color: '#b45309',
    emoji: '🏗️',
  },
  ESFJ: {
    name: '社交の領事',
    nickname: '気遣いの帝王・宴会部長オジサン',
    description:
      '人間関係の達人。飲み会の幹事は当然、他人の悩みを聞きながら自分も楽しむ宴会部長。「みんなが笑顔なら俺は幸せだ」が本心。',
    variantA: '天性の社交力で、どこへ行っても中心人物になる陽のオジサン。',
    variantT: '周りから嫌われることへの恐怖が、行動の原動力になっている。',
    imagePrompt:
      'A social, popular man with a big smile, wearing an apron, flipping burgers and laughing warmly at a neighborhood BBQ party.',
    color: '#d97706',
    emoji: '🍖',
  },
  ISTP: {
    name: '無口な巨匠',
    nickname: '無骨な職人肌オジサン',
    description:
      'クールな分析眼と器用な手先を持つ、無口な職人。理屈より体験、会議より現場。愛車とバイクの整備が最高の癒し。余計なことは言わないが、いざとなれば誰より頼れる。',
    variantA: '自分のペースを乱されないタフな精神力の持ち主。',
    variantT: '自分のスキルや判断に自信が持てず、一人でひっそり悩む。',
    imagePrompt:
      'A quiet, rugged mechanic covered in grease, working intently on a vintage motorcycle in a cluttered garage.',
    color: '#78716c',
    emoji: '🔧',
  },
  ISFP: {
    name: '自由な冒険者',
    nickname: '感性だけで生きてきたオジサン',
    description:
      '豊かな感性と独自の美意識で生きる、型にはまらない自由人。写真、音楽、旅が友達。肩書きより「今この瞬間を楽しめているか」を大事にする。',
    variantA: '自分の感覚への絶対の自信で、批判をさらりとかわす。',
    variantT: '他者の評価に一喜一憂し、深く傷ついてしまうこともある。',
    imagePrompt:
      'A sensitive, free-spirited man standing on a scenic coastal path at sunset, holding a vintage camera.',
    color: '#14b8a6',
    emoji: '📷',
  },
  ESTP: {
    name: '大胆な起業家',
    nickname: 'リスクを楽しむ修羅場経験者オジサン',
    description:
      'ノリと度胸で修羅場を切り抜けてきた、行動の人。考えるより先に動き、結果を出す。「細かいことは後でいい、まず動け！」がモットーの逞しいオジサン。',
    variantA: '修羅場を「面白い」と笑えるメンタルの鬼。',
    variantT: 'スリルを求めながらも、結果への不安がチラつく。',
    imagePrompt:
      'A sharp, energetic man with a confident smirk, wearing a flashy suit, holding a cigar at a glitzy casino poker table.',
    color: '#ef4444',
    emoji: '🃏',
  },
  ESFP: {
    name: '舞台の主役',
    nickname: 'ムード全振りのカラオケ王オジサン',
    description:
      '場の空気をパッと明るくする、生きるエンターテイナー。カラオケは十八番を3曲持つプロ。人生を「楽しんだもん勝ち」と本気で思っている。みんなのアイドル。',
    variantA: '常に前向きで、落ち込んでも次の瞬間には復活する不死鳥。',
    variantT: '注目されていない時間が不安で、常に誰かの視線を求めてしまう。',
    imagePrompt:
      'A vibrant man with a dynamic smile and sunglasses, singing passionately into a microphone on a brightly lit karaoke stage.',
    color: '#f43f5e',
    emoji: '🎤',
  },
};
