var httpsPortNumberAPI;
var httpsPortNumberApp;

// Get the port number (APP and API) by xml file set by user
function getPorts() {
    var portURL = "res/ports.xml";
    $.get({
        url: portURL, success: function (result) {
            console.log(result); // check that the data is correct
            httpsPortNumberApp = result.getElementsByTagName("node-port-https-app").item(0).textContent;
            httpsPortNumberAPI = result.getElementsByTagName("node-port-https-api").item(0).textContent;
            console.log("Port API : " + httpsPortNumberAPI);
            console.log("Port APP : " + httpsPortNumberApp);
        }, // end of the inner function
        async: false
    }); // end of the ajax request
} // end of the outer function
