let calisanlar = [];

function calisanEkle() {
    const isim = document.getElementById('isim').value;
    const yas = Number(document.getElementById('yas').value);
    const departman = document.getElementById('departman').value;
    const maas = Number(document.getElementById('maas').value);

    if (!isim || yas < 18 || maas <= 0) {
        document.getElementById('eklemeSonucu').innerText = 'Geçersiz bilgi girişi.';
        return;
    }

    const mevcutCalisan = calisanlar.find(calisan => calisan.isim === isim);
    if (mevcutCalisan) {
        document.getElementById('eklemeSonucu').innerText = 'Bu isimde bir çalışan zaten var.';
        return;
    }

    calisanlar.push({ isim, yas, departman, maas });
    document.getElementById('eklemeSonucu').innerText = 'Çalışan başarıyla eklendi.';
}

function calisanGuncelle() {
    const isim = document.getElementById('guncelleIsim').value;
    const yeniYas = Number(document.getElementById('yeniYas').value);
    const yeniDepartman = document.getElementById('yeniDepartman').value;
    const yeniMaas = Number(document.getElementById('yeniMaas').value);

    const calisan = calisanlar.find(c => c.isim === isim);
    if (!calisan) {
        document.getElementById('guncelleSonucu').innerText = 'Bu isimde bir çalışan bulunamadı.';
        return;
    }

    calisan.yas = yeniYas || calisan.yas;
    calisan.departman = yeniDepartman || calisan.departman;
    calisan.maas = yeniMaas || calisan.maas;
    document.getElementById('guncelleSonucu').innerText = 'Çalışan başarıyla güncellendi.';
}

function calisanSil() {
    const isim = document.getElementById('silIsim').value;
    const index = calisanlar.findIndex(c => c.isim === isim);
    
    if (index === -1) {
        document.getElementById('silmeSonucu').innerText = 'Bu isimde bir çalışan bulunamadı.';
        return;
    }

    calisanlar.splice(index, 1);
    document.getElementById('silmeSonucu').innerText = 'Çalışan başarıyla silindi.';
}

function tumCalisanlariListele() {
    if (calisanlar.length === 0) {
        document.getElementById('listeSonucu').innerText = 'Sistemde çalışan bulunmamaktadır.';
        return;
    }

    document.getElementById('listeSonucu').innerText = JSON.stringify(calisanlar, null, 2);
}

function departmanaGoreListele() {
    const departman = document.getElementById('departmanFiltre').value;
    const filtreliCalisanlar = calisanlar.filter(c => c.departman === departman);

    if (filtreliCalisanlar.length === 0) {
        document.getElementById('listeSonucu').innerText = 'Bu departmanda çalışan bulunmamaktadır.';
        return;
    }

    document.getElementById('listeSonucu').innerText = JSON.stringify(filtreliCalisanlar, null, 2);
}

function maasaGoreSirala(artan) {
    const siraliCalisanlar = [...calisanlar].sort((a, b) => artan ? a.maas - b.maas : b.maas - a.maas);
    document.getElementById('listeSonucu').innerText = JSON.stringify(siraliCalisanlar, null, 2);
}

function maasFiltresi(limit) {
    const filtreliCalisanlar = calisanlar.filter(c => c.maas < limit);
    document.getElementById('listeSonucu').innerText = JSON.stringify(filtreliCalisanlar, null, 2);
}

function enYuksekMaas() {
    const enYuksek = calisanlar.reduce((max, c) => c.maas > max.maas ? c : max, calisanlar[0]);
    document.getElementById('yuksekMaasSonucu').innerText = `En yüksek maaşlı çalışan: ${enYuksek.isim} (${enYuksek.maas} TL)`;
}

function toplamMaas() {
    const toplam = calisanlar.reduce((sum, c) => sum + c.maas, 0);
    document.getElementById('toplamMaasSonucu').innerText = `Tüm çalışanların toplam maaşı: ${toplam} TL`;
}

function departmanMaliyeti() {
    const departman = document.getElementById('maliyetDepartman').value;
    const toplam = calisanlar.filter(c => c.departman === departman).reduce((sum, c) => sum + c.maas, 0);
    
    if (toplam === 0) {
        document.getElementById('toplamMaasSonucu').innerText = 'Bu departmanda çalışan bulunmamaktadır.';
    } else {
        document.getElementById('toplamMaasSonucu').innerText = `${departman} departmanının toplam maliyeti: ${toplam} TL`;
    }
}
