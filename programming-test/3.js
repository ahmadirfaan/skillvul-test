// ******
// Cari Student
// ******
//
// Function studentFinder menerima input berupa string berisi nama-nama student sebuah batch, dipisahkan oleh " " atau ",".
//     Function ini mengeluarkan output berupa nama student dengan jumlah huruf terpendek.
//     Apabila ada 2 nama student yang terpendek, maka function akan mengeluarkan nama yang berada di posisi sebelah kiri terlebih dahulu!
//
//
//     [RULES]
// - Dilarang menggunakan built-in function .split
// */


function studentFinder(students) {
    // your code here
    let temp = "";
    let result = "";
    let splitCode = [" ", ","]
    for (let i = 0; i < students.length; i++) {
        if (!splitCode.includes(students[i])) {
            temp += students[i];
            if (splitCode.includes(students[i + 1]) || i === (students.length - 1)) {
                if (result.length === 0) {
                    result = temp;
                }
                if (temp.length < result.length) {
                    result = temp;
                }
                temp = ""
            }
        }
    }
    return result;
}


console.log(studentFinder('Hanif Ranev Tio Tirta Igor Yusril Tia Titania')); // Tio
console.log(studentFinder('Yogi Hengky Trina An Hamzah')); // An
console.log(studentFinder('Huday,Kay,Trisna,Kinan,Hazman')); // Kay