const randomPick = (arr) => {
  const CSum = arr.reduce((sum, { weight }) => {
    sum.push((sum.at(-1) ?? 0) + weight)
    return sum
  }, [])
  const TOTAL = CSum.at(-1)
  const picked = Math.floor(Math.random() * TOTAL) + 1
  const idx = CSum.findIndex((x) => x >= picked)
  return { name: arr[idx].name, probability: (arr[idx].weight / TOTAL * 100).toFixed(2) }
}

export default randomPick
