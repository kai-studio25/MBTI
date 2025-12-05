
import { Question, TypeInfo, Dimension } from './types';

// Pool of questions categorized by dimension pair
const POOL_EI: Omit<Question, 'id'>[] = [
  { category: 'EI', text: "주말이 다가왔습니다. 당신의 이상적인 계획은?", options: { A: { text: "친구들과 핫플레이스! 에너지 충전!", type: 'E' }, B: { text: "이불 밖은 위험해. 넷플릭스와 힐링.", type: 'I' } } },
  { category: 'EI', text: "파티나 모임에서 당신의 포지션은?", options: { A: { text: "분위기 메이커! 마이크는 내 것.", type: 'E' }, B: { text: "구석의 관찰자. 맛있는 거나 먹자.", type: 'I' } } },
  { category: 'EI', text: "오랫동안 연락 없던 친구, 갑자기 생각날 때?", options: { A: { text: "바로 전화! '야 잘 지내냐?'", type: 'E' }, B: { text: "카톡 프로필만 염탐하고 덮는다.", type: 'I' } } },
  { category: 'EI', text: "새로운 모임에 나갔을 때?", options: { A: { text: "옆 사람에게 먼저 말 걸고 인스타 교환.", type: 'E' }, B: { text: "누가 말 걸어줄 때까지 미소만 유지.", type: 'I' } } },
  { category: 'EI', text: "일을 할 때 선호하는 환경은?", options: { A: { text: "사람들과 북적북적, 아이디어 핑퐁!", type: 'E' }, B: { text: "이어폰 꽂고 나만의 세상에서 집중.", type: 'I' } } },
  { category: 'EI', text: "스트레스를 푸는 방법?", options: { A: { text: "친구들 불러서 맛있는 거 먹고 수다.", type: 'E' }, B: { text: "혼자만의 공간에서 취미 생활.", type: 'I' } } },
  { category: 'EI', text: "엘리베이터에 낯선 사람과 단둘이?", options: { A: { text: "어색함을 못 참아 날씨 얘기라도 한다.", type: 'E' }, B: { text: "층수만 쳐다보며 제발 빨리 도착하길.", type: 'I' } } },
  { category: 'EI', text: "친구가 갑자기 '지금 나와!' 한다면?", options: { A: { text: "콜! 어디로 갈까?", type: 'E' }, B: { text: "아... 나 씻었는데... (거절할 핑계 찾음)", type: 'I' } } },
  { category: 'EI', text: "침묵이 흐르는 순간?", options: { A: { text: "무슨 말이든 해서 채워야 한다.", type: 'E' }, B: { text: "그냥 조용한 것도 나쁘지 않다.", type: 'I' } } },
  { category: 'EI', text: "버스에서 아는 사람을 봤을 때?", options: { A: { text: "큰 소리로 인사하며 옆자리에 앉는다.", type: 'E' }, B: { text: "못 본 척 휴대폰만 본다.", type: 'I' } } },
  { category: 'EI', text: "기분이 우울할 때?", options: { A: { text: "친구 만나서 하소연하며 푼다.", type: 'E' }, B: { text: "혼자 생각할 시간을 갖는다.", type: 'I' } } },
  { category: 'EI', text: "팀 프로젝트 조장은?", options: { A: { text: "내가 할게! (자신감)", type: 'E' }, B: { text: "제발 나만 아니길...", type: 'I' } } }
];

