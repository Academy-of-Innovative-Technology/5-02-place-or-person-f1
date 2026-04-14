let data = {};

async function loadData() {
    try {
        const response = await fetch("src/api/data.json");
        data = await response.json();
        console.log("Data loaded:", data);
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function searchData(query) {
    query = query.toLowerCase();

    const countryResults = data.countries.filter(item =>
        item.name.toLowerCase().includes(query)
    );

    const peopleResults = data.people.filter(person =>
        person.name.toLowerCase().includes(query)
    );

    return [...countryResults, ...peopleResults];
}

function displayResults(results) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (results.length === 0) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
        return;
    }

    results.forEach(item => {
        const card = document.createElement("div");
        card.className = "card mb-3 p-3";

        if (item.type === "location") {
            card.innerHTML = `
                <h3>${item.name} (Country)</h3>
                <p><strong>Capital:</strong> ${item.capital}</p>
                <p><strong>Population:</strong> ${item.population}</p>
                <p><strong>National Animal:</strong> ${item.national_animal}</p>
                <p><strong>Languages:</strong> ${item.languages.join(", ")}</p>
                <p><strong>Leader:</strong> ${item.leader}</p>
                <img src="${item.images.flag}" alt="flag" width="100">
                <div>
                    ${item.images.city.map(img => `<img src="${img}" width="100">`).join("")}
                </div>
                <a href="${item.national_anthem}" target="_blank">Listen to Anthem</a>
            `;
        } 
        else {
            card.innerHTML = `
                <h3>${item.name} (Person)</h3>
                <p><strong>Birth Date:</strong> ${item.birth_date}</p>
                <p><strong>Born In:</strong> ${item.county}</p>
                <p><strong>Background:</strong> ${item.background.join(", ")}</p>
                <p><strong>Education:</strong> ${item.education.join(", ")}</p>
                <p><strong>Famous Works:</strong> ${item.most_popular_works.join(", ")}</p>
                <img src="${item.images.person}" alt="person" width="120">
            `;
        }

        resultsDiv.appendChild(card);
    });
}

document.getElementById("search").addEventListener("input", (e) => {
    const query = e.target.value;

    if (query.length === 0) {
        document.getElementById("results").innerHTML = "";
        return;
    }

    const results = searchData(query);
    displayResults(results);
});

loadData();