document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', function () {
        nav.classList.toggle('active');
    });

    // Função para rolagem suave
    function smoothScroll(target, duration) {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Adicionando evento de clique aos links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target, 1000);

            // Fechar menu ao clicar no link, se estiver no modo mobile
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });


    // Enviar formulário de contato

    var form = this.getElementById('form-contact').addEventListener('submit', function(event){
        
        event.preventDefault();

        // Pegando valores do formulário

        const leadName = document.getElementById('leadNameInput').value;
        const leadEmail = document.getElementById('leadEmailInput').value;
        const leadPhone = document.getElementById('leadPhoneInput').value;
        const interest = document.getElementById('interestSelect').value;
        const leadHistory = document.getElementById('leadHistoryText').value;

        // Validando campos/Verificando senão estão vazios

        if (leadName === '' || leadEmail === '' || leadPhone === '' || interest === '' || leadHistory === '') {
            alert('Para enviar o formulário, você deve preencher todos os campos :)');
        } else {
            const templateParams = {
                lead_name: leadName,
                lead_email: leadEmail,
                lead_phone: leadPhone,
                interest: interest,
                lead_history: leadHistory
            }
        
            emailjs.send("service_zglux5o", "template_7uficp6", templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert("E-mail enviado com sucesso!");
            }, function(error) {
                console.log('FAILED...', error);
                alert("Houve um erro ao enviar o e-mail.");
            });
        }
    });
});
