// Function to create and append elements
function createElement(tag, attributes, parent) {
    const element = document.createElement(tag);
    for (const key in attributes) {
        element[key] = attributes[key];
    }
    parent.appendChild(element);
    return element;
}

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create container div
    const container = createElement('div', { className: 'container' }, document.body);

    // Create header
    createElement('h1', { innerText: 'Basic UI Example' }, container);

    // Create form
    const form = createElement('form', { id: 'basicForm' }, container);

    // Create name label and input
    createElement('label', { htmlFor: 'name', innerText: 'Name:' }, form);
    createElement('input', { type: 'text', id: 'name', name: 'name', required: true }, form);

    // Create email label and input
    createElement('label', { htmlFor: 'email', innerText: 'Email:' }, form);
    createElement('input', { type: 'email', id: 'email', name: 'email', required: true }, form);

    // Create submit button
    createElement('button', { type: 'submit', innerText: 'Submit' }, form);

    // Add event listener to form submit
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        alert(`Name: ${name}\nEmail: ${email}`);
    });

    // Add some basic styles
    const style = document.createElement('style');
    style.innerHTML = `
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
        }

        h1 {
            text-align: center;
            margin-bottom: 20px;
        }

        form {
            display: flex;
            flex-direction: column;
        }

        label {
            margin-bottom: 5px;
        }

        input {
            margin-bottom: 15px;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            padding: 10px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #0056b3;
        }
    `;
    document.head.appendChild(style);
});
