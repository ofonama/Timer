const body = $("body");
const form = $("#timer-form");
const titleInput = $("#form");
const titleInvalidMessage = $("#validate-message-one");
const timeUpMessageInput = $("#form2");
const timeUpMessageInvalidMessage = $("#validate-message-two");
const backgroundColorInput = $("#form3");
const backgroundColorInvalidMessage = $("#validate-message-three");
const fontInput = $("#form4");
const durationInputOne = $("#form5");
const durationInputTwo = $("#form6");
const durationInputThree = $("#form7");
const btnSuccess = $(".btn-success");

form.on("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    const title = titleInput.val().trim();
    const timeUpMessage = timeUpMessageInput.val().trim();
    const backgroundColor = backgroundColorInput.val().trim();
    const font = fontInput.val().trim();
    const durationOne = durationInputOne.val().trim();
    const durationTwo = durationInputTwo.val().trim();
    const durationThree = durationInputThree.val().trim();

    // Title validation
    if (title === "") {
        titleInvalidMessage.html("Please, fill out this field.");
        titleInput.attr("class", "form-control border-danger is-invalid");
        isValid = false;
    } else {
        titleInvalidMessage.html("");
        titleInput.attr("class", "form-control border-success is-valid");
        localStorage.setItem("title", title);
    }

    // Time up message validation
    if (timeUpMessage === "") {
        timeUpMessageInvalidMessage.html("Please, fill out this field.");
        timeUpMessageInput.attr("class", "form-control border-danger is-invalid");
        isValid = false;
    } else {
        timeUpMessageInvalidMessage.html("");
        timeUpMessageInput.attr("class", "form-control border-success is-valid");
        localStorage.setItem("timeUpMessage", timeUpMessage);
    }

    // Background color validation
    if (backgroundColor === "") {
        backgroundColorInvalidMessage.html("Please, fill out this field.");
        backgroundColorInput.attr("class", "form-control border-danger is-invalid");
        isValid = false;
    } else {
        if (backgroundColor === "default") {
            backgroundColorInvalidMessage.html("");
            backgroundColorInput.attr("class", "form-control border-success is-valid");
            localStorage.setItem("backgroundColor", backgroundColor);
        } else {
            backgroundColorInvalidMessage.html("");
            backgroundColorInput.attr("class", "form-control border-success is-valid");
            localStorage.setItem("backgroundColor", backgroundColor);
        }
    }

    if (font !== '') {
        fontInput.attr("class", "form-select border-success is-valid");
        localStorage.setItem("font", font);
    } else {
        fontInput.attr("class", "form-select");
        localStorage.setItem("font", "Sans-serif"); // or set a default font
    }
    // fontInput.attr("class", "form-select");
    // localStorage.setItem("font", font);

    // Duration validation

    // hours
    if (durationOne === '') {
        $("#validate-message-five").html("Please, fill out this field.");
        durationInputOne.attr("class", "form-control border-danger is-invalid");
        isValid = false;
    } else if (durationOne > 24 || durationOne < 0) {
        isValid = false;
        $("#validate-message-five").html("Ranges of 0 - 24hrs");
        durationInputOne.attr("class", "form-control border-danger is-invalid");
    } else {
        $("#validate-message-five").html("");
        durationInputOne.attr("class", "form-control border-success is-valid");
        localStorage.setItem("durationOne", durationOne);
    }

    // Minutes
    if (durationTwo === '') {
        $("#validate-message-six").html("Please, fill out this field.");
        durationInputTwo.attr("class", "form-control border-danger is-invalid");
        isValid = false;
    } else if (durationTwo > 60 || durationTwo < 0) {
        isValid = false;
        $("#validate-message-six").html("Ranges of 0 - 60mins");
        durationInputTwo.attr("class", "form-control border-danger is-invalid");
    } else {
        $("#validate-message-six").html("");
        durationInputTwo.attr("class", "form-control border-success is-valid");
        localStorage.setItem("durationTwo", durationTwo);
    }

    // Seconds
    if (durationThree === '') {
        $("#validate-message-seven").html("Please, fill out this field.");
        durationInputThree.attr("class", "form-control border-danger is-invalid");
        isValid = false;
    } else if (durationThree > 60 || durationThree < 0) {
        isValid = false;
        $("#validate-message-seven").html("Ranges of 0 - 60secs");
        durationInputThree.attr("class", "form-control border-danger is-invalid");
    } else {
        $("#validate-message-seven").html("");
        durationInputThree.attr("class", "form-control border-success is-valid");
        localStorage.setItem("durationThree", durationThree);
    }

    if (isValid) {
        btnSuccess.html("loading");
        setTimeout(() => {
            btnSuccess.html("Next!");
        }, 2000);
        window.location.href = "../countdown/index.html";
    }
});

const background = $(".background");
const option1 = $(".light");
const option2 = $(".dark");

// option1.on("click", (e) => {
//     e.preventDefault();
//     body.attr("class", "bg-light text-dark");
// });

// option2.on("click", (e) => {
//     e.preventDefault();
//     body.attr("class", "bg-dark text-light");
// });