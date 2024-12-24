// Set wallpaper
const picsumUrl = "https://picsum.photos/1920/1080";
document.getElementById('wallpaper').style.backgroundImage = `url(${picsumUrl})`;


// Search Bar functionality
const searchInput = document.getElementById('search-input');
const searchEngineSelect = document.getElementById('search-engine');
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && searchInput.value.trim()) {
        const query = searchInput.value.trim();
        const engine = searchEngineSelect.value;

        let searchUrl = "";
        switch (engine) {
            case "google":
                searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                break;
            case "Perplexity":
                searchUrl = `https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`;
                break;
            case "ChatGPT":
                searchUrl = `https://chat.openai.com/?q=${encodeURIComponent(query)}`;
                break;
            case "bing":
                searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
                break;
            case "duckduckgo":
                searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
                break;
                YOUR_QUESTION

        }

        window.open(searchUrl, '_blank');
    }
});


// Calendar functionality
const monthYearEl = document.getElementById('month-year');
const weekdaysEl = document.getElementById('calendar-weekdays');
const daysEl = document.getElementById('calendar-days');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
let currentDate = new Date();

function generateCalendar() {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Update the month-year header
  monthYearEl.innerText = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

  // Generate weekdays
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekdaysEl.innerHTML = weekdays.map(day => `<span>${day}</span>`).join('');

  // Generate the days of the month
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

  let daysHTML = '';
  for (let i = 0; i < firstDayOfMonth; i++) {
    daysHTML += '<span></span>';
  }

  for (let day = 1; day <= lastDateOfMonth; day++) {
    const isToday = day === currentDate.getDate() && month === currentDate.getMonth();
    daysHTML += `<span class="${isToday ? 'today' : ''}">${day}</span>`;
  }

  daysEl.innerHTML = daysHTML;
}

prevMonthBtn.addEventListener('click', function () {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar();
});

nextMonthBtn.addEventListener('click', function () {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar();
});

generateCalendar();

const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent default form submission
    const taskValue = taskInput.value.trim();
    
    if (taskValue) {
      const li = document.createElement('li');
      li.textContent = taskValue;

      // Add click event to remove the task when clicked
      li.addEventListener('click', function () {
        taskList.removeChild(li);
      });

      taskList.appendChild(li);
      taskInput.value = ''; // Clear input
    }
  }
});

async function getRandomQuote() {
  // Replace with your actual raw URL
  const quotesUrl = 'https://raw.githubusercontent.com/Nirmalj000/randomQuotes/refs/heads/main/quotes-filtered.json';
  
  try {
      const response = await fetch(quotesUrl);
      const quotes = await response.json();  // Parse the JSON
      
      // Check if quotes array is empty or undefined
      if (!quotes || quotes.length === 0) {
          document.getElementById('quote').textContent = "No quotes found!";
          return;
      }

      // Randomly select a quote
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      
      // Ensure that 'quote' exists in the object
      if (randomQuote && randomQuote.quote) {
          document.getElementById('quote').textContent = `"${randomQuote.quote}"`;
      } else {
          document.getElementById('quote').textContent = "Quote data is missing!";
      }

  } catch (error) {
      console.error("Error fetching quote:", error);
      document.getElementById('quote').textContent = "Failed to load quote.";
  }
}
window.onload = getRandomQuote;
