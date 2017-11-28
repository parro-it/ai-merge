import AsyncIterable from "asynciterable";

const iterateTo = write => async iterable => {
  const generator = iterable[Symbol.asyncIterator] || iterable[Symbol.iterator];
  const iterator = generator.call(iterable);
  let item = await iterator.next();
  while (!item.done) {
    write(await item.value);
    item = await iterator.next();
  }
};

export default function aiMerge(...sources) {
  return new AsyncIterable(async (write, end) => {
    const allSourcesDone = [...sources].map(iterateTo(write));
    await Promise.all(allSourcesDone);
    end();
  });
}
