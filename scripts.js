const animateCSS = (elements,
    animation,
    operacao = 'in',
    duration = 400,
    prefix = 'animate__') =>
    new Promise((resolve) => {
        elements = !Array.isArray(elements) ? [elements] : elements;
        const animationName = `${prefix}${animation}`;

        if (elements.length == 0)
            resolve();

        elements.forEach((element, index) => {
            const node = document.querySelector(element);
            node.style.animationDuration = duration + 'ms';
            node.classList.add(`${prefix}animated`, animationName);
            node.addEventListener('animationend', handleAnimationEnd, { once: true });
            if (operacao == 'in')
                $(element).show();
            function handleAnimationEnd(event) {
                event.stopPropagation();
                node.classList.remove(`${prefix}animated`, animationName);
                if (operacao == 'out')
                    $(element).hide();
                if (index == elements.length - 1)
                    resolve('Animation ended');
            }
        });
    });

function configurePage(state) {
    const newPage = ['#bem_vindo', '#jogo', '#desenvolvedores', "#jogar"]
        .filter(a => a != state)
        .filter(a => $(a).is(':visible'))
    animateCSS(newPage, 'zoomOut', 'out').then(() => {
        animateCSS([state], 'zoomIn', 'in')
    })

    const $active = $('#navbarNavAltMarkup');

    $active.find('a').removeClass('active');

    if (state == '#bem_vindo')
        return;

    if (state == '#jogo') {
        $active.find('#g').addClass('active');
        return;
    }
    if (state == '#jogar') {
        $active.find('#j').addClass('active');
        return
    }
    $active.find('#d').addClass('active');
}

$(() => {
    configurePage('#bem_vindo');
})