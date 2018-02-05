// Enter Integration Key as token.
var token = "";


var apiAccessPoint = "";
var transientDocId = "";


var form = document.forms.namedItem("fileinfo");
form.addEventListener('submit', function(event) {
   getUris();
   event.preventDefault();
}, false);


function getUris() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            apiAccessPoint = JSON.parse(request.responseText).api_access_point;
            console.log("Got API Access Point.");
            uploadTransientDoc();
        }
    };
    request.open("GET", "https://api.na1.echosign.com:443/api/rest/v5/base_uris", true);
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("Access-Token", token);
    request.send();
}


function uploadTransientDoc() {
    var data = new FormData(form);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            transientDocId = JSON.parse(request.responseText).transientDocumentId;
            console.log("Uploaded Document to the Server.");
            sendAgreement();
        }
    };
    request.open("POST", apiAccessPoint + "api/rest/v5/transientDocuments", true);
    request.setRequestHeader("Access-Token", token);
    request.send(data);
}


var agreementCreationInfo = {
    "documentCreationInfo": {
        "fileInfos": [
            {
                "transientDocumentId": ""
            }
        ],
        "name": "TestAgreement",
        "recipientSetInfos": [
            {
                "recipientSetMemberInfos": [],
                "recipientSetRole": "SIGNER"
            }
        ],
        "signatureType": "ESIGN",
        "signatureFlow": "SENDER_SIGNATURE_NOT_REQUIRED"
    }
};


function sendAgreement() {
    var request = new XMLHttpRequest();
    request.open("POST", apiAccessPoint + "api/rest/v5/agreements", false);
    request.setRequestHeader("Access-Token", token);
    request.setRequestHeader("Content-Type", "application/json");

    agreementCreationInfo.documentCreationInfo.fileInfos[0].transientDocumentId = transientDocId;

    var recipientSetMemberInfos = [];
    var userEmails = document.getElementsByClassName("emailAddress");
    for (var i = 0; i < userEmails.length; i++) {
        recipientSetMemberInfos.push({"email" : userEmails[i].value});
    }

    agreementCreationInfo.documentCreationInfo.recipientSetInfos[0].recipientSetMemberInfos = recipientSetMemberInfos;

    request.send(JSON.stringify(agreementCreationInfo));
    console.log("Sent the Document to the Recipient(s).");
    alert("Sent the Document to the Recipient(s).");
}



