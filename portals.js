window.onload = function () { portalSelection(); skynsSelection(); }
document.getElementById("fetchPortalbtn").onclick = function () { fetchPortal(); portalSelection(); }

// Fetch
function fetchPortal() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            let portals = new Array(); // Init Array
            let r = JSON.parse(xhttp.responseText); // Parse Response to Json

            r.forEach(element => { // Loop Response
                let x = { name: element.name, link: element.link }; // Get Name and Link
                portals.push(x); // Push Link to Array
            });
            savePortal(JSON.stringify(portals)); // Save the portals
        }
    };
    xhttp.open("GET", "https://siastats.info/dbs/skynet_current.json", true);
    xhttp.send();
}

//Get
function getPortal() {
    let portal = localStorage.getItem('portals'); // Get Portals from localStorage
    return portal;
}

function getDefaultPortal() {
    let portal = localStorage.getItem('default'); // Get Default Portal from localStorage
    return portal;
}

//Set
function savePortal(portals) {
    localStorage.removeItem('portals');
    localStorage.setItem('portals', portals); // Save Portals to localStorage
}

function setDefaultPortal(portal) {
    localStorage.setItem('default', portal); // Save Default Portal to localStorage
}

// Select Portal
function portalSelection() {
    let datalist = document.getElementById("portalList");
    let portals = JSON.parse(getPortal());
    let defaultPortal = getDefaultPortal();

    portals.forEach(element => {
        let a = document.createElement("OPTION");
        a.text = element.link;
        a.value = element.name;
        a.setAttribute("id", element.name); // Set input id

        if (element.name == defaultPortal) {
            a.setAttribute("selected", ""); // Set input id
        }

        datalist.appendChild(a);
    });
    document.getElementById("portalSelect").value = defaultPortal;
}

