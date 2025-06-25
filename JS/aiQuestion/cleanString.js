
export function backtickRemove(problemJsonString){
  // "```" 백틱 3개 제거하는 과정
  if (problemJsonString.startsWith('```')) {
    console.log('마크다운 형식 감지! JSON 추출을 시작합니다.');
    // 첫 번째 '{' 와 마지막 '}' 사이의 문자열만 잘라냅니다.
    const startIndex = problemJsonString.indexOf('{');
    const endIndex = problemJsonString.lastIndexOf('}');
    problemJsonString = problemJsonString.substring(startIndex, endIndex + 1);
  }
  return problemJsonString;
}