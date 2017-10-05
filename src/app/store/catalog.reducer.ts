export function CatalogReducer(state: any = null, action: any ): any {
  switch (action.type) {
    case 'GET_CATALOG':
      return state;
    case 'LOAD_CATALOG':
      return Object.assign( {}, state,  action.payload );
    default: {
      return state;
    }
  }
}
