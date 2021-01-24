import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookMarksView from './views/bookmarksView';


if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // 0. Update results view to mark selected search result
      resultsView.update(model.getSearchResultsPage());
      bookMarksView.update(model.state.bookmarks);
    // 1. Loading recipe
    await model.loadRecipe(id);

    //2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    // Load Search Results
    await model.loadSearchResults(query);

    // Render Results
    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // Render Results
  //resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function(){
  // 1. Add/remove bookmark
  
  if(!model.state.recipe.bookmarked) 
    model.addBookmark(model.state.recipe);
  else 
    model.deleteBookmark(model.state.recipe.id);
  
  // 2. Update recipe view
    recipeView.update(model.state.recipe);
  
  // 3. Render bookmarks
  bookMarksView.render(model.state.bookmarks);
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView._addHandlerClick(controlPagination);
};

init();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// ARCHITECTURE: IMPORTANT FOR THREE REASONS: STRUCTURE, MAINTAINABILITY AND EXPANDABILITY.
// WE CAN CREATE OUR OWN(MAPTY PROJECT) OR USE A WELL ESTABLISHED ONE.
// JS FRAMEWORKS ALREADY COME WITH A ARCHITECTURE.
// COMPONENTS OF ANY ARCHITECTURE: BUSSINESS LOGIC, STATE, HTTP LIBRARY, APPLICATION LOGIC(ROUTER) AND PRESENTATION LOGIC(UI LAYER)
// MODEL(BUSSINESS LOGIC, STATE AND HTTP LIBRARY), CONTROLLER(APPLICATION LOGIC, IT IS THE INTERMEDIARY BETWEEN THE OTHER TWO WHICH KNOW NOTHING ABOUT THEMSELVES, HANDLES UI EVENTS AND DISPATCHES TASKS TO MODEL AND VIEW), VIEW(PRESENTATION LOGIC)

// EVENT HANDLING IN MVC:
//DESIGN PATTERNS: STANDARD SOLUTIONS TO COMMON PROBLEMS. EXAMPLE: PUBLISHER-SUBSCRIBER PATTERN