const POOL_SN: Omit<Question, 'id'>[] = [
  { category: 'SN', text: "새로운 프로젝트를 시작할 때?", options: { A: { text: "이전 자료와 확실한 데이터부터 분석.", type: 'S' }, B: { text: "대박 날 것 같은 기발한 아이디어부터 제시.", type: 'N' } } },
  { category: 'SN', text: "설명서를 읽을 때?", options: { A: { text: "1번부터 차근차근 따라한다.", type: 'S' }, B: { text: "대충 그림만 보고 감으로 조립한다.", type: 'N' } } },
  { category: 'SN', text: "10년 뒤 내 모습을 상상한다면?", options: { A: { text: "어느 동네 아파트, 통장 잔고...", type: 'S' }, B: { text: "화성 갈끄니까? 우주 정복?", type: 'N' } } },
  { category: 'SN', text: "길을 찾을 때?", options: { A: { text: "올리브영 끼고 우회전해서 100m.", type: 'S' }, B: { text: "저쪽 느낌인데? 왠지 이 길 같아.", type: 'N' } } },
  { category: 'SN', text: "요리를 할 때?", options: { A: { text: "계량스푼으로 정확하게.", type: 'S' }, B: { text: "며느리도 모르는 손맛 투하.", type: 'N' } } },
  { category: 'SN', text: "영화를 보고 나서?", options: { A: { text: "그 배우 연기 잘하더라. CG가 리얼했어.", type: 'S' }, B: { text: "결말의 의미가 뭘까? 감독의 의도는?", type: 'N' } } },
  { category: 'SN', text: "'사과' 하면 떠오르는 것?", options: { A: { text: "빨갛다, 맛있다, 비싸다.", type: 'S' }, B: { text: "백설공주? 뉴턴? 아이폰?", type: 'N' } } },
  { category: 'SN', text: "멍 때릴 때 하는 생각?", options: { A: { text: "오늘 점심 뭐 먹지?", type: 'S' }, B: { text: "좀비가 나타나면 어디로 도망가지?", type: 'N' } } },
  { category: 'SN', text: "노래를 들을 때?", options: { A: { text: "멜로디랑 비트가 좋아.", type: 'S' }, B: { text: "가사가 내 얘기 같아... (감성 폭발)", type: 'N' } } },
  { category: 'SN', text: "친구가 꿈 이야기를 할 때?", options: { A: { text: "그래서 결말이 뭔데? (현실적)", type: 'S' }, B: { text: "와 대박! 그게 무슨 의미일까? (해석)", type: 'N' } } },
  { category: 'SN', text: "여행지 사진을 찍을 때?", options: { A: { text: "랜드마크 앞에서 인증샷.", type: 'S' }, B: { text: "느낌 있는 골목길 감성샷.", type: 'N' } } },
  { category: 'SN', text: "새로운 기계를 샀을 때?", options: { A: { text: "스펙과 기능을 꼼꼼히 확인.", type: 'S' }, B: { text: "일단 디자인이 예뻐야 함.", type: 'N' } } }
];

const POOL_TF: Omit<Question, 'id'>[] = [
  { category: 'TF', text: "친구가 '나 우울해서 빵 샀어'라고 하면?", options: { A: { text: "무슨 빵 샀어? 얼마야?", type: 'T' }, B: { text: "무슨 일 있어? ㅠㅠ 왜 우울해...", type: 'F' } } },
  { category: 'TF', text: "결정을 내려야 할 때?", options: { A: { text: "이게 가장 효율적이고 합리적이야.", type: 'T' }, B: { text: "이게 다같이 행복해지는 길이야.", type: 'F' } } },
  { category: 'TF', text: "논쟁이 붙었을 때?", options: { A: { text: "팩트와 논리로 승부한다.", type: 'T' }, B: { text: "상대방 기분 나쁘지 않게 돌려 말한다.", type: 'F' } } },
  { category: 'TF', text: "누군가 실수를 했을 때?", options: { A: { text: "잘못된 점을 정확히 짚어준다.", type: 'T' }, B: { text: "괜찮다고 위로해주고 나중에 말한다.", type: 'F' } } },
  { category: 'TF', text: "나 피곤해서 머리 못 말렸어.", options: { A: { text: "드라이기 고장났어? 감기 걸리겠다.", type: 'T' }, B: { text: "헐 ㅠㅠ 많이 피곤했구나.", type: 'F' } } },
  { category: 'TF', text: "선의의 거짓말은?", options: { A: { text: "그래도 진실이 낫다.", type: 'T' }, B: { text: "필요하다면 해야 한다.", type: 'F' } } },
  { category: 'TF', text: "친구가 차 사고 났대!", options: { A: { text: "보험은? 과실 비율은?", type: 'T' }, B: { text: "헐 몸은 괜찮아??", type: 'F' } } },
  { category: 'TF', text: "좋은 리더란?", options: { A: { text: "일 잘하고 공정한 사람.", type: 'T' }, B: { text: "팀원을 잘 챙기고 따뜻한 사람.", type: 'F' } } },
  { category: 'TF', text: "위로가 필요할 때?", options: { A: { text: "해결책을 줘.", type: 'T' }, B: { text: "내 편을 들어줘.", type: 'F' } } },
  { category: 'TF', text: "친구가 요리를 해줬는데 맛이 없다.", options: { A: { text: "솔직하게 말하고 남긴다.", type: 'T' }, B: { text: "맛있다고 하고 억지로 먹는다.", type: 'F' } } },
  { category: 'TF', text: "시험 망쳤어...", options: { A: { text: "어느 과목? 몇 점인데?", type: 'T' }, B: { text: "헐 어떡해 ㅠㅠ 많이 어려웠어?", type: 'F' } } },
  { category: 'TF', text: "고민 상담을 해줄 때?", options: { A: { text: "분석적으로 접근한다.", type: 'T' }, B: { text: "공감하며 들어준다.", type: 'F' } } }
];

