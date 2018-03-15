"use strict";
document.getElementById('issuesForm').addEventListener('submit', saveIssues);

(function fetchIssues(data) {
    if (data !== null) {
        if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
            let localData = data;
            for (var i = 0; i < localData.length; i++) {
                createForm(data[i].issuesId, data[i].issuesDescription, data[i].issuesServerity, data[i].issuesAssignedTo, data[i].status);
            }
        } else return false;
    } else return false;
})(JSON.parse(localStorage.getItem('issues')));


function saveIssues(e) {
    let issue = {
        issuesId: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase() + '-' + Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9),
        status: 'Open',
        issuesDescription: document.getElementById('description').value,
        issuesServerity: document.getElementById('inputGroupSelect01').value,
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
    fetchIssues(JSON.parse(localStorage.getItem('issues')));
    e.preventDefault();
}


function createForm(id, description, severity, assignedTo, status) {
    document.getElementById('issuesList').innerHTML += '<div class="jumbotron">' +
        '<h6><small><b>Issue ID:</b> ' + id + '</small></h6>' +
        '<p><span class="badge badge-info">' + status + '</span></p>' +
        '<h3>' + description + '</h3>' +
        '<div><p><i class="fas fa-cogs"></i> <b>' + severity + '</b></p>'+'<p><i class="fas fa-user"></i> <b>' + assignedTo + '</b></p></div>' +
        '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a> ' +
        '<a href="#" onclick="deleteIssue(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
        '</div>';
}
