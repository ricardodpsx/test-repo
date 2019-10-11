import allValidationRules from './validationRules';

const allRulesWithContext = context =>
  Object.keys(allValidationRules).reduce(
    (mem, ruleKey) => ({
      ...mem,
      [ruleKey]: (...args) => {
        context.push(allValidationRules[ruleKey](...args));
        // eslint-disable-next-line no-use-before-define
        return validation(context);
      }
    }),
    {}
  );

// this complexity is present in order to provide the fluent validation API
// (i.e. fieldValidator = validation().required().dateFormat(); fieldValidator.check(fieldValue);)
// to add/edit/remove validation rules check validationRules.js
function validation(context) {
  const rulesContext = context || [];
  return {
    ...allRulesWithContext(rulesContext),
    check: value => {
      const violatedRule = rulesContext.find(rule => !rule.test(value));
      return violatedRule && violatedRule.error;
    }
  };
}

export default validation;
