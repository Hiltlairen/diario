// Variables globales
let currentDate = new Date();
let selectedDate = new Date();
let journalData = {};
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Consejos diarios (ampliable)
const dailyAdvice = [
    "Hoy es un nuevo día lleno de oportunidades. Aprovecha cada momento.",
    "Recuerda que cada desafío es una oportunidad para crecer y aprender.",
    "Hoy, sonríe a la vida y la vida te sonreirá a ti.",
    "No te preocupes por lo que no puedes controlar. Enfócate en lo que sí puedes hacer.",
    "Cada día es una página en blanco. Escribe una historia hermosa hoy.",
    "La distancia física no disminuye el amor. Te llevo en mi corazón siempre.",
    "Hoy, haz algo que te haga feliz, por pequeño que sea.",
    "Confía en tu capacidad para superar cualquier obstáculo.",
    "La paciencia es la clave. Todo llega en su momento adecuado.",
    "Hoy es perfecto para agradecer por las pequeñas bendiciones.",
    "Cada conversación es una oportunidad para conectar y aprender.",
    "No subestimes el poder de una actitud positiva.",
    "Hoy, sé amable contigo misma. Te lo mereces.",
    "El aprendizaje nunca termina. Hoy aprenderás algo nuevo.",
    "Visualiza el éxito y trabaja para conseguirlo.",
    "Tu bienestar es lo más importante. Cuídate hoy.",
    "La perseverancia es la madre del éxito. Sigue adelante.",
    "Hoy, encuentra belleza en los detalles simples.",
    "La comunicación efectiva abre puertas. Escucha y habla con atención.",
    "Cada paso, por pequeño que sea, te acerca a tus metas.",
    "Hoy es un buen día para sonreír sin razón alguna.",
    "La adaptabilidad es una superpoder. Ajusta tu rumbo si es necesario.",
    "Tu energía positiva contagia a los demás. Compártela hoy.",
    "Nochebuena: Que la magia de esta noche llene tu corazón de paz y alegría.",
    "Navidad: Que esta fecha te recuerde el amor, la familia y la esperanza.",
    "Hoy es un día para reflexionar sobre las bendiciones recibidas.",
    "Termina el año con gratitud por lo vivido y esperanza por lo que vendrá.",
    "Nochevieja: Deja atrás lo que no sirve y recibe el nuevo año con los brazos abiertos.",
    "Año Nuevo: Hoy empieza un nuevo capítulo. Hazlo memorable.",
    "El primer día del año es perfecto para establecer intenciones positivas.",
    "Cada día es una oportunidad para ser una mejor versión de ti misma.",
    "Hoy, enfócate en soluciones, no en problemas.",
    "La creatividad florece cuando la mente está tranquila. Encuentra tu paz hoy.",
    "Tu actitud determina tu dirección. Elige una actitud positiva hoy.",
    "Hoy, recuerda lo lejos que has llegado y lo fuerte que eres.",
    "La empatía te conecta con los demás. Practícala hoy.",
    "Cada logro, por pequeño, merece ser celebrado. Reconócete hoy.",
    "Hoy es un buen día para perdonar, soltar y seguir adelante.",
    "Tu viaje es único. No lo compares con el de los demás.",
    "Hoy, da el primer paso hacia algo que hayas estado posponiendo.",
    "La gratitud transforma lo que tenemos en suficiente. Sé agradecida hoy."
];

// Fechas especiales con animaciones
const specialDates = {
    '12-24': { name: 'Nochebuena', animation: 'snow' },
    '12-25': { name: 'Navidad', animation: 'snow' },
    '12-31': { name: 'Nochevieja', animation: 'fireworks' },
    '01-01': { name: 'Año Nuevo', animation: 'fireworks' }
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Función de inicialización
function initializeApp() {
    // Cargar datos guardados
    loadJournalData();
    
    // Configurar fecha actual
    updateCurrentDate();
    updateDaysRemaining();
    
    // Generar calendario
    generateCalendar(currentMonth, currentYear);
    
    // Mostrar consejo del día
    showDailyAdvice();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Mostrar entrada del día actual si existe
    showJournalForDate(currentDate);
    
    // Configurar animaciones para fechas especiales
    checkSpecialDate(currentDate);
}

// Actualizar fecha actual
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = currentDate.toLocaleDateString('es-ES', options);
}

// Actualizar días restantes
function updateDaysRemaining() {
    const endDate = new Date(2025, 0, 8); // 8 de enero de 2025
    const timeDiff = endDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    const daysElement = document.getElementById('days-remaining');
    daysElement.textContent = daysRemaining > 0 ? daysRemaining : 0;
    
    // Cambiar color según días restantes
    if (daysRemaining <= 7) {
        daysElement.style.color = 'var(--primary-color)';
        daysElement.style.fontWeight = 'bold';
    } else if (daysRemaining <= 14) {
        daysElement.style.color = 'var(--warning-color)';
    }
}

