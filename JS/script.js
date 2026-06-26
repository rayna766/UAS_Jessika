$(document).ready(function () {
    let base64ImageData = ""; 

    $('#pas-foto').on('change', function () {
        const file = this.files[0];
        $('#error-foto').text('');
        $('#preview-container').slideUp();
        base64ImageData = "";

        if (file) {
            const fileType = file.type;
            const fileSize = file.size / 1024 / 1024; 
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];

            if (!validTypes.includes(fileType)) {
                $('#error-foto').text('Format file tidak sesuai! (Gunakan JPG/JPEG/PNG).');
                $(this).val(''); 
                return;
            }

            if (fileSize > 2) {
                $('#error-foto').text('Ukuran file melebihi 2 MB!');
                $(this).val(''); 
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                base64ImageData = e.target.result;
                $('#image-preview').attr('src', base64ImageData);
                $('#preview-container').slideDown('fast'); 
            };
            reader.readAsDataURL(file);
        }
    });

    function triggerInvalidAnimation(element, errorId, message) {
        $(errorId).text(message);
        element.addClass('shake-animation');
        
        setTimeout(function() {
            element.removeClass('shake-animation');
        }, 400);
    }

    $('#registration-form').on('submit', function (e) {
        e.preventDefault(); 
        let isValid = true;
        let firstInvalidInput = null;

        $('.error-msg').text('');
        $('input, select, textarea').removeClass('shake-animation');

        const nimInput = $('#nim');
        const nim = nimInput.val().trim();
        if (nim === '') {
            triggerInvalidAnimation(nimInput, '#error-nim', 'NIM tidak boleh kosong.');
            isValid = false; if(!firstInvalidInput) firstInvalidInput = nimInput;
        } else if (!/^\d+$/.test(nim)) {
            triggerInvalidAnimation(nimInput, '#error-nim', 'NIM harus berupa angka.');
            isValid = false; if(!firstInvalidInput) firstInvalidInput = nimInput;
        } else if (nim.length < 8) {
            triggerInvalidAnimation(nimInput, '#error-nim', 'NIM minimal 8 digit.');
            isValid = false; if(!firstInvalidInput) firstInvalidInput = nimInput;
        }

        const namaInput = $('#nama');
        const nama = namaInput.val().trim();
        if (nama === '') {
            triggerInvalidAnimation(namaInput, '#error-nama', 'Nama Lengkap tidak boleh kosong.');
            isValid = false; if(!firstInvalidInput) firstInvalidInput = namaInput;
        } else if (nama.length < 5) {
            triggerInvalidAnimation(namaInput, '#error-nama', 'Nama Lengkap minimal 5 karakter.');
            isValid = false; if(!firstInvalidInput) firstInvalidInput = namaInput;
        }

        const emailInput = $('#email');
        const email = emailInput.val().trim();
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            triggerInvalidAnimation(emailInput, '#error-email', 'Email tidak boleh kosong.');
            isValid = false; if(!firstInvalidInput) firstInvalidInput = emailInput;
        } else if (!emailRegEx.test(email)) {
            triggerInvalidAnimation(emailInput, '#error-email', 'Format email salah (contoh: user@domain.com).');
            isValid = false; if(!firstInvalidInput) firstInvalidInput = emailInput;
        }

        const hpInput = $('#hp');
        const hp = hpInput.val().trim();
        if (hp === '') {
            triggerInvalidAnimation(hpInput, '#error-hp', 'Nomor HP tidak boleh kosong.');
            isValid = false; if(!firstInvalidInput) firstInvalidInput = hpInput;
        } else if (!/^\d+$/.test(hp)) {
            triggerInvalidAnimation(hpInput, '#error-hp', 'Nomor HP hanya boleh berisi angka.');
            isValid = false; if(!firstInvalidInput) firstInvalidInput = hpInput;
        } else if (hp.length < 10) {
            triggerInvalidAnimation(hpInput, '#error-hp', 'Nomor HP minimal 10 digit.');
            isValid = false; if(!firstInvalidInput) firstInvalidInput = hpInput;
        }

        const gender = $('input[name="gender"]:checked').val();
        if (!gender) {
            triggerInvalidAnimation($('.radio-group'), '#error-gender', 'Jenis Kelamin wajib dipilih.');
            isValid = false; if(!firstInvalidInput) firstInvalidInput = $('.radio-group');
        }

        const prodiInput = $('#prodi');
        const prodi = prodiInput.val();
        if (prodi === '') {
            triggerInvalidAnimation(prodiInput, '#error-prodi', 'Program Studi wajib dipilih.');
            isValid = false; if(!firstInvalidInput) firstInvalidInput = prodiInput;
        }

        const alamatInput = $('#alamat');
        const alamat = alamatInput.val().trim();
        if (alamat === '') {
            triggerInvalidAnimation(alamatInput, '#error-alamat', 'Alamat tidak boleh kosong.');
            isValid = false; if(!firstInvalidInput) firstInvalidInput = alamatInput;
        } else if (alamat.length < 10) {
            triggerInvalidAnimation(alamatInput, '#error-alamat', 'Alamat minimal 10 karakter.');
            isValid = false; if(!firstInvalidInput) firstInvalidInput = alamatInput;
        }

        const fotoInput = $('#pas-foto');
        if (base64ImageData === "") {
            triggerInvalidAnimation(fotoInput, '#error-foto', 'Pas Foto wajib diunggah.');
            isValid = false; if(!firstInvalidInput) firstInvalidInput = fotoInput;
        }

        if (!isValid && firstInvalidInput) {
            firstInvalidInput.focus();
            return;
        }

        if (isValid) {
            $('#result-nim').text(nim);
            $('#result-nama').text(nama);
            $('#result-email').text(email);
            $('#result-hp').text(hp);
            $('#result-gender').text(gender);
            $('#result-prodi').text(prodi);
            $('#result-alamat').text(alamat);
            $('#result-foto').attr('src', base64ImageData);

            $('#form-container').slideUp('slow', function () {
                $('#summary-container').css({
                    'position': 'relative',
                    'left': '-100px',
                    'opacity': 0
                }).slideDown('slow', function() {
                    $(this).animate({
                        'left': '0px',
                        'opacity': 1
                    }, 'slow');
                });
            });
        }
    });

    $('#btn-edit').on('click', function () {
        
        $('#summary-container').animate({
            'left': '100px',
            'opacity': 0
        }, 'slow', function() {
            $(this).slideUp('slow', function() {
                $('#form-container').slideDown('slow');
            });
        });
    });

    $('#btn-reset').on('click', function () {
        $('.error-msg').text('');
        $('input, select, textarea').removeClass('shake-animation');
        base64ImageData = "";
        $('#preview-container').slideUp('fast');
    });
});