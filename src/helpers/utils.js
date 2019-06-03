export function formatTemp(temp) {
  const n_temp = temp.toString();
  return n_temp.substr(0, 2);
};

export function formatHum(hum) {
  const og = Math.pow(10, 0)
  return Math.floor(hum * og) / og;
};

export function formatData(i) {
  const week = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
  const monthF = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const data = new Date(i);
  const dayOfWeek = data.getDay();
  const day = data.getDate();
  const month = data.getMonth();
  const result = { 'weekDay': week[dayOfWeek], 'day': day, 'month': monthF[month] };
  return result;
};
