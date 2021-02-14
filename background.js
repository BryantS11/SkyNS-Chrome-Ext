chrome.runtime.onInstalled.addListener(function () {
    //Portals
    fetchPortal(); // Fetch Portals
    let defaultPortal = getDefaultPortal(); // Get Default Portal
    if (defaultPortal == null) {
        setDefaultPortal("SiaSky.net"); // If empty set default to SiaSky  
    }

    // SkyNS
    fetchSkyNS();
});