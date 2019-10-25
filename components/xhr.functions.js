export function urlPostRequest(request, data, asynchronized) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/api" + request, asynchronized);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = postStatusHandling;
    xhr.send(JSON.stringify(data));
}

export function postStatusHandling() {
    if (this.status != 201) {
        // analyze HTTP status of the response
        alert(`Error ${this.status}: ${this.statusText}`); // e.g. 404: Not Found
    } else {
        console.log("Task performed");
    }
}