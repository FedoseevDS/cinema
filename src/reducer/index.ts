type ReducerProp = {
  type: string;
  payload: string;
};

export const initialState = { search: new Set() };

export function reducer(state: any, { type, payload }: ReducerProp) {
  switch (type) {
    case 'search':
      return { ...state, search: payload ? state.search.add(payload) : state.search };
    default:
      throw new Error();
  }
}
