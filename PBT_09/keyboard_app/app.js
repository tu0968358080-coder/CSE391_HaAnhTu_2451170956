const mockImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60", title: "Thung lũng Yosemite rộng lớn" },
    { id: 2, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60", title: "Sương mù ban mai trên đồi xanh" },
    { id: 3, src: "https://images.unsplash.com/photo-1472214222541-d510753a8707?w=800&auto=format&fit=crop&q=60", title: "Cánh đồng hoàng hôn rực rỡ" },
    { id: 4, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=60", title: "Ánh nắng len lỏi rừng sồi" },
    { id: 5, src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=60", title: "Cây cầu gỗ bắc qua suối nhỏ" },
    { id: 6, src: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&auto=format&fit=crop&q=60", title: "Bình minh rực cháy trên bãi biển" },
    { id: 7, src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=60", title: "Hành trình leo núi khám phá đỉnh cao" },
    { id: 8, src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop&q=60", title: "Toàn cảnh thảm thực vật từ trên cao" },
    { id: 9, src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&auto=format&fit=crop&q=60", title: "Ngọn núi tuyết phản chiếu mặt hồ" }
];

const commands = [
    { id: "next-img", name: "Chuyển đến ảnh kế tiếp", action: () => nextImage(), hint: "Right Arrow" },
    { id: "prev-img", name: "Quay lại ảnh phía trước", action: () => prevImage(), hint: "Left Arrow" },
    { id: "toggle-slide", name: "Bật / Tắt Slideshow tự động", action: () => toggleSlideshow(), hint: "Space" },
    { id: "toggle-theme", name: "Chuyển đổi giao diện Sáng / Tối", action: () => toggleTheme(), hint: "" },
    { id: "reset-gallery", name: "Quay về ảnh đầu tiên (Ảnh 1)", action: () => jumpToImage(0), hint: "1" }
];

let currentIndex = 0;
let slideshowInterval = null;
let filteredCommands = [...commands];
let selectedCommandIndex = 0;
let lastActiveElement = null;

const mainImage = document.getElementById("mainImage");
const imageCaption = document.getElementById("imageCaption");
const imageIndexBadge = document.getElementById("imageIndexBadge");
const thumbnailList = document.getElementById("thumbnailList");
const galleryViewer = document.getElementById("galleryViewer");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playPauseBtn = document.getElementById("playPauseBtn");

const commandPalette = document.getElementById("commandPalette");
const paletteInput = document.getElementById("paletteInput");
const paletteResults = document.getElementById("paletteResults");

function initGallery() {
    thumbnailList.innerHTML = "";
    mockImages.forEach((img, idx) => {
        const btn = document.createElement("button");
        btn.classList.add("thumb-item");
        btn.setAttribute("role", "option");
        btn.setAttribute("aria-selected", idx === currentIndex ? "true" : "false");
        btn.setAttribute("aria-label", `Xem ảnh ${idx + 1}: ${img.title}`);
        
        const thumbImg = document.createElement("img");
        thumbImg.src = img.src;
        thumbImg.alt = "";
        
        btn.appendChild(thumbImg);
        thumbnailList.appendChild(btn);

        btn.addEventListener("click", () => {
            jumpToImage(idx);
            galleryViewer.focus();
        });
    });
    updateGalleryViewer();
}

function updateGalleryViewer() {
    const currentImg = mockImages[currentIndex];
    mainImage.src = currentImg.src;
    mainImage.alt = currentImg.title;
    imageCaption.textContent = currentImg.title;
    imageIndexBadge.textContent = `${currentIndex + 1} / ${mockImages.length}`;

    const thumbs = thumbnailList.querySelectorAll(".thumb-item");
    thumbs.forEach((thumb, idx) => {
        if (idx === currentIndex) {
            thumb.classList.add("active");
            thumb.setAttribute("aria-selected", "true");
        } else {
            thumb.classList.remove("active");
            thumb.setAttribute("aria-selected", "false");
        }
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % mockImages.length;
    updateGalleryViewer();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + mockImages.length) % mockImages.length;
    updateGalleryViewer();
}

function jumpToImage(idx) {
    if (idx >= 0 && idx < mockImages.length) {
        currentIndex = idx;
        updateGalleryViewer();
    }
}

function toggleSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        playPauseBtn.textContent = "▶ Play";
    } else {
        playPauseBtn.textContent = "⏸ Pause";
        slideshowInterval = setInterval(() => {
            nextImage();
        }, 3000);
    }
}

function toggleTheme() {
    document.body.classList.toggle("light-theme");
}

function openCommandPalette() {
    lastActiveElement = document.activeElement;
    commandPalette.setAttribute("aria-hidden", "false");
    paletteInput.value = "";
    selectedCommandIndex = 0;
    filterPaletteCommands();
    paletteInput.focus();
}

function closeCommandPalette() {
    commandPalette.setAttribute("aria-hidden", "true");
    if (lastActiveElement) {
        lastActiveElement.focus();
    }
}

function filterPaletteCommands() {
    const query = paletteInput.value.trim().toLowerCase();
    filteredCommands = commands.filter(cmd => cmd.name.toLowerCase().includes(query));
    
    if (selectedCommandIndex >= filteredCommands.length) {
        selectedCommandIndex = Math.max(0, filteredCommands.length - 1);
    }
    renderPaletteResults();
}

function renderPaletteResults() {
    paletteResults.innerHTML = "";
    if (filteredCommands.length === 0) {
        const noResult = document.createElement("li");
        noResult.style.padding = "1rem";
        noResult.style.color = "var(--text-muted)";
        noResult.textContent = "Không tìm thấy lệnh hợp lệ";
        paletteResults.appendChild(noResult);
        return;
    }

    filteredCommands.forEach((cmd, idx) => {
        const li = document.createElement("li");
        li.classList.add("palette-item");
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", idx === selectedCommandIndex ? "true" : "false");
        
        if (idx === selectedCommandIndex) {
            li.classList.add("selected");
        }

        const nameSpan = document.createElement("span");
        nameSpan.textContent = cmd.name;

        li.appendChild(nameSpan);

        if (cmd.hint) {
            const hintSpan = document.createElement("span");
            hintSpan.classList.add("shortcut-hint");
            hintSpan.textContent = cmd.hint;
            li.appendChild(hintSpan);
        }

        paletteResults.appendChild(li);
        
        li.addEventListener("click", () => {
            selectedCommandIndex = idx;
            executeSelectedCommand();
        });
    });
}

function executeSelectedCommand() {
    if (filteredCommands[selectedCommandIndex]) {
        filteredCommands[selectedCommandIndex].action();
        closeCommandPalette();
    }
}

window.addEventListener("keydown", function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (commandPalette.getAttribute("aria-hidden") === "true") {
            openCommandPalette();
        } else {
            closeCommandPalette();
        }
        return;
    }

    if (commandPalette.getAttribute("aria-hidden") === "false") {
        if (e.key === "Escape") {
            e.preventDefault();
            closeCommandPalette();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex + 1) % filteredCommands.length;
            renderPaletteResults();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
            renderPaletteResults();
        } else if (e.key === "Enter") {
            e.preventDefault();
            executeSelectedCommand();
        }
        return;
    }

    if (document.activeElement === galleryViewer || galleryViewer.contains(document.activeElement) || document.activeElement === document.body) {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            nextImage();
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            prevImage();
        } else if (e.key === " ") {
            e.preventDefault();
            toggleSlideshow();
        } else if (e.key >= "1" && e.key <= "9") {
            const index = parseInt(e.key) - 1;
            if (index < mockImages.length) {
                e.preventDefault();
                jumpToImage(index);
            }
        }
    }
});

paletteInput.addEventListener("input", filterPaletteCommands);

prevBtn.addEventListener("click", nextImage);
nextBtn.addEventListener("click", prevImage);
playPauseBtn.addEventListener("click", toggleSlideshow);

initGallery();