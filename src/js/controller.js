import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';




const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

   recipeView.renderSpinner();
    // 1. Loading recipe
    await model.loadRecipe(id);

    //2. Rendering recipe

    recipeView.render(model.state.recipe);

   
  } catch (err) {
    
    recipeView.renderError();
  }
};

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
}

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