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
