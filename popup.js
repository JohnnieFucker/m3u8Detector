chrome.runtime.sendMessage({ msg: 'getUrls' }, response => {
	// console.log(response);
	const list = document.getElementById('requests');
	response.data.forEach(req => {
		const item = document.createElement('li');
		item.innerHTML = `<div class="divContent">
                            <div>${req.url}|||${req.title}</div>
                          </div>
                          <div class="btn">copy</div>`;
		list.appendChild(item);
	});
	const buttons = document.querySelectorAll('.btn');
	buttons.forEach(button => {
		button.addEventListener('click', event => {
			console.log('copyItem');
			// 使用 event.target 来获取触发事件的元素
			const btn = event.target; // 获取实际点击的按钮
			const ele = btn.closest('li').querySelector('.divContent'); // 找到按钮所在的列表项内的 divContent
			const textToCopy = ele.textContent; // 获取要复制的文本
			navigator.clipboard.writeText(textToCopy).then(
				() => {
					btn.textContent = 'done';
					// alert('文本已复制');
				},
				err => {
					// console.error('无法复制文本: ', err);
				}
			);
		});
	});
});
