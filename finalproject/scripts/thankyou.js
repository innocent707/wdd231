import './main.js';

const formDataDisplay = document.getElementById('formDataDisplay');
const currentUrl = window.location.href;

const formData = currentUrl.split('?')[1];

if (formData) {
  const showInfo = formData.split('&');
  let resultHTML = '<ul>';

  showInfo.forEach(element => {
    const [key, value] = element.split('=');
    const cleanKey = decodeURIComponent(key);
    const cleanValue = decodeURIComponent(value.replace(/\+/g, ' '));
    resultHTML += `<li><strong>${cleanKey}:</strong> ${cleanValue}</li>`;
  });

  resultHTML += '</ul>';
  formDataDisplay.innerHTML = resultHTML;
} else {
  formDataDisplay.innerHTML = '<p>No form data was submitted.</p>';
}