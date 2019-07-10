export const reorder = <T extends any>(source: T[], sIndex: number, dIndex: number) => {
  const result = Array.from(source);
  const [item] = result.splice(sIndex, 1);
  result.splice(dIndex, 0, item);
  return result;
}
export const move = <T extends any>(source: T[], destination: T[], sIndex: number, dIndex: number): [T[], T[]] => {
  const sResult = Array.from(source);
  const dResult = Array.from(destination);
  const [item] = sResult.splice(sIndex, 1);
  dResult.splice(dIndex, 0, item);
  return [sResult, dResult];
}
