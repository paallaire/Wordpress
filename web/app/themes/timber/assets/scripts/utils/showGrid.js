export default function (numberColumns = 12) {
    const btn = document.createElement('button');
    const grid = document.createElement('div');

    // btn
    btn.setAttribute('class', 'show-grid-toggle');
    btn.setAttribute('id', 'js-toggle-grid');
    btn.innerHTML = 'Show grid';
    document.body.appendChild(btn);

    // grid
    grid.setAttribute('class', 'show-grid');
    grid.setAttribute('id', 'show-grid');
    document.body.appendChild(grid);

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        grid.classList.toggle('is-active');

        if (grid.classList.contains('is-active')) {
            btn.innerHTML = 'Hide grid';
        } else {
            btn.innerHTML = 'Show grid';
        }
    });

    const container = document.createElement('div');
    container.setAttribute('class', 'show-grid__container');
    grid.appendChild(container);

    const row = document.createElement('div');
    row.setAttribute('class', 'show-grid__row row');
    container.appendChild(row);

    for (let i = 0; i < numberColumns; i += 1) {
        const column = document.createElement('div');
        column.setAttribute('class', 'show-grid__column col-small-1');
        row.appendChild(column);
    }
}
