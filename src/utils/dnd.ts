export const reorder = <S extends any[]>(source: S, sIndex: number, dIndex: number) => {
  const result = Array.from(source);
  const [item] = result.splice(sIndex, 1);
  result.splice(dIndex, 0, item);
  return result;
}
export const move = <S extends any[]>(source: S, destination: S, sIndex: number, dIndex: number) => {
  const sResult = Array.from(source);
  const dResult = Array.from(destination);
  const [item] = sResult.splice(sIndex, 1);
  dResult.splice(dIndex, 0, item);
  return [sResult, dResult];
}
