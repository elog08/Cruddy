import Vue from 'vue';
import HomePage from '@/components/HomePage';
import { expect } from 'chai';

describe('HomePage.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HomePage);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Cruddy');
  });
});
