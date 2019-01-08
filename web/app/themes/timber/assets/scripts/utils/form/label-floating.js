export default function () {

    const inputs = Array.from(document.querySelectorAll('.form-control.form-control--floating-label input[type="text"], .form-control.form-control--floating-label input[type="email"], .form-control.form-control--floating-label textarea'));

    inputs.forEach((el, index) => {

        el.addEventListener('keyup', (e) => {

            const el = e.currentTarget;
            const elGroup = el.closest('.form-control');

            if (el.value != "") {
                classList(elGroup).add("has-value");
            } else {
                classList(elGroup).remove("has-value");
            }

        });

    });

}
