import { Measure } from '../model/Measure';

export default {
  render(measure: Measure) {
    return {
      name: measure.name,
    };
  },

  renderMany(measure: Measure[]) {
    return measure.map((measure) => this.render(measure));
  },
};
