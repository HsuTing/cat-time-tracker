'use struct';

export default (ruleNames = []) => ruleNames.map(ruleName => ({
  isEmpty: {
    validator: 'isEmpty',
    message: 'Can not be empty'
  }
}[ruleName]))
