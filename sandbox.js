function formatDate(date) {
    // Mendapatkan tanggal, bulan, dan tahun dari objek Date
    var day = date.getDate();
    var month = date.getMonth() + 1; // Perlu ditambah 1 karena indeks bulan dimulai dari 0
    var year = date.getFullYear();
  
    // Menambahkan nol di depan jika tanggal atau bulan hanya satu digit
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
  
    // Mengembalikan tanggal dalam format "dd-mm-yyyy"
    return day + "-" + month + "-" + year;
  }
  
  // Contoh penggunaan
  var today = new Date(); // Menggunakan tanggal saat ini
  var formattedDate = formatDate(today);
  console.log(formattedDate);