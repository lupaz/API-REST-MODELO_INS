
module.exports = {
  ingreso_solicitud:2,
  finalizo_solicitud:3,
  aprobo_solicitud:4,
  rechazo_solicitud:5
}

module.exports.getCodigoEstado = function (nombre){
    switch (nombre) {
      case 'SOL-INICIADA':
          return 2;
      case 'SOL-RECHAZADA':
          return 5;
      case 'SOL-APROBADA':
          return 4;
      case 'SOL-FINALIZADA':
          return 3;
    }
};


module.exports.getDescEstado = function (codigo){
    switch (codigo) {
      case 2:
          return 'SOL-INICIADA';
      case 5:
          return 'SOL-RECHAZADA';
      case 4:
          return 'SOL-APROBADA';
      case 3:
          return 'SOL-FINALIZADA';
    }
};
