const assert = require('assert');
const { expect } = require('chai');

const app = require('../../src/app');

const Console = console;

describe('\'symptom\' service', () => {
  it('registered the service', () => {
    const service = app.service('symptom');

    assert.ok(service, 'Registered the service');
  });

  it('computes BMI', async () => {
    Console.info('happy?');
    const service = app.service('symptom');
    const height =  75,
      weight = 200;

    const log = await service.create({
      weight, height
    });

    const expectedBMI = Math.floor(( weight / ( height * height ) ) * 703) ;

    const actualLog = await service.get(log._id);
    const actualBMI = actualLog.bmi;

    expect(actualBMI).to.equal(expectedBMI);
  });
});