const POOL_JP: Omit<Question, 'id'>[] = [
  { category: 'JP', text: "여행 갈 때 짐 싸기?", options: { A: { text: "체크리스트 만들어서 하나씩.", type: 'J' }, B: { text: "전날 밤에 닥치는 대로 넣는다.", type: 'P' } } },
  { category: 'JP', text: "일주일 스케줄은?", options: { A: { text: "구글 캘린더에 시간 단위로.", type: 'J' }, B: { text: "대충 큼직한 것만 기억한다.", type: 'P' } } },
  { category: 'JP', text: "과제 제출 기한?", options: { A: { text: "미리미리 끝내고 검토까지.", type: 'J' }, B: { text: "제출 1분 전 스릴을 즐긴다.", type: 'P' } } },
  { category: 'JP', text: "약속이 취소되면?", options: { A: { text: "내 계획이... (부들부들)", type: 'J' }, B: { text: "오예! 자유시간 개이득!", type: 'P' } } },
  { category: 'JP', text: "방 청소 스타일?", options: { A: { text: "항상 깨끗하게 유지.", type: 'J' }, B: { text: "발 디딜 틈 없으면 그때 치운다.", type: 'P' } } },
  { category: 'JP', text: "데이트 코스?", options: { A: { text: "맛집 예약, 영화 예매 완료.", type: 'J' }, B: { text: "만나서 땡기는 거 먹자.", type: 'P' } } },
  { category: 'JP', text: "메뉴 고르기?", options: { A: { text: "이미 리뷰 5개 읽고 정하고 왔다.", type: 'J' }, B: { text: "사장님 추천이요!", type: 'P' } } },
  { category: 'JP', text: "쉬는 날?", options: { A: { text: "알차게 보내야 해.", type: 'J' }, B: { text: "침대와 한 몸.", type: 'P' } } },
  { category: 'JP', text: "바탕화면 아이콘?", options: { A: { text: "폴더별로 깔끔 정리.", type: 'J' }, B: { text: "화면을 덮은 아이콘의 물결.", type: 'P' } } },
  { category: 'JP', text: "마트 장보기?", options: { A: { text: "구매 목록 작성해서 필요한 것만.", type: 'J' }, B: { text: "돌아다니다가 맛있어 보이는 거 겟.", type: 'P' } } },
  { category: 'JP', text: "약속 시간?", options: { A: { text: "10분 전에 도착해서 기다림.", type: 'J' }, B: { text: "정시에 도착하거나 살짝 늦음.", type: 'P' } } },
  { category: 'JP', text: "해야 할 일이 많을 때?", options: { A: { text: "우선순위를 정해 순서대로.", type: 'J' }, B: { text: "손에 잡히는 것부터.", type: 'P' } } }
];

export const INITIAL_SCORES = {
  E: 0, I: 0,
  S: 0, N: 0,
  T: 0, F: 0,
  J: 0, P: 0
};

export const getRandomQuestions = (): Question[] => {
  const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);
  
  // Select 6 from each category (Total 24)
  const selectedEI = shuffle([...POOL_EI]).slice(0, 6);
  const selectedSN = shuffle([...POOL_SN]).slice(0, 6);
  const selectedTF = shuffle([...POOL_TF]).slice(0, 6);
  const selectedJP = shuffle([...POOL_JP]).slice(0, 6);

  const allQuestions = shuffle([
    ...selectedEI,
    ...selectedSN,
    ...selectedTF,
    ...selectedJP
  ]);

  return allQuestions.map((q, index) => ({
    ...q,
    id: index + 1
  }));
};

