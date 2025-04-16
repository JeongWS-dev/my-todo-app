// 📁 utils/localeUtils.ts (또는 AddTodoModal 내부에 임시 작성 가능)
export const getCountryCode = (language: string): string => {
  switch (language) {
    case "ko":
      return "KR"; // 대한민국
    case "en":
      return "US"; // 미국
    case "ja":
      return "JP"; // 일본
    case "fr":
      return "FR"; // 프랑스 (확장 가능)
    default:
      return "US"; // 기본값
  }
};
