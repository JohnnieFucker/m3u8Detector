chrome.runtime.sendMessage({ msg: 'getUrls' }, response => {
	console.log(response);
	const list = document.getElementById('requests');
	response.data.forEach(req => {
		const item = document.createElement('li');
		item.textContent = `opt.url = '${req.url}';\n
                            opt.filmName = '${req.title}';`;
		list.appendChild(item);
	});
});
