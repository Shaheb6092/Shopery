 // Quick view open/close logic
 const overlay = document.getElementById('quickViewOverlay');
 const qvImg = document.getElementById('qv-img');
 const qvName = document.getElementById('qv-name');
 const qvPrice = document.getElementById('qv-price');
 const qvDesc = document.getElementById('qv-desc');

 function openQuickView(data) {
     qvImg.src = data.img;
     qvName.textContent = data.name;
     qvPrice.textContent = data.price;
     qvDesc.textContent = data.desc || 'Fresh product from our farms.';
     overlay.style.display = 'block';
     overlay.setAttribute('aria-hidden', 'false');
     // allow page to overflow; focus the overlay
     document.body.style.overflow = 'auto';
     window.scrollTo({
         top: 0,
         behavior: 'smooth'
     });
 
     // Manually initialize or refresh the Slick slider, which may not initialize
     // correctly on page load since the quick view is hidden.
     if (window.jQuery && $('.slide').length) {
         var slider = $('.slide');
         if (!slider.hasClass('slick-initialized')) {
             slider.slick(slider.data('slick'));
         } else {
             slider.slick('setPosition');
         }
     }
 }
 function closeQuickView() {
     overlay.style.display = 'none';
     overlay.setAttribute('aria-hidden', 'true');
     document.body.style.overflow = '';
 }

 document.querySelectorAll('.view-more').forEach(btn => {
     btn.addEventListener('click', function(e) {
         e.preventDefault();
         const data = {
             img: this.dataset.image,
             name: this.dataset.name,
             price: this.dataset.price
         };
         openQuickView(data);
     });
 });

 document.getElementById('qv-close').addEventListener('click', closeQuickView);
 overlay.addEventListener('click', function(e) {
     if (e.target === overlay) closeQuickView();
 });
 // close with Esc
 document.addEventListener('keydown', (e) => {
     if (e.key === 'Escape') closeQuickView();
 });

 // qty controls inside overlay
 document.getElementById('qv-increase').addEventListener('click', () => {
     let el = document.getElementById('qv-qty');
     el.value = parseInt(el.value || 1) + 1;
 });
 document.getElementById('qv-decrease').addEventListener('click', () => {
     let el = document.getElementById('qv-qty');
     el.value = Math.max(1, parseInt(el.value || 1) - 1);
 });