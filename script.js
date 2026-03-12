const countriesDiv = document.getElementById("countries");
const bucketDiv = document.getElementById("bucket");
const search = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const clearBtn = document.getElementById("clear-btn");

let countriesList = [];

// Fetch Countries
fetch("https://restcountries.com/v3.1/all?fields=name,flags")
    .then(response => response.json())
    .then(data => {
        countriesList = data;
        showCountries(countriesList);
    })
    .catch(error => console.error("Something went wrong: ", error));

// Show Countries
function showCountries(list) {
    countriesDiv.innerHTML = '';
    list.forEach(c => {
        const div = document.createElement('div');
        div.className = 'country';
        div.innerHTML = `
        <div>
          <img src="${c.flags.png}" alt="${c.name.common} flag">
          <strong>${c.name.common}</strong>
        </div>
        <button>Add</button>
      `;
        div.querySelector('button').onclick = () => addToBucket(c);
        countriesDiv.appendChild(div);
    });
}

// Add to bucket 
function addToBucket(country) {
    if (document.getElementById("b-" + country.name.common)) return;
    const div = document.createElement("div");
    div.className = "bucket-item";
    div.id = "b-" + country.name.common;
    div.innerHTML = `<span>${country.name.common}</span> <button>Remove</button>`;
    div.querySelector("button").onclick = () => div.remove();
    bucketDiv.appendChild(div);
}

//Search button click
searchBtn.onclick = () => {
    const query = search.value.toLowerCase();
    showCountries(countriesList.filter(c => c.name.common.toLowerCase().includes(query)));
};

//Clear bucket list
clearBtn.onclick = () => bucketDiv.innerHTML = "";