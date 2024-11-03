(() => {
	const $ = document.querySelector.bind(document);

	let timeRotate = 7000; // 7 giây
	let currentRotate = 0;
	let isRotating = false;
	const wheel = $('.wheel');
	const btnWheel = $('.btn--wheel');
	const showMsg = $('.msg');
	const popup = $('.popup');
	const popupMsg = $('.popup-msg');
	const closePopupBtn = $('.close-popup');

	const listGift = [
		{ text: 'I phone 13', percent: 1 / 100 },
		{ text: 'Siêu xe', percent: 0 / 100 },
		{ text: '1tr vnd', percent: 0 / 100 },
		{ text: 'Khóa học html-css free', percent: 0 / 100 },
		{ text: 'Laptop', percent: 0 / 100 },
		{ text: 'Một cái like', percent: 99 / 100 },
		{ text: 'Khóa học js free', percent: 0 / 100 },
		{ text: 'Áo khoác Gucci', percent: 0 / 100 },
	];

	const size = listGift.length;
	const rotate = 360 / size;
	const skewY = 90 - rotate;

	listGift.map((item, index) => {
		const elm = document.createElement('li');
		elm.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;
		if (index % 2 == 0) {
			elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);" class="text text-1">
				<b>${item.text}</b>
			</p>`;
		} else {
			elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);" class="text text-2">
				<b>${item.text}</b>
			</p>`;
		}
		wheel.appendChild(elm);
	});

	const start = () => {
		showMsg.innerHTML = '';
		isRotating = true;
		const random = Math.random();
		const gift = getGift(random);
		currentRotate += 360 * 10;
		rotateWheel(currentRotate, gift.index);
		showGift(gift);
	};

	const rotateWheel = (currentRotate, index) => {
		wheel.style.transform = `rotate(${currentRotate - index * rotate - rotate / 2}deg)`;
	};

	const getGift = randomNumber => {
		let currentPercent = 0;
		let list = [];
		listGift.forEach((item, index) => {
			currentPercent += item.percent;
			if (randomNumber <= currentPercent) {
				list.push({ ...item, index });
			}
		});
		return list[0];
	};

	const showGift = gift => {
		let timer = setTimeout(() => {
			isRotating = false;
			popupMsg.textContent = `Chúc mừng bạn đã nhận được "${gift.text}"`;
			popup.style.display = 'flex';
			clearTimeout(timer);
		}, timeRotate);
	};

	btnWheel.addEventListener('click', () => {
		!isRotating && start();
	});

	closePopupBtn.addEventListener('click', () => {
		popup.style.display = 'none';
	});
})();
