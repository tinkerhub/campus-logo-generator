var svg = document.querySelector('svg');
var canvas = document.querySelector('canvas');
var image = document.querySelector('img');
var downloadBtn = document.getElementById('myBtn');

var color = "black";
var format = "SVG";

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

// Show or hide select format dropdown
function toggleSelect()
{
    var divs = document.querySelectorAll(".showable");

    for(var div of divs)
        if(div.classList.contains("show"))
            div.classList.remove("show");
        else div.classList.add("show");    
}

// Set the fromat of image to be downloaded
function setFormat(newFormat)
{
    format = newFormat;
    downloadBtn.innerText = `${format}`;
}

// Function to download image
function triggerDownload(imgURI) {
    var evt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true
    });

    var a = document.createElement('a');
    var str = document.getElementById('collegeName').value;
    a.setAttribute('download', "TinkerHub_".concat(str).concat(`.${format.toLowerCase()}`));
    a.setAttribute('href', imgURI);
    a.setAttribute('target', '_blank');
    a.dispatchEvent(evt);
}

// Add click event to download button
downloadBtn.addEventListener('click', function () {
    changeCollegeName();
    var openTag = `<svg id="svgLogo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2028 594" width="2028" height="594" style="fill: ${color};">`;
    var closeTag = '</svg>';
    var blob = new Blob([`${openTag}${svg.innerHTML}${closeTag}`], {type: "image/svg+xml"});  
    var blobURL = window.URL.createObjectURL(blob);

    if(format === "SVG")
        return triggerDownload(blobURL);
 
    image.addEventListener("load", function gotImage() {

        window.URL.revokeObjectURL(blobURL);
        image.removeEventListener("load",gotImage);

        var ctx = canvas.getContext("2d");

        ctx.fillStyle = color === "white" ? "black" : "white";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        if(format === "PNG")
            ctx.clearRect(0,0, canvas.width,canvas.height);

        ctx.drawImage(image,0,0);
        var imageURL = canvas.toDataURL(`image/${format.toLowerCase()}`);

        triggerDownload(imageURL);
    });    

    image.setAttribute("src", blobURL);
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

// Don't show dropdown when it is not available
// if(isSafari)
//     document.querySelector(".dropdown-toggle").remove();