const formatRate = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};

export { formatRate };
