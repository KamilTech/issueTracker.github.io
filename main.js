"use strict";
document.getElementById('issuesForm').addEventListener('submit', saveIssues);

(() => {
    fetchIssues();
})();

// Function to check if fields have passed validation
function checkValidation() {
    if (formValid.description && formValid.serverity && formValid.assignedTo) {
        $('#submitButton').removeAttr('disabled');
    } else {
        $('#submitButton').attr('disabled', true);
    }
}

function fetchIssues() {
    document.getElementById('issuesList').innerHTML = '';
    let data = JSON.parse(localStorage.getItem('issues'));
    if (data !== null) {
        if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
            let localData = data;
            for (var i = 0; i < localData.length; i++) {
                createForm(data[i].issuesId, data[i].issuesDescription, data[i].issuesServerity, data[i].issuesAssignedTo, data[i].status);
            }
        } else return false;
    } else return false;
};

function saveIssues(e) {
    let issue = {
        issuesId: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase() + '-' + Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9),
        status: 'Open',
        issuesDescription: document.getElementById('description').value,
        issuesServerity: document.getElementById('select').value,
        issuesAssignedTo: document.getElementById('assignedTo').value
    }

    if (localStorage.getItem('issues') === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    document.getElementById('issuesForm').reset();
    formValid.assignedTo = false;
    formValid.serverity = false;
    formValid.description = false;
    checkValidation();
    fetchIssues();
    e.preventDefault();
}

function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].issuesId == id) {
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function createForm(id, description, severity, assignedTo, status) {
    document.getElementById('issuesList').innerHTML += '<div class="jumbotron">' +
        '<h6><small><b>Issue ID:</b> ' + id + '</small></h6>' +
        '<p><span class="badge badge-info">' + status + '</span></p>' +
        '<h3>' + description + '</h3>' +
        '<div class="d-flex justify-content-start"><p><i class="fas fa-cogs"></i> <b>' + severity + '</b></p>&nbsp;&nbsp;' +
        '<p><i class="fas fa-user"></i> <b>' + assignedTo + '</b></p></div>' +
        '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a> ' +
        '<a href="#" onclick="deleteIssue(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
        '</div>';
}

// Jquery Validation
var formValid = {
    description: false, // description field
    serverity: false, // serverity field
    assignedTo: false // Assigned to field
};

$('#description').on('input', function () {
    let description = $(this).val();

    function msg(body) {
        $('#description-error').text(body).show();
        $('#description').attr('style', 'border-color: red');
    };

    function hide() {
        $('#description-error').hide();
        $('#description').attr('style', 'border-color: none');
    };

    if (description.length < 1) {
        msg('This field is required.');
        formValid.description = false;
        checkValidation();
    } else {
        hide();
        formValid.description = true;
        checkValidation();
        var testExp = new RegExp(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/);
        if (!testExp.test(description)) {
            msg('Must not have any special characters');
            formValid.description = false;
            checkValidation();
        } else {
            hide();
            formValid.description = true;
            checkValidation();
            if (description.length < 3 || description.length > 500) {
                msg('Must be at least 3 characters but no more than 500');
                formValid.description = false;
                checkValidation();
            } else {
                hide();
                formValid.description = true;
                checkValidation();
            }
        }
    }
});

// Validation for E-mail Input
$('#assignedTo').on('input', function () {
    var assignedTo = $(this).val();

    function msg(body) {
        $('#assignedTo-error').text(body).show();
        $('#assignedTo').attr('style', 'border-color: red');
    };

    function hide() {
        $('#assignedTo-error').hide();
        $('#assignedTo').attr('style', 'border-color: none');
    };

    if (assignedTo.length < 1) {
        msg('This field is required.');
        formValid.assignedTo = false;
        checkValidation();
    } else {
        hide();
        formValid.assignedTo = true;
        checkValidation();
        var testExp = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
        if (!testExp.test(assignedTo)) {
            msg('Must not have any special characters');
            formValid.assignedTo = false;
            checkValidation();
        } else {
            hide();
            formValid.assignedTo = true;
            checkValidation();
            if (assignedTo.length < 2 || assignedTo.length > 50) {
                msg('Must be at least 2 characters but no more than 50');
                formValid.assignedTo = false;
                checkValidation();
            } else {
                hide();
                formValid.assignedTo = true;
                checkValidation();
            }
        }
    }
});

$( "#select" ).change(function() {
    let selectForm = $(this).val();
    
    var testExp = new RegExp(/\b(Low|Medium|Hard)\b/);
    if (!testExp.test(selectForm)) {
        formValid.serverity = false;
        checkValidation();
    } else {
        formValid.serverity = true;
        checkValidation();
    }
});