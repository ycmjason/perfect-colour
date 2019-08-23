export const RequiredProp = <T>(type: String | Boolean | Number | Object | typeof Array, opts: any = {}): T => {
  return { ...opts, type, required: true } as any;
};
