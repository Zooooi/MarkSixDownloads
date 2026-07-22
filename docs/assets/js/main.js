/**
 * 通用 HTML 模組載入函數
 */
async function loadPage(pageName, targetId) {
    const root = document.getElementById(targetId);
    if (!root) return;

    try {
        const response = await fetch(`./${pageName}.html`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const html = await response.text();
        root.innerHTML = html;

        const yearEl = root.querySelector("#current-year");
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    } catch (error) {
        console.error('Page load error:', error);
        root.innerHTML = `<div style="text-align:center; padding: 50px;">載入頁面失敗 (${pageName}.html)</div>`;
    }
}

/**
 * 通用 QR Code 彈窗函數
 * @param {string} qrImgUrl - QR Code 圖片路徑
 * @param {string} appUrl - 下載 / 應用連結
 * @param {string} [linkText='前往下載 App'] - 按鈕顯示文字 (預設值)
 * @param {string} [title='掃描 QR Code'] - 彈窗標題 (預設值)
 */
function showQrModal(qrImgUrl, appUrl, linkText = '前往下載 App', title = '掃描 QR Code') {
    const modal = document.getElementById('qr-modal');
    const qrImg = document.getElementById('modal-qr-img');
    const playLink = document.getElementById('modal-play-link');
    const modalTitle = document.getElementById('modal-title');

    if (modal && qrImg && playLink) {
        qrImg.src = qrImgUrl;
        playLink.href = appUrl;
        playLink.textContent = linkText; // 💡 動態改變連結文字
        
        if (modalTitle) {
            modalTitle.textContent = title; // 💡 動態改變標題
        }
        
        modal.classList.add('active');
    }
}

function closeQrModal(event, forceClose = false) {
    if (forceClose || event.target.id === 'qr-modal') {
        const modal = document.getElementById('qr-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
}