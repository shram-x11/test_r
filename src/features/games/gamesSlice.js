import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

const initialState = {
  list: [],
  status: "idle",
  providers: [],
  reals: [],
  filterProvider: "",
  filterReals: "",
  pageNumber: 1,
  pageSize: 12,
};

const gamesArray = [];

export const getGames = createAsyncThunk("games/getGames", async () => {
  const response = await fetch(
    // "https://demo.softswiss.net/api/games/allowed_desktop"
    "/games.json"
  );
  const data = await response.json();
  const formatedData = formatData(data);
  const providers = [...new Set(formatedData.map((item) => item.provider))];
  const reals = new Set();
  formatedData.map((item) => {
    Object.keys(item.real).map((real) => {
      reals.add(real);
    });
  });
  const items = {
    list: formatedData,
    providers,
    reals: Array.from(reals),
  };
  return items;
});

const formatData = (data) => {
  Object.keys(data).map((game) => {
    let array = data[game];
    array.key = game;
    gamesArray.push(array);
  });
  gamesArray.sort(function (a, b) {
    if (a.collections.popularity < b.collections.popularity) return -1;
    if (a.collections.popularity > b.collections.popularity) return 1;
    return 0;
  });
  return gamesArray;
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setFilterProvider: (state, action) => {
      state.filterProvider = action.payload;
      state.pageNumber = 1;
    },
    setFilterReals: (state, action) => {
      state.filterReals = action.payload;
      state.pageNumber = 1;
    },
    incrementPage: (state) => {
      state.pageNumber += 1;
    },
  },
  extraReducers: {
    [getGames.fulfilled]: (state, action) => {
      state.status = "ready";
      state.list = action.payload.list;
      state.providers = action.payload.providers;
      state.reals = action.payload.reals;
    },
  },
});

export const { setFilterProvider, setFilterReals, incrementPage } =
  gamesSlice.actions;

export const selectGames = (state) =>
  state.games.list
    .filter((game) =>
      state.games.filterProvider != ""
        ? game.provider === state.games.filterProvider
        : game
    )
    .filter((game) =>
      state.games.filterReals != ""
        ? Object.keys(game.real).includes(state.games.filterReals)
        : game
    )
    .slice(
      // (state.games.pageNumber - 1) * state.games.pageSize,
      0,
      state.games.pageNumber * state.games.pageSize
    );
export const selectProviders = (state) => state.games.providers;
export const selectReals = (state) => state.games.reals;
// export const selectGame = (id, id2) => (state) => {
//   return state.games.list.filter((game) => game.key === `${id}/${id2}`);
// };

export const selectGame = (state, id, id2) => {
  return state.games.list.filter((game) => game.key === `${id}/${id2}`);
};

export default gamesSlice.reducer;
