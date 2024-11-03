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
		{ text: 'Voucher giảm 10%', percent: 10 / 100 },
		{ text: '05 túi mù', percent: 20 / 100 },
		{ text: 'Free 01 ly size M', percent: 5 / 100 },
		{ text: '01 Gấu MiGo', percent: 5 / 100 },
		{ text: 'Free 01 ly size S', percent: 10 / 100 },
		{ text: 'Chúc bạn may mắn lần sau', percent: 50 / 100 },
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

	  // Tạo hiệu ứng quay chậm tự động
	  let slowRotateInterval;
	  const startSlowRotation = () => {
		  let angle = 0;
		  slowRotateInterval = setInterval(() => {
			  angle += 0.1; // Tốc độ quay chậm
			  wheel.style.transform = `rotate(${angle}deg)`;
		  }, 16); // Cập nhật mỗi ~16ms để quay mượt
	  };

	const start = () => {
		showMsg.innerHTML = '';
		clearInterval(slowRotateInterval); // Dừng quay chậm
		isRotating = true;
		const random = Math.random();
		const gift = getGift(random);
		currentRotate += 360 * 10;
		rotateWheel(currentRotate, gift.index);
		showGift(gift);
	};

	const rotateWheel = (currentRotate, index) => {
		wheel.style.transition = `transform ${timeRotate}ms cubic-bezier(0.075, 0.82, 0.165, 1)`;
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
			popupMsg.innerHTML = `Chúc mừng bạn đã nhận được:<br><strong>"${gift.text}"</strong>`;
			popup.style.display = 'flex';
			createFireworks();
			startSlowRotation(); // Bắt đầu quay chậm lại sau khi hiển thị phần thưởng
			clearTimeout(timer);
		}, timeRotate);
	};

	btnWheel.addEventListener('click', () => {
		if (!isRotating) {
			wheel.style.transition = 'none'; // Tắt transition để tránh các lỗi khi quay lại
			start(); // Bắt đầu quay
		}
	});
	closePopupBtn.addEventListener('click', () => {
		popup.style.display = 'none';
	});
	startSlowRotation(); // Bắt đầu quay chậm ngay từ khi tải trang
})();
// Hiệu ứng tuyết rơi
const createSnowflake = () => {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // Thiết lập kích thước ngẫu nhiên cho hạt tuyết
    const size = Math.random() * 10 + 5; // Kích thước từ 5px đến 15px
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    
    // Thiết lập vị trí ngẫu nhiên ở đầu màn hình
    snowflake.style.left = `${Math.random() * 100}vw`;
    
    // Thêm hạt tuyết vào container
    document.querySelector('.snow-container').appendChild(snowflake);
    
    // Thêm hoạt ảnh cho hạt tuyết
    snowflake.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`; // Thời gian rơi từ 2s đến 5s
    
    // Khi hạt tuyết rơi xong, xóa nó khỏi DOM
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });
};

// Tạo hạt tuyết mới mỗi giây
setInterval(createSnowflake, 300);
// Tạo hiếu ứng pháo hoa
const createFireworks = () => {
    const fireworksContainer = document.querySelector('.fireworks-container');
    
    // Xóa pháo hoa cũ
    fireworksContainer.innerHTML = '';
    
    for (let i = 0; i < 50; i++) { // Tạo nhiều pháo hoa
        const firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.left = `${Math.random() * 100}vw`;
        firework.style.top = `${Math.random() * 100}vh`;
        
        fireworksContainer.appendChild(firework);
        
        // Tạo các hạt cho mỗi pháo hoa
        for (let j = 0; j < 10; j++) { // Số lượng hạt mỗi pháo hoa
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Ngẫu nhiên hướng di chuyển
            particle.style.setProperty('--x', `${(Math.random() - 0.5) * 300}px`);
            particle.style.setProperty('--y', `${(Math.random() - 0.5) * 300}px`);
            
            firework.appendChild(particle);
        }
    }
};
