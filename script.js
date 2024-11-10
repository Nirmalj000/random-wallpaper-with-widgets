const picsumUrl = "https://picsum.photos/2560/1440";
document.getElementById('wallpaper').style.backgroundImage = `url(${picsumUrl})`;

function updateClock() {
  const now = new Date();

  // Get hours, minutes, and seconds
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  // Format time to 12-hour format with AM/PM
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Format the clock time
  const timeString = `${hours}:${minutes}:${seconds} ${ampm} IST`;

  // Update the clock display
  document.getElementById('clock').innerText = timeString;
}

setInterval(updateClock, 1000);
updateClock();


// Task List Management
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(task => tasks.push(task.innerText));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(text => {
    const task = document.createElement('li');
    task.innerText = text;
    task.addEventListener('click', () => {
      task.remove();
      saveTasks();
    });
    taskList.appendChild(task);
  });
}

taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && taskInput.value.trim() !== '') {
    const task = document.createElement('li');
    task.innerText = taskInput.value;
    task.addEventListener('click', () => {
      task.remove();
      saveTasks();
    });
    taskList.appendChild(task);
    taskInput.value = '';
    saveTasks();
  }
});

loadTasks();

// Calendar Functionality
const monthYearElement = document.getElementById('month-year');
const calendarWeekdaysElement = document.getElementById('calendar-weekdays');
const calendarDaysElement = document.getElementById('calendar-days');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

let currentDate = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  // Display month and year
  monthYearElement.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

  // Get the first day of the month
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const numberOfDaysInMonth = lastDayOfMonth.getDate();

  // Get the weekday of the first day of the month
  const firstDayWeekday = firstDayOfMonth.getDay();

  // Clear the previous calendar days
  calendarWeekdaysElement.innerHTML = '';
  calendarDaysElement.innerHTML = '';

  // Add weekdays row
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekdays.forEach(day => {
    const weekdayElement = document.createElement('span');
    weekdayElement.textContent = day;
    calendarWeekdaysElement.appendChild(weekdayElement);
  });

  // Add empty days before the first day of the month
  for (let i = 0; i < firstDayWeekday; i++) {
    const emptyDay = document.createElement('span');
    calendarDaysElement.appendChild(emptyDay);
  }

  // Add actual days of the month
  for (let day = 1; day <= numberOfDaysInMonth; day++) {
    const dayElement = document.createElement('span');
    dayElement.textContent = day;

    // Check if it's today
    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      dayElement.id = 'today';  // Mark today
    }

    calendarDaysElement.appendChild(dayElement);
  }
}

function changeMonth(offset) {
  currentDate.setMonth(currentDate.getMonth() + offset);
  renderCalendar(currentDate);
}

prevMonthButton.addEventListener('click', () => changeMonth(-1));
nextMonthButton.addEventListener('click', () => changeMonth(1));

renderCalendar(currentDate);
