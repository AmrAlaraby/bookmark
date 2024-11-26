// Select elements
var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var addBookmarkButton = document.getElementById("addBookmark");
var errorMessage = document.getElementById("errorMessage");
var bookmarksTable = document.getElementById("bookmarksTable").querySelector("tbody");

// Store bookmarks
var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []; // Load from localStorage or initialize

// Validate URL
function isValidURL(url) {
  var regex = /^(https?:\/\/)[a-zA-Z0-9\-\.]+\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
  return regex.test(url);
}

// Add bookmark
function addBookmark() {
  var siteName = siteNameInput.value.trim();
  var siteURL = siteURLInput.value.trim();

  // Validate inputs
  if (!siteName || !siteURL) {
    errorMessage.textContent = "Please fill in both fields.";
    return;
  }

  if (!isValidURL(siteURL)) {
    errorMessage.textContent = "Invalid URL. Please enter a valid URL (e.g., https://example.com).";
    return;
  }

  if (bookmarks.some(bookmark => bookmark.name === siteName)) {
    errorMessage.textContent = "Bookmark with this name already exists.";
    return;
  }

  errorMessage.textContent = ""; // Clear error

  // Add to bookmarks
  bookmarks.push({ name: siteName, url: siteURL });

  // Save to localStorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Re-render bookmarks
  renderBookmarks();

  // Clear inputs
  siteNameInput.value = "";
  siteURLInput.value = "";
}

// Render bookmarks
function renderBookmarks() {
  var tableContent = ""; // Initialize empty string

  for (var i = 0; i < bookmarks.length; i++) {
    tableContent += `
      <tr>
        <td>${i + 1}</td>
        <td>${bookmarks[i].name}</td>
        <td><a href="${bookmarks[i].url}" target="_blank">Visit</a></td>
        <td><button onclick="deleteBookmark(${i})">Delete</button></td>
      </tr>
    `;
  }

  bookmarksTable.innerHTML = tableContent; // Update table content
}

// Delete bookmark
function deleteBookmark(index) {
  bookmarks.splice(index, 1);

  // Update localStorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Re-render bookmarks
  renderBookmarks();
}

// Event listeners
addBookmarkButton.addEventListener("click", addBookmark);

// Load bookmarks on page load
renderBookmarks();
