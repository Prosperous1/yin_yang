export function enableHorizontalScroll(container) {
	let isDown = false;
	let startX;
	let scrollLeft;

	const handleMouseDown = (e) => {
		isDown = true;
		container.classList.add('active');
		startX = e.pageX - container.offsetLeft;
		scrollLeft = container.scrollLeft;
	};

	const handleMouseLeave = () => {
		isDown = false;
		container.classList.remove('active');
	};

	const handleMouseUp = () => {
		isDown = false;
		container.classList.remove('active');
	};

	const handleMouseMove = (e) => {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - container.offsetLeft;
		const walk = (x - startX) * 1.0; // Чувствительность прокрутки
		container.scrollLeft = scrollLeft - walk;
	};

	container.addEventListener('mousedown', handleMouseDown);
	container.addEventListener('mouseleave', handleMouseLeave);
	container.addEventListener('mouseup', handleMouseUp);
	container.addEventListener('mousemove', handleMouseMove);

	return () => {
		container.removeEventListener('mousedown', handleMouseDown);
		container.removeEventListener('mouseleave', handleMouseLeave);
		container.removeEventListener('mouseup', handleMouseUp);
		container.removeEventListener('mousemove', handleMouseMove);
	};
}
