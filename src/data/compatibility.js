// Compatibility matrix — key is base 4-letter type
// good: ideal matches, bad: challenging matches
export const compatibility = {
  INTJ: { good: ['ENFP', 'ENTP'], bad: ['ESFJ', 'ISFJ', 'ESFP', 'ISFP'] },
  INTP: { good: ['ENFJ', 'ENTJ'], bad: ['ESFJ', 'ISFJ', 'ESFP', 'ISFP'] },
  ENTJ: { good: ['INFP', 'INTP'], bad: ['ISFJ', 'ESFJ', 'ISFP', 'ESFP'] },
  ENTP: { good: ['INFJ', 'INTJ'], bad: ['ISFJ', 'ESFJ', 'ISFP', 'ESFP'] },
  INFJ: { good: ['ENFP', 'ENTP'], bad: ['ESTP', 'ISTP', 'ESFP', 'ISFP'] },
  INFP: { good: ['ENFJ', 'ENTJ'], bad: ['ESTP', 'ISTP', 'ESFP', 'ISFP'] },
  ENFJ: { good: ['INFP', 'INTP'], bad: ['ISTP', 'ESTP', 'ISFP', 'ESFP'] },
  ENFP: { good: ['INFJ', 'INTJ'], bad: ['ISTP', 'ESTP', 'ISFP', 'ESFP'] },
  ISTJ: { good: ['ESFP', 'ESTP'], bad: ['ENFP', 'ENTP', 'INFJ', 'INFP'] },
  ISFJ: { good: ['ESFP', 'ESTP'], bad: ['ENFP', 'ENTP', 'INFJ', 'INFP'] },
  ESTJ: { good: ['ISFP', 'ISTP'], bad: ['INFP', 'ENFJ', 'INFJ', 'ENFP'] },
  ESFJ: { good: ['ISFP', 'ISTP'], bad: ['INFP', 'ENFJ', 'INFJ', 'ENFP'] },
  ISTP: { good: ['ESFJ', 'ESTJ'], bad: ['ENFJ', 'ENFP', 'INFJ', 'INFP'] },
  ISFP: { good: ['ESFJ', 'ESTJ'], bad: ['ENFJ', 'ENFP', 'INFJ', 'INFP'] },
  ESTP: { good: ['ISFJ', 'ISTJ'], bad: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] },
  ESFP: { good: ['ISFJ', 'ISTJ'], bad: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] },
};

export const getCompatibility = (fullType) => {
  const base = fullType.split('-')[0];
  return compatibility[base] || { good: [], bad: [] };
};
