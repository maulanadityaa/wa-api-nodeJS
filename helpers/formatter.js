const noHpFormatter = function (nohp) {
  //menghapus input selain angka
  let formatted = nohp.replace(/\D/g, "");

  //menghapus 0 prefix dan mengganti dengan 62
  if (formatted.startsWith("0")) {
    formatted = "62" + formatted.substr(1);
  }

  //menambahkan @c.us diakhir
  if (!formatted.endsWith("@c.us")) {
    formatted += "@c.us";
  }

  return formatted;
};

module.exports = { noHpFormatter };
