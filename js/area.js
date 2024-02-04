let meals = [];

async function getMeals() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let finalRes = await response.json();
  meals = finalRes.meals;
  displayData();
}
getMeals();
function displayData() {
  let meal = ``;
  for (var i = 0; i < meals.length; i++) {
    meal += `<div class="col-md-3 my-2" >
        <div class="text-light text-center p-4 ms-5 img d-flex flex-column" role="button" onclick="getMealsByArea('${meals[i].strArea}')">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h2>${meals[i].strArea}</h2>
        </div>
    </div>`;
  }
  document.getElementById("meals").innerHTML = meal;
}



async function getMealsByArea(area) {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    let finalRes = await response.json();
    meals = finalRes.meals;
    displayDataByArea();
  }
  
  function displayDataByArea() {
    let meal = ``;
    for (var i = 0; i < meals.length; i++) {
      meal += `   <div class="col-md-3 my-2">
      <div class="img" onclick="getMealsById('${meals[i].idMeal}')">
          <img src="${meals[i].strMealThumb}" alt="meal-1" class="w-100">
          <div class="layer d-flex align-items-center">${meals[i].strMeal}</div>
      </div>
  </div>`;
    }
    document.getElementById("meals").innerHTML = meal;
  }



  async function getMealsById(id) {
    let idMeal = id;
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    let finalRes = await response.json();
    meals = finalRes.meals;
    displayDataById();
  }
  
  function displayDataById() {
    let meal = ``;
    for (var i = 0; i < meals.length; i++) {
      meal += `  <div class="col-md-4 my-2">
      <div class="img">
          <img src=${meals[i].strMealThumb} class="w-100 h-75 rounded-3" >
          <h2 class="text-light">${meals[i].strMeal}</h2>
      </div>
  </div>
  <div class="col-md-8 my-2 text-light">
      <div class="info">
          <h2>Instructions
          </h2>
          <p>${meals[i].strInstructions}</p>
          <h3>Area : <span>${meals[i].strArea}</span></h3>
          <h3>Category : <span>${meals[i].strCategory}</span></h3>
          <h3>Recipes :</h3>
          <div class="d-flex flex-wrap">
              <span class="recipes m-2">${meals[i].strMeasure1}${meals[i].strIngredient1}</span>
              <span class="recipes m-2">${meals[i].strMeasure2}${meals[i].strIngredient2}</span>
              <span class="recipes m-2">${meals[i].strMeasure3}${meals[i].strIngredient3}</span>
              <span class="recipes m-2">${meals[i].strMeasure4}${meals[i].strIngredient4}</span>
              <span class="recipes m-2">${meals[i].strMeasure5}${meals[i].strIngredient5}</span>
              <span class="recipes m-2">${meals[i].strMeasure6}${meals[i].strIngredient6}</span>
          </div>
          <h3>Tags :</h3>
          <p class="tags">${meals[i].strTags}</p>
          <div class="d-flex">
              <button class="btn btn-success rounded-3 m-1"><a href="${meals[i].strSource}">Source</a></button>
              <button class="btn btn-danger rounded-3 m-1"><a href="${meals[i].strYoutube}">Youtube</a></button>
          </div>
      </div>
  
  </div>`;
    }
    document.getElementById("meals").innerHTML = meal;
  }
  

/////////////////////////// Events ///////////////////////////////

$(".links").on("click", function (e) {
  let location = e.target.innerHTML.toLowerCase() + ".html";
  window.location = `${location}`;
});

$(".closeIcon").on("click", function () {
  $(".leftSide").animate({ width: "toggle" }, 500);
  $(".leftSide").css("display", "flex");
  $(".close").toggleClass("fa-solid fa-bars fa-2x");
  $(".close").toggleClass("fa-solid open-close-icon fa-2x fa-x");
});

$(function(){
  $(".loader").fadeOut(1500 , function(){
    $(".loading").slideUp(1500 , function(){
      $("body").css('overflow' , 'auto');
      $('.loading').remove()
    })
  })
})