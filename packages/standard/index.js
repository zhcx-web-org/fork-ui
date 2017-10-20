import Standard from './src/main';

/* istanbul ignore next */
Standard.install = function(Vue) {
  Vue.component(Standard.name, Standard);
};

export default Standard;
