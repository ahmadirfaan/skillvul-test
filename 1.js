// ## Notes

// - Apabila nilai `date`, `month` atau `year` memiliki tipe selain `number`, tampilkan `'invalid type'`.
// - Apabila nilai `date`, `month` atau `year` adalah kosong, tampilkan `'empty data'`.
// - Apabila nilai `date` memiliki tipe `number`, asumsikan nilainya selalu di antara `1` hingga `31` (inclusive).
// - Apabila nilai `year` memiliki tipe `number`, asumsikan nilainya selalu `1` ke atas.
// - Nama bulan yang digunakan adalah dalam bahasa Inggris.
// - Dilarang menggunakan built-in function apapun.
// */

function getNameMonth(month) {
    const monthName = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "Mei",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
    }
    return monthName[month];
}

function humanizeDateFormat(date, month, year) {
    // Your code here
    if (isNaN(date) || isNaN(year) || isNaN(month)) {
        return 'invalid type';
    }

    if (!date || !year || !month) {
        return 'empty data';
    }

    const checkInclusiveDate = date >= 1 && date <= 31;
    const checkYear = year > 1;
    if (checkInclusiveDate && checkYear) {
        if (date < 10) {
            date = `0${date}`
        }
        month = getNameMonth(month)
        return `${date}-${month}-${year}`
    }
}

console.log(humanizeDateFormat(1,1,1985)) // output = 01-January-1985
console.log(humanizeDateFormat(5,12,2020)) // output = 05-December-2020
console.log(humanizeDateFormat(20,5,2020)) // output = 20-Mei-2020
console.log(humanizeDateFormat(2, "", 2020))