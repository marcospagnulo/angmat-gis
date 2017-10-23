export interface Catalog {
  catalogNodes: any[];
  catalogItems: any[];
  selectedNodes: any[];
}

const DEFAULTS: Catalog = {
  catalogNodes: [],
  catalogItems: [],
  selectedNodes: []
};

let catalogNodes, catalogItems, selectedNodes;

export function CatalogReducer(state: Catalog = DEFAULTS, action: any ): any {

  switch (action.type) {

    case 'GET_CATALOG':
      return state;

    case 'LOAD_CATALOG':
      catalogNodes = action.payload.catalog.catalog;
      catalogItems = action.payload.catalog.items;
      return Object.assign( {}, state, { catalogNodes: catalogNodes, catalogItems: catalogItems } );

    case 'ADD_SELECT_NODE':
      selectedNodes = state.selectedNodes.concat(action.payload.node);
      return Object.assign( {}, state, { selectedNodes: selectedNodes } );

    case 'REMOVE_SELECT_NODE':
      selectedNodes = state.selectedNodes.filter(({ id }) => id !== action.payload.node.id);
      return Object.assign( {}, state, { selectedNodes: selectedNodes } );

    case 'REORDER_NODES':
      return Object.assign( {}, state, { selectedNodes: action.payload.nodes } );

    default: {
      return state;
    }
  }
}
