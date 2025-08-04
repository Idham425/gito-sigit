document.addEventListener('DOMContentLoaded', function() {
    // --- Fungsionalitas Tabs (Sudah ada di HTML Anda) ---
    const mainTabsContainer = document.querySelector('.main-page-tabs');
    const mainTabButtons = mainTabsContainer.querySelectorAll('.tab-button');
    const mainTabPanes = document.querySelectorAll('.main-tabs-content .tab-pane');

    mainTabsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('tab-button')) {
            const targetTabId = event.target.dataset.tab;

            // Remove 'active' from all buttons and panes
            mainTabButtons.forEach(button => button.classList.remove('active'));
            mainTabPanes.forEach(pane => pane.classList.remove('active'));

            // Add 'active' to the clicked button and its corresponding pane
            document.getElementById(targetTabId).classList.add('active');
            event.target.classList.add('active'); // Pastikan tombol yang diklik juga aktif
        }
    });

    // --- Fungsionalitas Modal/Lightbox (Baru) ---
    // Perhatikan bahwa sekarang kita mencari gambar di seluruh dokumen, bukan hanya di hero
    const images = document.querySelectorAll('img[data-modal-image]'); // Pilih semua tag <img> dengan atribut data-modal-image
    const modal = document.getElementById('imageModal');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const closeButton = document.querySelector('.close-button');

    // Pastikan elemen modal ditemukan sebelum mencoba memanipulasinya
    if (modal && modalImage && modalTitle && modalDescription && closeButton) {
        // Fungsi untuk menampilkan modal
        function openModal(imgSrc, title, description) {
            modal.style.display = 'flex'; // Gunakan flex agar centering bekerja
            modalImage.src = imgSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            // Opsional: Sembunyikan scrollbar utama saat modal aktif
            document.body.style.overflow = 'hidden';
        }

        // Fungsi untuk menyembunyikan modal
        function closeModal() {
            modal.style.display = 'none';
            modalImage.src = ''; // Bersihkan src gambar
            modalTitle.textContent = '';
            modalDescription.textContent = '';
            // Opsional: Kembalikan scrollbar utama
            document.body.style.overflow = '';
        }

        // Tambahkan event listener untuk setiap gambar yang punya data-modal-image
        images.forEach(image => {
            image.addEventListener('click', function() {
                const imgSrc = this.getAttribute('data-modal-image');
                const title = this.getAttribute('data-modal-title');
                const description = this.getAttribute('data-modal-description');
                openModal(imgSrc, title, description);
            });
        });

        // Tambahkan event listener untuk tombol tutup
        closeButton.addEventListener('click', closeModal);

        // Tutup modal jika mengklik di luar area konten modal
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Tutup modal dengan tombol ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });
    } else {
        console.warn("Salah satu elemen modal tidak ditemukan. Pastikan HTML modal sudah benar.");
    }
});

