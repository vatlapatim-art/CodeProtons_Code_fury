export const benchmarkData = {
  nifty50: [
    0, 0.5, -0.3, 1.2, 0.8, -0.5, 1.0, 0.7, -0.2, 1.5,
    0.3, -0.8, 1.1, 0.9, -0.4, 0.6, 1.3, -0.1, 0.8, 1.0,
    -0.5, 0.7, 1.2, -0.3, 0.9, 1.1, -0.2, 0.6, 0.4, 0.8
  ],
  nifty500: [
    0, 0.7, -0.2, 1.5, 1.0, -0.3, 1.2, 0.9, 0.1, 1.8,
    0.5, -0.6, 1.3, 1.1, -0.2, 0.8, 1.5, 0.2, 1.0, 1.2,
    -0.3, 0.9, 1.4, -0.1, 1.1, 1.3, 0.1, 0.7, 0.6, 1.0
  ],
  gold: [
    0, 0.2, 0.5, 0.1, -0.3, 0.8, 0.3, -0.1, 0.6, 0.4,
    -0.2, 0.7, 0.2, -0.4, 0.9, 0.1, -0.3, 0.5, 0.2, 0.6,
    0.3, -0.1, 0.4, 0.7, -0.2, 0.3, 0.5, 0.1, -0.3, 0.4
  ],
}

export function getBenchmarkSeries(name: 'nifty50' | 'nifty500' | 'gold', days: number = 30) {
  const data = benchmarkData[name]
  const cumulative = data.slice(0, days).reduce((acc: number[], val, i) => {
    const prev = i === 0 ? 0 : acc[i - 1]
    acc.push(prev + val)
    return acc
  }, [])
  return cumulative
}