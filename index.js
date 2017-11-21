export default async function* aiMerge(data) {
  for (const item of data) {
    yield item;
  }
}
