const formatCurrency = (value: number): string => {
  const currencyFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return currencyFormat.format(value);
};

export { formatCurrency };
