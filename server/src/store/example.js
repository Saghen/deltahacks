import { Store } from 'lacer'

const ExampleStore = new Store({
  foo: 'bar',
})

ExampleStore.set((state) => (state.foo = 'yo'))