// Fun/Viral Style descriptions
export const ALL_TYPES_INFO: TypeInfo[] = [
  {
    code: "ISTJ",
    title: "걸어다니는 엑셀파일",
    summary: "완벽주의 꼰대? 아니, 그냥 너네가 대충 사는 거야.",
    tags: ["#원칙주의", "#노잼아님", "#츤데레"],
    emoji: "📋",
    color: "#cbd5e1"
  },
  {
    code: "ISFJ",
    title: "눈치 100단 수호천사",
    summary: "착한 아이 콤플렉스... 사실 속으로 욕하고 있음.",
    tags: ["#인내심", "#기억력갑", "#집요정"],
    emoji: "👼",
    color: "#fce7f3"
  },
  {
    code: "INFJ",
    title: "겉바속촉 예언가",
    summary: "너의 영혼을 꿰뚫어 본다. (근데 내 속은 모름)",
    tags: ["#미스터리", "#통찰력", "#도덕책"],
    emoji: "🔮",
    color: "#d8b4fe"
  },
  {
    code: "INTJ",
    title: "차가운 두뇌 풀가동",
    summary: "네 말도 맞지만, 내 말이 더 맞아. 반박 불가.",
    tags: ["#전략가", "#독설가", "#효율광"],
    emoji: "♟️",
    color: "#94a3b8"
  },
  {
    code: "ISTP",
    title: "귀찮은 만능 해결사",
    summary: "왜 굳이? 효율성 제로인 행동은 사절한다.",
    tags: ["#마이웨이", "#기계매니아", "#무표정"],
    emoji: "🔧",
    color: "#fde047"
  },
  {
    code: "ISFP",
    title: "침대 밖은 위험해",
    summary: "착해 보이지만 고집 셈. 건드리면 뭄.",
    tags: ["#집순이", "#예술가", "#소심한관종"],
    emoji: "🎨",
    color: "#fda4af"
  },
  {
    code: "INFP",
    title: "망상 속의 유니콘",
    summary: "유리멘탈 바사삭. 근데 낭만은 포기 못 해.",
    tags: ["#감성부자", "#눈물샘", "#내적관종"],
    emoji: "🦄",
    color: "#f9a8d4"
  },
  {
    code: "INTP",
    title: "천재 아니면 바보",
    summary: "3시간째 위키백과 읽는 중. 현실 감각 제로.",
    tags: ["#아이디어", "#게으른천재", "#팩폭러"],
    emoji: "🧪",
    color: "#c4b5fd"
  },
  {
    code: "ESTP",
    title: "브레이크 고장난 스포츠카",
    summary: "일단 저지르고 수습은 미래의 내가 하겠지.",
    tags: ["#스릴러", "#직진남녀", "#핵인싸"],
    emoji: "🏎️",
    color: "#ef4444"
  },
  {
    code: "ESFP",
    title: "관종끼 다분한 연예인",
    summary: "오늘만 산다! 내일 걱정은 내일 모레!",
    tags: ["#파티피플", "#주목공포증X", "#흥부자"],
    emoji: "🎉",
    color: "#f59e0b"
  },
  {
    code: "ENFP",
    title: "인간 골든 리트리버",
    summary: "세상 모든 게 신기하고 재밌어! (금방 질림)",
    tags: ["#댕댕이", "#변덕왕", "#해피바이러스"],
    emoji: "🐶",
    color: "#fbbf24"
  },
  {
    code: "ENTP",
    title: "논쟁을 즐기는 악마",
    summary: "그거 아닌데? (그냥 시비 걸고 싶어서 함)",
    tags: ["#토론왕", "#장난꾸러기", "#도라아이"],
    emoji: "😈",
    color: "#8b5cf6"
  },
  {
    code: "ESTJ",
    title: "잔소리 폭격기",
    summary: "제대로 안 할 거면 비켜. 내가 한다.",
    tags: ["#젊은꼰대", "#리더십", "#강철멘탈"],
    emoji: "📢",
    color: "#0f172a"
  },
  {
    code: "ESFJ",
    title: "오지랖 넓은 친목대장",
    summary: "밥은 먹었어? 어디 아픈 덴 없고? (엄마 아님)",
    tags: ["#프로챙김러", "#리액션부자", "#인맥왕"],
    emoji: "🍰",
    color: "#22d3ee"
  },
  {
    code: "ENFJ",
    title: "세상을 구하는 잔다르크",
    summary: "우리 모두 함께 성장하자! (교주 아님)",
    tags: ["#열정만수르", "#언변술사", "#평화주의"],
    emoji: "🔥",
    color: "#10b981"
  },
  {
    code: "ENTJ",
    title: "야망 있는 지배자",
    summary: "내 사전에 불가능은 없다. 무능은 죄다.",
    tags: ["#보스기질", "#워커홀릭", "#성공집착"],
    emoji: "👑",
    color: "#be185d"
  }
];
