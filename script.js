let favorite_dishes_name = [];
let favorite_dishes_url = [];
var random_name = '';
var random_url = '';

let search_dishes_name = [];
let search_dishes_url = [];
var search_name = '';
var search_url = '';
var search_bar = document.getElementById('search');
var search_btn = document.getElementById('search_btn');

let close_btn = document.getElementById('btn-close');
let meal_container = document.querySelector('.meal-info-container');

async function getRandomMeal(){
    let randomMealurl = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    let randomMealdata = await randomMealurl.json();
    let meal_name = randomMealdata.meals[0].strMeal;
    random_name = meal_name;
    let meal_photo = randomMealdata.meals[0].strMealThumb;
    random_url = meal_photo;
    if(meal_photo){
        const meal_photo_id = document.getElementById('meal_photo');
        meal_photo_id.src = `${meal_photo}`;
    }
    // let meal_photo = await fetch(`${meal_url}`);
    // console.log(meal_photo);
    const meal_name_id = document.getElementById('name');
    meal_name_id.innerHTML = meal_name;
    const btn = document.querySelector('.meal-body .fav-btn');
    btn.classList.remove('active');
}
getRandomMeal();

setInterval(() => {
    getRandomMeal();
}, 10000);

const btn = document.querySelector('.fav-btn');
btn.addEventListener('click',async ()=>{
    btn.classList.toggle('active');
    favorite_dishes_name.push(random_name);
    favorite_dishes_url.push(random_url);
    const favMeals = document.querySelector('.trending-meals .fav-meals');
    let list_elem = document.createElement('li');
    let img_elem = document.createElement('img');
    img_elem.classList.add("fav_img");
    let span_elem = document.createElement('span');
    span_elem.classList.add('fav_name');
    for(i=0;i<favorite_dishes_name.length;i++){
        img_elem.src = favorite_dishes_url[i];
        span_elem.innerHTML = favorite_dishes_name[i];
        list_elem.appendChild(img_elem);
        list_elem.appendChild(span_elem);
        favMeals.appendChild(list_elem);
    }
});

async function getSearchMeal(search){
    let search_url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    let search_info = await search_url.json();
    return search_info.meals;
}

function addMeal(mealdata){
    const meals_dom = document.querySelector('.meals-container .meals');
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
        <div id="meal-header">
            <h4 class="random">Searched item....</h4>
            <a href="#" class="anchor"><img class="meal_photos" src=${mealdata.strMealThumb} alt="Loading...."></a>
        </div>
        <div class="meal-body">
            <h4 class="name">${mealdata.strMeal}</h4>
            <button class="fav-btns"><i class="far fa-heart"></i></button>     
        </div>
    `; 
    meals_dom.appendChild(meal);
    search_dishes_name.push(mealdata.strMeal);
    search_dishes_url.push(mealdata.strMealThumb);
}

search_btn.addEventListener('click',async ()=>{
    const search_data = search_bar.value;
    const meals_list =  await getSearchMeal(search_data);
    meals_list.forEach((meal)=>{
        addMeal(meal);
    });
    search_bar.value = '';
    const btns = document.querySelectorAll('.fav-btns');
    btns.forEach((item,index)=>{
        item.addEventListener('click',()=>{
            const favMeals = document.querySelector('.trending-meals .fav-meals');
            let list_elem = document.createElement('li');
            let img_elem = document.createElement('img');
            img_elem.classList.add("fav_img");
            let span_elem = document.createElement('span');
            span_elem.classList.add('fav_name');
            img_elem.src = search_dishes_url[index];
            span_elem.innerHTML = search_dishes_name[index];
            list_elem.appendChild(img_elem);
            list_elem.appendChild(span_elem);
            favMeals.appendChild(list_elem);
        });
    });
    const anchors = document.querySelectorAll('.anchor');
    anchors.forEach((item,index)=>{
        item.addEventListener('click',async ()=>{
            const meal = document.getElementById('meal-name');
            const photo = document.getElementById('meal-photo');
            const para = document.getElementById('para');
            const list = document.getElementById('list');
            let data = await getSearchMeal(search_dishes_name[index]);
            console.log(data);
            meal.innerHTML = data[0].strMeal;
            para.innerHTML = data[0].strInstructions;
            photo.src = data[0].strMealThumb;
            meal_container.classList.remove('hidden');
        });
    });
});

close_btn.addEventListener('click',()=>{
    meal_container.classList.add('hidden');
});

async function loadMealData(){
    const meal = document.getElementById('meal-name');
    const photo = document.getElementById('meal-photo');
    const para = document.getElementById('para');
    const list = document.getElementById('list');
    let data = await getSearchMeal(random_name);
    console.log(data);
    meal.innerHTML = data[0].strMeal;
    para.innerHTML = data[0].strInstructions;
    photo.src = data[0].strMealThumb;
    meal_container.classList.remove('hidden');
}
function loadMealDataFromlist(){
    const meal = document.getElementById('meal-name');
    const photo = document.getElementById('meal-photo');
    const para = document.getElementById('para');
    const list = document.getElementById('list');
    
    meal_container.classList.remove('hidden');
}