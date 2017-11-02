import { createTest, destroyVM } from '../util';
import SelectTree from 'packages/select-tree';

describe('SelectTree', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(SelectTree, true);
    expect(vm.$el).to.exist;
  });
});

