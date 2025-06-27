function searchProfile() {
	const username = document.getElementById('username').value;
	if (username.length < 3) {
		return;
	}
	const url = `https://api.github.com/users/${username}`;
	fetch(url)
	.then(response => {
		if (!response.ok) {
			throw new Error('User not found');
		}
		return response.json();
	})
	.then(data => {
		document.getElementById('profile')?.remove();
		const div = document.createElement('div');
		div.id = 'profile';
		div.className = 'profile';
		div.innerHTML = `
			<div class="profile-header">
				<img src="${data.avatar_url}" alt="${data.login}" width="100">
				<h2>${data.name || data.login}</h2>
			</div>
			<p class="profile-bio">${data.bio || 'No bio available'}</p>
			<div class="profile-details">
				<p>Followers: ${data.followers}</p>
				<p>Following: ${data.following}</p>
				<p>Public Repos: ${data.public_repos}</p>
				<p>Hireable: ${data.hireable ? 'Yes' : 'No'}</p>
			</div>
			<a href="${data.html_url}" target="_blank" class="profile-link">View Profile on GitHub</a>
		`;
		document.getElementById('container').appendChild(div);
		console.log(data)
	})
	.catch(error => {
		alert(error.message);
	});
}