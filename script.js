/* ==== INDEX PAGE ==== */
/* javascript to link the RSS Feed of NOS sport to my index page */

/* datum function for my RSS feed link on my index page, to style the output */
function formatDatum(pubDate) {
    const datum = new Date(pubDate.replace(" ", "T"));
    const dag = String(datum.getDate()).padStart(2, "0");
    const maand = String(datum.getMonth() + 1).padStart(2, "0");
    const jaar = String(datum.getFullYear()).slice(-2);
    return dag + "-" + maand + "-" + jaar;
}
/* Function to fetch data from the NOS sport feed and display on my index page in a new created element with a build in hover to see complete title of the news*/
const lijst = document.getElementById("nieuws-lijst");

if (lijst) {
    const feedUrl = "https://feeds.nos.nl/nossportalgemeen";
    const rssApiKey = "tek4cubwwfzxbn6rtqxzzirhabdv5uvwvghcjzak";
    const apiUrl = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(feedUrl) + "&count=5&api_key=" + rssApiKey;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lijst.innerHTML = "";

            if (data.status !== "ok") {
                lijst.innerHTML = "<p>Nieuws kon niet geladen worden.</p>";
                return;
            }

            data.items.forEach(function (item) {
                const artikel = document.createElement("div");
                artikel.classList.add("nieuws-item");
                artikel.innerHTML =
                    "<h3><a href='" + item.link + "' target='_blank' rel='noopener' title=\"" + item.title + "\">" + item.title + "</a></h3>" +
                    "<p>" + formatDatum(item.pubDate) + "</p>";
                lijst.appendChild(artikel);
            });
        })
        .catch(function (error) {
            console.error("Kon nieuws niet laden:", error);
            lijst.innerHTML = "<p>Er ging iets mis bij het laden van het nieuws.</p>";
        });
}
/* ==== VOETBAL PAGE ==== */

/* ==== FORMULE 1 PAGE ==== */
/* Function to fetch the F1 calendar and Max Verstappen's results, and display them on the formule1 page */
/* Promise all, fetches both the calendar and max' results, when both results have been collected .()then 
    will  be executed. In the .()then we get a 2 results array data[0] is the calendar data[1] is max' results*/
    
const kalenderBody = document.getElementById("kalender-body");

if (kalenderBody) {
    const seizoen = 2026;
    const racesUrl = "https://api.jolpi.ca/ergast/f1/" + seizoen + "/races.json";
    const verstappenUrl = "https://api.jolpi.ca/ergast/f1/" + seizoen + "/drivers/max_verstappen/results.json";

    function formatRaceDatum(datumString) {
        const delen = datumString.split("-");
        return delen[2] + "-" + delen[1] + "-" + delen[0];
    }

    Promise.all([
        fetch(racesUrl).then(function (response) { return response.json(); }),
        fetch(verstappenUrl).then(function (response) { return response.json(); })
    ])
        .then(function (data) {
            const races = data[0].MRData.RaceTable.Races;
            const verstappenRaces = data[1].MRData.RaceTable.Races;

            const resultatenPerRonde = {};
            verstappenRaces.forEach(function (race) {
                resultatenPerRonde[race.round] = race.Results[0].position;
            });

            kalenderBody.innerHTML = "";

            races.forEach(function (race) {
                const rij = document.createElement("tr");
                const datum = formatRaceDatum(race.date);
                const positie = resultatenPerRonde[race.round];
                const resultaatTekst = positie ? "P" + positie : "Nog te rijden";

                rij.innerHTML =
                    "<td>" + datum + "</td>" +
                    "<td>" + race.raceName + "</td>" +
                    "<td>" + resultaatTekst + "</td>";
                kalenderBody.appendChild(rij);
            });
        })
        .catch(function (error) {
            console.error("Kon kalender niet laden:", error);
            kalenderBody.innerHTML = "<tr><td colspan='3'>Kalender kon niet geladen worden.</td></tr>";
        });
}
/* ==== VR46 PAGE ==== */

/* ==== CONTACT PAGE ==== */
/* javascript for my submit button on my contact form, with a savety that form can only be submitted with mandatory fields filled in */
   
const form = document.querySelector("form");

form.addEventListener("submit", function(event) {

    const naam = document.getElementById("naam").value;
    const email = document.getElementById("email").value;
    const bericht = document.getElementById("bericht").value;

    if(naam === "" || email === "" || bericht === ""){
        alert("Vul alle verplichte velden in.");
        event.preventDefault();
    }
});