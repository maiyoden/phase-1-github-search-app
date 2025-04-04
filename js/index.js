const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const userResults = document.getElementById('user-results');
const repoResults = document.getElementById('repo-results');

const GITHUB_API_URL = "https://api.github.com";
const HEADERS = {
    Accept: "application/vnd.github.v3+json"
};

// Event listener for the search form
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        searchUsers(query);
    }
});

// Function to search for users
function searchUsers(query) {
    fetch(`${GITHUB_API_URL}/search/users?q=${query}`, { headers: HEADERS })
        .then(response => response.json())
        .then(data => {
            displayUsers(data.items);
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Function to display users
function displayUsers(users) {
    userResults.innerHTML = ''; // Clear previous results
    repoResults.innerHTML = ''; // Clear previous repo results

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';

        const avatar = document.createElement('img');
        avatar.src = user.avatar_url;
        avatar.alt = `${user.login}'s avatar`;
        avatar.className = 'avatar';

        const username = document.createElement('h2');
        username.textContent = user.login;

        const profileLink = document.createElement('a');
        profileLink.href = user.html_url;
        profileLink.target = '_blank';
        profileLink.textContent = 'View Profile';

        userCard.appendChild(avatar);
        userCard.appendChild(username);
        userCard.appendChild(profileLink);
        userCard.addEventListener('click', () => {
            fetchUserRepos(user.login);
        });

        userResults.appendChild(userCard);
    });
}

// Function to fetch repositories for a user
function fetchUserRepos(username) {
    fetch(`${GITHUB_API_URL}/users/${username}/repos`, { headers: HEADERS })
        .then(response => response.json())
        .then(repos => {
            displayRepos(repos);
        })
        .catch(error => console.error('Error fetching repositories:', error));
}

// Function to display repositories
function displayRepos(repos) {
    repoResults.innerHTML = ''; // Clear previous repo results

    repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.className = 'repo-card';

        const repoName = document.createElement('h3');
        repoName.textContent = repo.name;

        const repoLink = document.createElement('a');
        repoLink.href = repo.html_url;
        repoLink.target = '_blank';
        repoLink.textContent = 'View Repository';

        repoCard.appendChild(repoName);
        repoCard.appendChild(repoLink);
        repoResults.appendChild(repoCard);
    });
}