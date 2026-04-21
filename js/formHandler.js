const form = document.getElementById("formContato");

form.addEventListener("submit", function (e) {

    if (!form.checkValidity()) {
        e.preventDefault();
        return;
    }

    e.preventDefault();

    document.querySelector(".form-opened").className = "form-closed";
    document.querySelector(".box-closed").className = "sucess-box box-opened";

});