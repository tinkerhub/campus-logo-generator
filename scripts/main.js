var svg = document.querySelector('svg');
var canvas = document.querySelector('canvas');
var color = "black";

// Add click event to theme toggle button
document.getElementById('toggleColor').addEventListener('click', function (evt) {
    var cardTemplate = document.querySelector(".card")
    // Check current state
    if (evt.target.innerHTML === "Dark Theme") {
        svg.style.fill = "white";
        cardTemplate.style.backgroundColor = "#191919";
        cardTemplate.firstElementChild.style.color = "white";
        evt.target.innerHTML = "Light Theme";
        document.getElementById("toggleColor").classList.remove('btn-dark');
        document.getElementById("toggleColor").classList.add('btn-light');
    } else {
        svg.style.fill = "black";
        cardTemplate.style.backgroundColor = "white";
        cardTemplate.firstElementChild.style.color = "#6c757d ";
        evt.target.innerHTML = "Dark Theme";
        document.getElementById("toggleColor").classList.remove('btn-light');
        document.getElementById("toggleColor").classList.add('btn-dark');
    }

    color = svg.style.fill;
})

// Function to download image
function triggerDownload(imgURI) {
    var evt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true
    });

    var a = document.createElement('a');
    var str = document.getElementById('collegeName').value;
    a.setAttribute('download', "TinkerHub_".concat(str).concat(".svg"));
    a.setAttribute('href', imgURI);
    a.setAttribute('target', '_blank');
    a.dispatchEvent(evt);
}

// Add click event to download button
document.getElementById('myBtn').addEventListener('click', function () {
    changeCollegeName();
    var openTag = `<svg id="svgLogo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2028 594" width="2028" height="594" style="fill: ${color};">`;
    var closeTag = '</svg>';
    var blob = new Blob([`${openTag}${svg.innerHTML}${closeTag}`], {type: "image/svg+xml"});  
    triggerDownload(window.URL.createObjectURL(blob));
});

// Dynamic update of college name on keychange 
var keyChange = document.getElementById('collegeName');
keyChange.onkeyup = keyChange.onkeypress = function () {
    changeCollegeName();
}
function changeCollegeName() {
    var collegeName = document.getElementById('collegeName').value;
    document.getElementById('logoName').textContent = collegeName;
}