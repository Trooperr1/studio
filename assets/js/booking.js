// Booking System JavaScript

let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;

// Available time slots (business hours: 9 AM - 5 PM)
const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
];

// Generate calendar
function generateCalendar(year, month) {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');

    // Clear previous calendar
    calendarGrid.innerHTML = '';

    // Set month name
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    currentMonthElement.textContent = `${monthNames[month]} ${year}`;

    // Add day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.style.cssText = `
            color: var(--medium-gray);
            text-align: center;
            padding: 0.5rem;
            font-weight: 600;
            font-size: 0.9rem;
        `;
        calendarGrid.appendChild(dayHeader);
    });

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarGrid.appendChild(emptyCell);
    }

    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        const cellDate = new Date(year, month, day);
        cellDate.setHours(0, 0, 0, 0);

        // Check if date is in the past
        const isPast = cellDate < today;

        // Check if it's a weekend (Saturday = 6, Sunday = 0)
        const isWeekend = cellDate.getDay() === 0 || cellDate.getDay() === 6;

        dayCell.textContent = day;
        dayCell.style.cssText = `
            padding: 1rem;
            text-align: center;
            border-radius: 10px;
            cursor: ${isPast || isWeekend ? 'not-allowed' : 'pointer'};
            color: ${isPast || isWeekend ? 'var(--dark-gray)' : 'var(--white)'};
            background: ${isPast || isWeekend ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.05)'};
            border: 1px solid ${isPast || isWeekend ? 'transparent' : 'var(--border-color)'};
            transition: all 0.3s;
            opacity: ${isPast || isWeekend ? '0.4' : '1'};
        `;

        // Add hover effect for available dates
        if (!isPast && !isWeekend) {
            dayCell.addEventListener('mouseenter', () => {
                dayCell.style.background = 'rgba(255, 255, 255, 0.15)';
                dayCell.style.borderColor = 'var(--white)';
            });

            dayCell.addEventListener('mouseleave', () => {
                if (!dayCell.classList.contains('selected')) {
                    dayCell.style.background = 'rgba(255, 255, 255, 0.05)';
                    dayCell.style.borderColor = 'var(--border-color)';
                }
            });

            // Add click handler
            dayCell.addEventListener('click', () => {
                selectDate(year, month, day, dayCell);
            });
        } else {
            // Add tooltip for unavailable dates
            dayCell.title = isWeekend ? 'Weekends unavailable' : 'Past date unavailable';
        }

        calendarGrid.appendChild(dayCell);
    }
}

// Select date
function selectDate(year, month, day, dayCell) {
    // Remove previous selection
    const previousSelected = document.querySelector('.calendar-grid .selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
        previousSelected.style.background = 'rgba(255, 255, 255, 0.05)';
        previousSelected.style.borderColor = 'var(--border-color)';
    }

    // Set new selection
    dayCell.classList.add('selected');
    dayCell.style.background = 'var(--white)';
    dayCell.style.color = 'var(--black)';
    dayCell.style.borderColor = 'var(--white)';

    // Store selected date
    selectedDate = new Date(year, month, day);
    document.getElementById('selectedDate').value = selectedDate.toISOString().split('T')[0];

    // Show time slots
    generateTimeSlots();
    document.getElementById('timeSlotContainer').style.display = 'block';

    // Reset time selection
    selectedTime = null;
    document.getElementById('selectedTime').value = '';
    document.getElementById('selectedDateTime').style.display = 'none';
    updateSubmitButton();
}

// Generate time slots
function generateTimeSlots() {
    const timeSlotsContainer = document.getElementById('timeSlots');
    timeSlotsContainer.innerHTML = '';

    timeSlots.forEach(time => {
        const timeSlot = document.createElement('button');
        timeSlot.type = 'button';
        timeSlot.textContent = time;
        timeSlot.style.cssText = `
            padding: 1rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            color: var(--white);
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 600;
        `;

        timeSlot.addEventListener('mouseenter', () => {
            if (!timeSlot.classList.contains('selected')) {
                timeSlot.style.background = 'rgba(255, 255, 255, 0.15)';
                timeSlot.style.borderColor = 'var(--white)';
            }
        });

        timeSlot.addEventListener('mouseleave', () => {
            if (!timeSlot.classList.contains('selected')) {
                timeSlot.style.background = 'rgba(255, 255, 255, 0.05)';
                timeSlot.style.borderColor = 'var(--border-color)';
            }
        });

        timeSlot.addEventListener('click', () => {
            selectTimeSlot(time, timeSlot);
        });

        timeSlotsContainer.appendChild(timeSlot);
    });
}

// Select time slot
function selectTimeSlot(time, timeSlotElement) {
    // Remove previous selection
    const previousSelected = document.querySelector('#timeSlots .selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
        previousSelected.style.background = 'rgba(255, 255, 255, 0.05)';
        previousSelected.style.borderColor = 'var(--border-color)';
    }

    // Set new selection
    timeSlotElement.classList.add('selected');
    timeSlotElement.style.background = 'var(--white)';
    timeSlotElement.style.color = 'var(--black)';
    timeSlotElement.style.borderColor = 'var(--white)';

    // Store selected time
    selectedTime = time;
    document.getElementById('selectedTime').value = time;

    // Update display
    updateSelectedDateTime();
    updateSubmitButton();
}

// Update selected date/time display
function updateSelectedDateTime() {
    if (selectedDate && selectedTime) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = selectedDate.toLocaleDateString('en-US', options);

        document.getElementById('displayDateTime').textContent = `${dateString} at ${selectedTime}`;
        document.getElementById('selectedDateTime').style.display = 'block';
    }
}

// Update submit button state
function updateSubmitButton() {
    const submitButton = document.getElementById('submitBooking');
    const allFieldsFilled = selectedDate && selectedTime &&
                           document.getElementById('service').value &&
                           document.getElementById('bookingName').value &&
                           document.getElementById('bookingEmail').value &&
                           document.getElementById('bookingPhone').value;

    submitButton.disabled = !allFieldsFilled;
    submitButton.style.opacity = allFieldsFilled ? '1' : '0.5';
    submitButton.style.cursor = allFieldsFilled ? 'pointer' : 'not-allowed';
}

// Navigation handlers
document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    // Don't allow going to past months
    const today = new Date();
    if (currentDate < new Date(today.getFullYear(), today.getMonth(), 1)) {
        currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
        return;
    }
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

// Form validation on input
const formFields = ['service', 'bookingName', 'bookingEmail', 'bookingPhone'];
formFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
        field.addEventListener('input', updateSubmitButton);
        field.addEventListener('change', updateSubmitButton);
    }
});

// Form submission
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
        showNotification('Please select a date and time for your consultation', 'error');
        return;
    }

    // Get form data
    const formData = {
        service: document.getElementById('service').value,
        meetingType: document.getElementById('meetingType').value,
        name: document.getElementById('bookingName').value,
        email: document.getElementById('bookingEmail').value,
        phone: document.getElementById('bookingPhone').value,
        company: document.getElementById('bookingCompany').value,
        message: document.getElementById('bookingMessage').value,
        date: document.getElementById('selectedDate').value,
        time: selectedTime
    };

    // Here you would typically send this to your backend
    console.log('Booking Data:', formData);

    // Show success message
    showNotification('Booking confirmed! You will receive a confirmation email shortly.', 'success');

    // Reset form after 2 seconds
    setTimeout(() => {
        document.getElementById('bookingForm').reset();
        selectedDate = null;
        selectedTime = null;
        document.getElementById('selectedDateTime').style.display = 'none';
        document.getElementById('timeSlotContainer').style.display = 'none';

        // Remove selections
        const selectedElements = document.querySelectorAll('.selected');
        selectedElements.forEach(el => {
            el.classList.remove('selected');
            el.style.background = 'rgba(255, 255, 255, 0.05)';
            el.style.color = 'var(--white)';
            el.style.borderColor = 'var(--border-color)';
        });

        updateSubmitButton();
    }, 2000);
});

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Initialize calendar on page load
document.addEventListener('DOMContentLoaded', () => {
    // Don't show past months
    const today = new Date();
    if (currentDate < today) {
        currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
    }

    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});
