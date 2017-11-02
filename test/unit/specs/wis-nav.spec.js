import { createTest, destroyVM } from '../util';
import WisNav from 'packages/wis-nav';

describe('WisNav', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(WisNav, true);
    expect(vm.$el).to.exist;
  });
});

