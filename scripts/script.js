jQuery(document).ready(function() {
    let container = document.getElementById('container');
    let dragArea = document.getElementById('drag-area');
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let acceleration = 1;
    let friction = 0.95;

    // bootstrap
    if (!container || 1) {
        const widgetContainer = document.querySelector('.big-scrollable .elementor-widget-container');
        container = document.createElement('div');
        dragArea = document.createElement('div');
        container.id = "container";
        dragArea.id = "drag-area";

        dragArea.innerHTML = widgetContainer.innerHTML;


        widgetContainer.innerHTML = '';
        container.appendChild(dragArea);
        widgetContainer.appendChild(container);
    }


    container.addEventListener('mousedown', startDrag);
    container.addEventListener('mousemove', drag);
    container.addEventListener('mouseup', stopDrag);

    container.addEventListener('touchstart', startDrag);
    container.addEventListener('touchmove', drag);
    container.addEventListener('touchend', stopDrag);

    function startDrag(e) {
        isDragging = true;
        lastX = e.clientX || e.touches[0].clientX;
        lastY = e.clientY || e.touches[0].clientY;
        container.style.cursor = "grabbing";
    }

    function drag(e) {
        if (isDragging) {

            let currentX = e.clientX || e.touches[0].clientX;
            let currentY = e.clientY || e.touches[0].clientY;
            let deltaX = currentX - lastX;
            let deltaY = currentY - lastY;

            velocityX += deltaX * acceleration;
            velocityY += deltaY * acceleration;

            velocityX = Math.min(Math.max(velocityX, -dragArea.getBoundingClientRect().width + container.getBoundingClientRect().width), 0);
            velocityY = Math.min(Math.max(velocityY, -dragArea.getBoundingClientRect().height + container.getBoundingClientRect().height), 0);

            lastX = currentX;
            lastY = currentY;

            dragArea.style.transform = `translate(${velocityX}px, ${velocityY}px)`;

            e.preventDefault();
        }
    }

    function stopDrag() {
        isDragging = false;

        container.style.cursor = "grab"
    }


})