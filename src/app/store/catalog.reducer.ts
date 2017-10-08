export interface Catalog {
  catalogNodes: any[];
  catalogItems: any[];
}

const DEFAULTS: Catalog = { catalogNodes: [], catalogItems: [] };

export function CatalogReducer(state: Catalog = DEFAULTS, action: any ): any {
  switch (action.type) {
    case 'GET_CATALOG':
      return state;
    case 'LOAD_CATALOG':
      return Object.assign( {}, state, { catalogNodes: action.payload.catalog.catalog, catalogItems: action.payload.catalog.items } );
    default: {
      return state;
    }
  }
}
