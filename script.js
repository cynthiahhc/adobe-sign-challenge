var emailGroup = document.getElementsByClassName("emailGroup")[0];
addEmailOnBlurListener(emailGroup);
addDeleteOnClickListener(emailGroup);

var file = document.getElementById("uploadFile");

file.addEventListener("change", function(event) {
    var filePath = file.value;
    var fileName = "";

    if (filePath !== "") {
        fileName = filePath.split('\\').pop().split('/').pop();
        document.getElementById("fileLabel").innerHTML = fileName;
    }
    disableButtons(undefined);
});


function isValidPDF() {
    var filePath = file.value;
    var fileName = "";
    var errMsg = document.getElementsByClassName("invalidFile")[0];

    if (filePath !== "") {
        fileName = filePath.split('\\').pop().split('/').pop();
        var fileNameSplit = fileName.split(".");

        var fileExt = fileNameSplit[fileNameSplit.length - 1];
        if (fileExt.toLowerCase() !== "pdf") {
            errMsg.style.display = "inline";
            return false;
        }
        errMsg.style.display = "none";
        return true;
    }
    errMsg.style.display = "inline";
    return false;
}

// add email input field event listner
function addEmailOnBlurListener(emailGroup){
    var emailNode = emailGroup.getElementsByClassName("emailAddress")[0];
    emailNode.addEventListener("blur", function(event) {
        validateAllEmails(event.target);
    });
}

// add delete email input field event listener
function addDeleteOnClickListener(emailGroup) {
    var addOnNode = emailGroup.getElementsByClassName("deleteRecipient")[0];
    addOnNode.addEventListener("click", function(event) {
        if (document.getElementsByClassName("emailGroup").length > 1) {
            emailGroup.parentNode.removeChild(emailGroup);
            validateAllEmails(document.getElementsByClassName("emailAddress")[0]);
        }
    });
}

// add new email input fields
function addRecipient() {
    disableButtons(true);
    var emailGroups = document.getElementsByClassName("emailGroup");
    var parent = emailGroups[0].parentElement;
    var newEmailGroup = emailGroups[0].cloneNode(true);
    newEmailGroup.getElementsByTagName("input")[0].value = "";
    addEmailOnBlurListener(newEmailGroup);
    addDeleteOnClickListener(newEmailGroup);
    parent.append(newEmailGroup);
}


// validate single email address
function validateEmail(email) {
    if (email !== "") {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
    return true;
}

// validate if all emails are entered and valid
function validateAllEmails(emailNode) {
    var isDisabled = false;
        var email = emailNode.value;
    if (email === "") {
        disableButtons(true);
    } else if (!validateEmail(email)) {
        emailNode.parentNode.nextElementSibling.style.display = "inline";
        disableButtons(true);
    } else {
        emailNode.parentNode.nextElementSibling.style.display = "none";
        var emailNodes = document.getElementsByClassName("emailAddress");
        for (var i = 0; i < emailNodes.length; i++) {
            var email = emailNodes[i].value;
            if (!email || !validateEmail(email)) {
                emailNodes[i].parentNode.nextElementSibling.style.display = "inline";
                isDisabled = true;
            }
        }
        disableButtons(isDisabled);
    }
}


function disableButtons(isDisabled) {
    if (isDisabled !== undefined) {
        document.getElementById("addRecipientButton").disabled = isDisabled;
    } else {
        document.getElementById("submitButton").disabled = !isValidPDF();
    }
}