// Generar calendario
function generateCalendar(month, year) {
    const calendar = document.getElementById('calendar');
    const calendarTitle = document.getElementById('calendar-title');
    
    // Limpiar calendario
    calendar.innerHTML = '';
    
    // Configurar título del calendario
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    calendarTitle.textContent = `${monthNames[month]} ${year}`;
    
    // Días de la semana
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    dayNames.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'day-name';
        dayElement.textContent = day;
        calendar.appendChild(dayElement);
    });
    
    // Obtener primer día del mes y cantidad de días
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    // Días vacíos al inicio
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty';
        calendar.appendChild(emptyDay);
    }
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        const date = new Date(year, month, day);
        const dateString = formatDate(date);
        const today = isToday(date);
        const completed = journalData[dateString] ? true : false;
        const special = isSpecialDate(date);
        const future = date > currentDate;
        const disabled = date > currentDate;
        
        // Determinar clases
        let classes = 'day';
        if (today) classes += ' today';
        if (completed) classes += ' completed';
        if (special) classes += ' special';
        if (future) classes += ' future';
        if (disabled) classes += ' disabled';
        
        dayElement.className = classes;
        
        // Número del día
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Eventos/indicadores
        if (special) {
            const eventIndicator = document.createElement('div');
            eventIndicator.className = 'day-events';
            eventIndicator.textContent = specialDates[getMonthDayKey(date)].name;
            dayElement.appendChild(eventIndicator);
        }
        
        // Evento click solo para días no futuros
        if (!future) {
            dayElement.addEventListener('click', () => {
                selectedDate = date;
                showJournalForDate(date);
                updateCalendarSelection();
            });
        }
        
        calendar.appendChild(dayElement);
    }
    
    // Actualizar botones de navegación
    updateNavigationButtons();
}

// Mostrar entrada del diario para una fecha
function showJournalForDate(date) {
    const dateString = formatDate(date);
    const journalDateElement = document.getElementById('journal-date');
    
    // Formatear fecha para mostrar
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    journalDateElement.textContent = date.toLocaleDateString('es-ES', options);
    
    // Cargar datos si existen
    const entry = journalData[dateString];
    
    if (entry) {
        // Calificación del día
        setRating('day-rating', entry.rating, 'day');
        
        // Calificación del almuerzo
        setRating('lunch-rating', entry.lunchRating, 'lunch');
        document.getElementById('lunch-description').value = entry.lunchDescription || '';
        
        // Personas con las que habló
        document.getElementById('people-count').value = entry.peopleCount || 0;
        
        // Texto del diario
        document.getElementById('journal-text').value = entry.text || '';
    } else {
        // Limpiar campos
        setRating('day-rating', 0, 'day');
        setRating('lunch-rating', 0, 'lunch');
        document.getElementById('lunch-description').value = '';
        document.getElementById('people-count').value = 0;
        document.getElementById('journal-text').value = '';
    }
    
    // Actualizar botón de guardar
    const saveButton = document.getElementById('save-entry');
    if (isToday(date) || date < currentDate) {
        saveButton.disabled = false;
        saveButton.textContent = dateString === formatDate(currentDate) ? 'Guardar día' : 'Actualizar día';
    } else {
        saveButton.disabled = true;
        saveButton.textContent = 'Día futuro - No editable';
    }
    
    // Actualizar lista de entradas anteriores
    updatePreviousEntries();
}

// Establecer calificación con estrellas
// Establecer calificación con estrellas - VERSIÓN CORREGIDA
function setRating(inputId, rating, type) {
    const stars = document.querySelectorAll(`[data-${type}]`);
    const color = type === 'day' ? 'var(--warning-color)' : 'var(--success-color)';
    
    stars.forEach(star => {
        const starRating = parseInt(star.getAttribute(`data-${type}`));
        
        if (starRating <= rating) {
            star.classList.add('active');
            star.style.color = color;
        } else {
            star.classList.remove('active');
            star.style.color = '#ddd';
        }
    });
    
    document.getElementById(inputId).value = rating;
}

// Mostrar consejo del día
function showDailyAdvice() {
    const adviceElement = document.getElementById('advice-text');
    const dayOfMonth = currentDate.getDate();
    const month = currentDate.getMonth();
    
    // Consejo especial para Navidad y Año Nuevo
    let adviceIndex;
    if (month === 11 && dayOfMonth >= 24) {
        // Diciembre: del 24 al 31
        adviceIndex = Math.min(dayOfMonth + 15, dailyAdvice.length - 1);
    } else if (month === 0 && dayOfMonth === 1) {
        // 1 de Enero
        adviceIndex = 28;
    } else {
        // Otros días: usar día del mes como índice (cíclico)
        adviceIndex = (dayOfMonth - 1) % dailyAdvice.length;
    }
    
    adviceElement.textContent = dailyAdvice[adviceIndex];
}

