/*
Jajan dan menabung

Amir adalah seorang murid sekolah di SD Skilvul.
Setiap harinya, Amir diberikan uang jajan oleh orang tuanya sebesar Rp.10.000,-.

Amir bisa menabung atau membeli makanan di sekolahnya untuk makan siang.
Kita telah diberikan catatan keuangan Amir dalam bentuk text biasa, dan kita diminta membuat Function untuk menghitung jumlah uang tabungan Amir per harinya dan total tabungannya dalam 1 minggu.

*/

function deserializeListObject(listHarga) {
    let listHargaObject = {};
    listHarga.map(element => {
        listHargaObject[element["nama"]] = element["harga"]
    })
    return listHargaObject;
}

function jumlahTabungan(listHarga, history) {
    // Write your code here
    const splitHistory = history.split(".");
    let splitResultHistory = {};
    let listHargaObject = deserializeListObject(listHarga);
    splitHistory.map(e => {
        const splitElement = e.split("-");
        splitResultHistory[splitElement[0]] = splitElement[1]
    })
    let totalReserve = 0;
    Object.keys(splitResultHistory).forEach((e) => {
        let values = splitResultHistory[e];
        let splitFoodName = values.split(",");
        let moneyPerDay = 10000
        splitFoodName.forEach(e => moneyPerDay -= listHargaObject[e])
        splitResultHistory[e] = moneyPerDay;
        totalReserve += moneyPerDay
    })
    splitResultHistory["TotalTabungan"] = totalReserve;
    return splitResultHistory;

}

const listHargaMakanan = [
    {
        nama: "ayam",
        harga: 5000
    },
    {
        nama: "nasi",
        harga: 2000
    },
    {
        nama: "cola",
        harga: 1000
    },
    {
        nama: "chiki",
        harga: 1500
    },
    {
        nama: "hotdog",
        harga: 3000
    },
    {
        nama: "aqua",
        harga: 2000
    }
]

let historyPembelian = `Senin-ayam,nasi,cola.Selasa-chiki,hotdog.Rabu-ayam,chiki.Kamis-hotdog.Jumat-chiki,cola,nasi`

console.log(jumlahTabungan(listHargaMakanan, historyPembelian))
/*
  output

  {
    Senin: 2000,
    Selasa: 5500,
    Rabu: 3500,
    Kamis: 7000,
    Jumat: 5500,
    TotalTabungan: 23500
  }

*/