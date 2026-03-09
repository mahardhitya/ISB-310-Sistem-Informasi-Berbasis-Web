function showPage(page) {
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }

    var links = document.querySelectorAll('.nav-link');
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
    }

    document.getElementById('page-' + page).style.display = 'block';

    if (page === 'home') {
        links[0].classList.add('active');
    } else if (page === 'menu') {
        links[1].classList.add('active');
        alert('input Jumlah Pesanan agar di hitung otomatis oleh sistem');
    } else if (page === 'calculator') {
        links[2].classList.add('active');
    }
}

function shout() {
    alert('Hai, Selamat datang di Sistem Sederhana');
}

function hitungTotal() {
    var harga = [12000, 10000, 15000];
    var total = 0;

    for (var i = 1; i <= 3; i++) {
        var qty = parseInt(document.getElementById('pesan' + i).value) || 0;
        total += harga[i - 1] * qty;
    }

    var diskon = 0;
    if (total > 50000) {
        diskon = total * 0.10;
    }

    var bayar = total - diskon;

    document.getElementById('jumlahTotal').value = total;
    document.getElementById('diskon').value = diskon;
    document.getElementById('jumlahBayar').value = bayar;
}

function resetMenu() {
    for (var i = 1; i <= 3; i++) {
        document.getElementById('pesan' + i).value = 0;
    }
    document.getElementById('jumlahTotal').value = 0;
    document.getElementById('diskon').value = 0;
    document.getElementById('jumlahBayar').value = 0;
}

function hitung() {
    var a = document.getElementById('angka1').value;
    var b = document.getElementById('angka2').value;

    if (a === '' || b === '' || Number(a) <= 0 || Number(b) <= 0) {
        alert('inputan pertama dan kedua harus lebih dari 0');
        return;
    }

    a = parseFloat(a);
    b = parseFloat(b);
    var op = document.getElementById('operator').value;
    var result;

    switch (op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/':
            if (b === 0) {
                alert('Tidak bisa membagi dengan 0');
                return;
            }
            result = a / b;
            break;
        case '%': result = a % b; break;
        case '^': result = Math.pow(a, b); break;
    }

    document.getElementById('hasil').value = result;
}

function resetCalc() {
    document.getElementById('angka1').value = '';
    document.getElementById('angka2').value = '';
    document.getElementById('operator').selectedIndex = 0;
    document.getElementById('hasil').value = '';
}
