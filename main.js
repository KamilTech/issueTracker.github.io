"use strict";

((data) => {
    if (data !== null) {
        if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
            let localData = data;
            for (var i = 0; i < localData.length; i++) {
                console.log(localData[i].id);
            }
        } else return false;
    } else return false;
})(JSON.parse(localStorage.getItem('siteData')));


function saveIssues() {
    let issue = {
        issuesId: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase() + '-' + Math.random().toString(36).substr(2, 9) + '-' + Math.random().toString(36).substr(2, 9),
        issuesDescription: document.getElementById('description').value,
        issuesServerity: document.getElementById('inputGroupSelect01').value,
        issuesAssignedTo: document.getElementById('assignedTo').value
    }
    
    if (localStorage.getItem('siteData') === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = localStorage.getItem('issues');
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
}