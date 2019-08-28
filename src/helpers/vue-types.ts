type PropTypes = String | Boolean | Number | Object | typeof Array;

export const RequiredProp = <T = null, Q extends PropTypes = PropTypes, P extends {} = {}>(
  type: Q,
  opts: P | {} = {},
): (P | {}) & { type: T extends null ? Q : () => T; required: true } => {
  return { ...opts, type: type as any, required: true };
};
