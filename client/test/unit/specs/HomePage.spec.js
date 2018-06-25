import Vue from 'vue';
import Home from '@/views/Home';
import { expect } from 'chai';

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('h1').textContent)
      .to.equal('Cruddy');
  });
});
