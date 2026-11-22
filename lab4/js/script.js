class ContactRequest {
    constructor({ name, email, topic, message}) {
        this.name = name;
        this.email = email;
        this.topic = topic;
        this.message = message;
        this.createdAt = new Date().toLocaleString('ru-RU');
    }

    print() {
        console.log('Новая заявка с сайта-портфолио');
        console.log(`Имя:       ${this.name}`);
        console.log(`Email:     ${this.email}`);
        console.log(`Тема:      ${this.topic}`);
        console.log(`Сообщение: ${this.message}`);
        console.log(`Время:     ${this.createdAt}`);
    }
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');

    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);

        const request = new ContactRequest({
            name:    (formData.get('name')    || '').trim(),
            email:   (formData.get('email')   || '').trim(),
            topic:   formData.get('topic'),
            message: (formData.get('message') || '').trim(),
        });

        request.print();

        if (successMessage) {
            successMessage.hidden = false;
            setTimeout(() => { successMessage.hidden = true; }, 5000);
        }
        form.reset();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}