// Configurar event listeners
// Configurar event listeners - VERSIÓN ACTUALIZADA
function setupEventListeners() {
    // Navegación del calendario
    document.getElementById('prev-month').addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        generateCalendar(currentMonth, currentYear);
    });
    
    document.getElementById('next-month').addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        generateCalendar(currentMonth, currentYear);
    });
    
    // Estrellas de calificación - INICIALIZAR DESPUÉS DE QUE EL DOM ESTÉ LISTO
    setTimeout(() => {
        setupRatingStars('day-rating', 'rating');
        setupRatingStars('lunch-rating', 'lunch');
    }, 100);
    
    // Contador de personas
    document.getElementById('people-increase').addEventListener('click', () => {
        const peopleCount = document.getElementById('people-count');
        peopleCount.value = parseInt(peopleCount.value) + 1;
        updateJournalDataField('peopleCount', parseInt(peopleCount.value));
    });
    
    document.getElementById('people-decrease').addEventListener('click', () => {
        const peopleCount = document.getElementById('people-count');
        const currentValue = parseInt(peopleCount.value);
        if (currentValue > 0) {
            peopleCount.value = currentValue - 1;
            updateJournalDataField('peopleCount', currentValue - 1);
        }
    });
    
    // Campo de descripción de almuerzo
    document.getElementById('lunch-description').addEventListener('input', (e) => {
        updateJournalDataField('lunchDescription', e.target.value);
    });
    
    // Campo de texto del diario
    document.getElementById('journal-text').addEventListener('input', (e) => {
        updateJournalDataField('text', e.target.value);
    });
    
    // Guardar entrada
    document.getElementById('save-entry').addEventListener('click', saveJournalEntry);
    
    // Limpiar entrada
    document.getElementById('clear-entry').addEventListener('click', () => {
        if (confirm('¿Estás segura de que quieres limpiar la entrada de hoy?')) {
            setRating('day-rating', 0, 'rating');
            setRating('lunch-rating', 0, 'lunch');
            document.getElementById('lunch-description').value = '';
            document.getElementById('people-count').value = 0;
            document.getElementById('journal-text').value = '';
            
            // Limpiar datos en journalData
            const dateString = formatDate(selectedDate);
            if (journalData[dateString]) {
                delete journalData[dateString];
                saveJournalData();
                generateCalendar(currentMonth, currentYear);
            }
        }
    });
}

// Función auxiliar para actualizar datos en tiempo real
function updateJournalDataField(field, value) {
    const dateString = formatDate(selectedDate);
    if (!journalData[dateString]) {
        journalData[dateString] = {
            date: dateString,
            rating: 0,
            lunchRating: 0,
            lunchDescription: '',
            peopleCount: 0,
            text: '',
            timestamp: new Date().toISOString()
        };
    }
    journalData[dateString][field] = value;
}
// Configurar estrellas de calificación
// Configurar estrellas de calificación - VERSIÓN CORREGIDA
function setupRatingStars(inputId, type) {
    const stars = document.querySelectorAll(`[data-${type}]`);
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute(`data-${type}`));
            
            // Actualizar estrellas visualmente
            stars.forEach(s => {
                const sRating = parseInt(s.getAttribute(`data-${type}`));
                
                if (sRating <= rating) {
                    s.classList.add('active');
                    s.style.color = type === 'day' ? 'var(--warning-color)' : 'var(--success-color)';
                } else {
                    s.classList.remove('active');
                    s.style.color = '#ddd';
                }
            });
            
            // Actualizar valor oculto
            document.getElementById(inputId).value = rating;
            
            // También actualizar en journalData si estamos editando una fecha existente
            const dateString = formatDate(selectedDate);
            if (journalData[dateString]) {
                if (type === 'day') {
                    journalData[dateString].rating = rating;
                } else if (type === 'lunch') {
                    journalData[dateString].lunchRating = rating;
                }
            }
        });
        
        // Añadir hover effect
        star.addEventListener('mouseover', () => {
            const rating = parseInt(star.getAttribute(`data-${type}`));
            stars.forEach(s => {
                const sRating = parseInt(s.getAttribute(`data-${type}`));
                if (sRating <= rating) {
                    s.style.color = type === 'day' ? 'var(--warning-color)' : 'var(--success-color)';
                }
            });
        });
        
        star.addEventListener('mouseout', () => {
            const rating = parseInt(document.getElementById(inputId).value);
            stars.forEach(s => {
                const sRating = parseInt(s.getAttribute(`data-${type}`));
                if (sRating > rating) {
                    s.style.color = '#ddd';
                }
            });
        });
    });
}

