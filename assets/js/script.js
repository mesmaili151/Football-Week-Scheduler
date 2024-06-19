document.getElementById('von').addEventListener('change', function() {
    const vonTime = this.value;
    if (vonTime) {
        const vonDate = new Date(`1970-01-01T${vonTime}:00`);
        const bisDate = new Date(vonDate.getTime() + 90 * 60000); // add 90 minutes
        const bisHours = String(bisDate.getHours()).padStart(2, '0');
        const bisMinutes = String(bisDate.getMinutes()).padStart(2, '0');
        document.getElementById('bis').value = `${bisHours}:${bisMinutes}`;
    }
});

function generateText() {
    const dateInput = document.getElementById('date');
    const vonInput = document.getElementById('von');
    const bisInput = document.getElementById('bis');
    const resultDiv1 = document.getElementById('result1');
    const resultDiv2 = document.getElementById('result2');
    const textCopyContainer = document.getElementById('textCopyContainer');

    if (!dateInput.value || !vonInput.value || !bisInput.value) {
        alert('Bitte wählen Sie ein Datum und eine Zeit.');
        return;
    }

    const date = new Date(dateInput.value);
    const weekNumber = getWeekNumber(date);
    const formattedDate = formatDate(date);
    const vonTime = vonInput.value;
    const bisTime = bisInput.value;

    const resultText1 = `Fußballwoche <strong>${weekNumber}</strong>, Sonntag, <strong>${formattedDate}</strong>, welche Zeit passt Ihnen? Sie können mehrere Optionen auswählen.`;
    const resultText2 = `Von <strong>${vonTime}</strong> bis <strong>${bisTime}</strong> ist der Platz ausgebucht. Seid bitte 15 Minuten früher da, um euch vorzubereiten, damit wir keine Zeit verlieren.`;

    resultDiv1.innerHTML = resultText1;
    resultDiv2.innerHTML = resultText2;

    // Show the copy container
    textCopyContainer.classList.remove('hidden');
}

function getWeekNumber(date) {
    const firstJan = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstJan) / 86400000;
    return Math.ceil((pastDaysOfYear + firstJan.getDay() + 1) / 7);
}

function formatDate(date) {
    const options = { day: '2-digit', month: 'short' };
    return date.toLocaleDateString('de-DE', options);
}

// Set the current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();
