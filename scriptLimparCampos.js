function limpaCampo(formId) {
    document.getElementById(formId).reset();
}

document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('toggle');
    const stylesheet = document.getElementById('stylesheet');

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            stylesheet.href = 'styles2.css';
        } else {
            stylesheet.href = 'styles.css';
        }
    });
});
