import {
  LOAD_SAN_PHAM,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SAP_XEP_SAN_PHAM,
  UPDATE_BO_LOC,
  LOC_SAN_PHAM,
  XOA_BO_LOC,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_SAN_PHAM) {
    let maxPrice = action.payload.map((p) => p.money);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        money: maxPrice,
      },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SAP_XEP_SAN_PHAM) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => {
        if (a.money < b.money) {
          return -1;
        }
        if (a.money > b.money) {
          return 1;
        }
        return 0;
      });
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.money - a.money);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === UPDATE_BO_LOC) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (action.type === LOC_SAN_PHAM) {
    const { all_products } = state;
    const { text,} = state.filters;

    let tempProducts = [...all_products];
    // filtering
    // text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }


    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === XOA_BO_LOC) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
