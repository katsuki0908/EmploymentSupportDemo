//Date型オブジェクトを年月日に変換
export const formatDate = (dateString:Date): string => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };