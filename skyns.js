document.getElementById("fetchSkyNSbtn").onclick = function () { fetchSkyNS(); skynsSelection(); }
document.getElementById("sub").onclick = function () { submitG(); }

// Fetch
function fetchSkyNS() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            let skyns = new Array(); // Init Array
            let r = JSON.parse(xhttp.responseText); // Parse Response to Json

            r.forEach(element => { // Loop Response
                let x = { name: element.name, link: element.skylink }; // Get Name and SkyLink
                skyns.push(x); // Push Link to Array
            });
            saveSkyNS(JSON.stringify(skyns)); // Save SkyNS
        }
    };
    xhttp.open("GET", "https://skyns.herokuapp.com/api/skyns/", true);
    xhttp.send();
}

//Get
function getSkyNS() {
    let skyns = localStorage.getItem('skyns'); // Get Portals from localStorage
    return skyns;
}

//Set
function saveSkyNS(skyns) {
    localStorage.removeItem('skyns');
    localStorage.setItem('skyns', skyns); // Save Portals to localStorage
}

// Select SkyNS
function skynsSelection() {
    let datalist = document.getElementById("skynsList");
    let skyns = JSON.parse(getSkyNS());

    skyns.forEach(element => {
        let a = document.createElement("OPTION");
        a.text = element.link; // Skylink
        a.value = element.name; // Name
        a.setAttribute("id", element.name); // Set input id

        datalist.appendChild(a);
    });
}

//Submit
function submitG() {
    let in_skyns = document.getElementById('skynsSelect').value; // SkyNS Input
    let in_portal = document.getElementById('portalSelect').value; // Portal Input

    let skyns_list = JSON.parse(getSkyNS()); // Array
    let portal_list = JSON.parse(getPortal()); // Array
    let def_portal = getDefaultPortal(); // Get Default Portal

    let out = ""; // Output link

    portal_list.forEach(element => {
        if (element.name == in_portal) {
            out += element.link + "/";

            if (element.name != def_portal) {
                setDefaultPortal(element.name); // If portal not Default set new default
            }
        }
    });

    skyns_list.forEach(element => {
        if (element.name = in_skyns) {
            out += element.link;
        }
    });


    chrome.tabs.create({ url: out }); // Open SkyNS in new Tab
}