// Guardar entrada del diario
function saveJournalEntry() {
    const dateString = formatDate(selectedDate);
    
    // Obtener datos del formulario
    const rating = parseInt(document.getElementById('day-rating').value);
    const lunchRating = parseInt(document.getElementById('lunch-rating').value);
    const lunchDescription = document.getElementById('lunch-description').value;
    const peopleCount = parseInt(document.getElementById('people-count').value);
    const text = document.getElementById('journal-text').value;
    
    // Validar que al menos haya una calificación o texto
    if (rating === 0 && lunchRating === 0 && text.trim() === '') {
        alert('Por favor, completa al menos un campo antes de guardar.');
        return;
    }
    
    // Guardar datos
    journalData[dateString] = {
        date: dateString,
        rating: rating,
        lunchRating: lunchRating,
        lunchDescription: lunchDescription,
        peopleCount: peopleCount,
        text: text,
        timestamp: new Date().toISOString()
    };
    
    // Guardar en localStorage
    saveJournalData();
    
    // Mostrar mensaje de confirmación
    const savedMessage = document.getElementById('saved-message');
    savedMessage.style.display = 'flex';
    
    setTimeout(() => {
        savedMessage.style.display = 'none';
    }, 3000);
    
    // Actualizar calendario
    generateCalendar(currentMonth, currentYear);
    
    // Actualizar lista de entradas anteriores
    updatePreviousEntries();
}

// Actualizar lista de entradas anteriores
function updatePreviousEntries() {
    const entriesList = document.getElementById('entries-list');
    
    // Obtener entradas ordenadas por fecha (más reciente primero)
    const sortedEntries = Object.values(journalData)
        .filter(entry => entry.date !== formatDate(selectedDate))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5); // Mostrar solo las 5 más recientes
    
    if (sortedEntries.length === 0) {
        entriesList.innerHTML = '<p class="empty-message">Aún no hay días completados. ¡Comienza escribiendo sobre tu día de hoy!</p>';
        return;
    }
    
    let entriesHTML = '';
    sortedEntries.forEach(entry => {
        const entryDate = new Date(entry.date + 'T00:00:00');
        const dateFormatted = entryDate.toLocaleDateString('es-ES', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
        
        const preview = entry.text.length > 100 
            ? entry.text.substring(0, 100) + '...' 
            : entry.text;
        
        entriesHTML += `
            <div class="entry-item">
                <div class="entry-date">
                    <span>${dateFormatted}</span>
                    <span>${'★'.repeat(entry.rating)}${'☆'.repeat(5 - entry.rating)}</span>
                </div>
                <div class="entry-preview">${preview || 'Sin texto'}</div>
            </div>
        `;
    });
    
    entriesList.innerHTML = entriesHTML;
}

// Funciones de utilidad
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

function isSpecialDate(date) {
    const monthDayKey = getMonthDayKey(date);
    return specialDates.hasOwnProperty(monthDayKey);
}

function getMonthDayKey(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}`;
}

function updateCalendarSelection() {
    // Esta función podría resaltar visualmente el día seleccionado
    const calendarDays = document.querySelectorAll('.day:not(.empty)');
    calendarDays.forEach(day => {
        day.classList.remove('selected');
    });
}

function updateNavigationButtons() {
    const prevButton = document.getElementById('prev-month');
    const nextButton = document.getElementById('next-month');
    
    // Deshabilitar navegación a meses futuros (después de enero 2025)
    const maxDate = new Date(2025, 0, 31); // 31 de enero de 2025
    
    if (currentYear === 2025 && currentMonth === 0) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
    
    // Deshabilitar navegación a meses antes de diciembre 2024
    if (currentYear === 2024 && currentMonth === 11) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }
}

// LocalStorage functions
function saveJournalData() {
    localStorage.setItem('travelJournalData', JSON.stringify(journalData));
}

function loadJournalData() {
    const savedData = localStorage.getItem('travelJournalData');
    if (savedData) {
        journalData = JSON.parse(savedData);
    }
}

// Verificar fecha especial para animaciones
function checkSpecialDate(date) {
    const monthDayKey = getMonthDayKey(date);
    
    if (specialDates[monthDayKey]) {
        const animationType = specialDates[monthDayKey].animation;
        
        // Esperar a que la página cargue para mostrar animaciones
        setTimeout(() => {
            if (animationType === 'snow') {
                startSnowAnimation();
            } else if (animationType === 'fireworks') {
                startFireworksAnimation();
            }
        }, 1000);
    }
}