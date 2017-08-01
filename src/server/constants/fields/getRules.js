'use struct';

export default (ruleNames = []) => ruleNames.map(ruleName => ({
  isEmpty: {
    validator: 'isEmpty',
    message: '不能空白'
  }
}[ruleName]))
