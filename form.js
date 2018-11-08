// document.addEventListener('DOMContentLoaded', loaded);

var form;

function loaded() {
    form = document.getElementById('preorderForm');
    form.addEventListener("submit", submitForm, false);
    form.elements["find"].addEventListener("change", showOther);
}

function showOther(e) {
    var toggleEl = document.getElementById("howOther");
    if (e.target.value == "other") {
        toggleEl.style.display = "block";
    }
    else {
        toggleEl.style.display = "none";
    }
}

function submitForm(e) {
    e.preventDefault();
    var data = getFormData();
    var url = e.target.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        form.style.display = "none";
        document.getElementById("formSubmitted").style.display = "block";
        if (this.readyState == 4 && (this.status == 200 || this.status == 201)) {
            result = JSON.parse(xhr.responseText);
            console.log(result);
        }
        return;
    };
    var encoded = Object.keys(data).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
}

function getFormData() {
    var data = {};
    var elements = form.elements;
    var fields = Object.keys(elements).map(function (k) {
        if (elements[k].name !== undefined) {
            return elements[k].name;
        }
    }).filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item;
    });
    fields.forEach(function (k) {
        data[k] = elements[k].value;
    });
    return data;
}

loaded();