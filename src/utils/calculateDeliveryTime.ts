export const calculateDeliveryTime = (distance: number): number => {
  const averageSpeed = 25;

  const distanceInKm = distance / 1000;

  const timeInHours = distanceInKm / averageSpeed;

  const timeInMinutes = timeInHours * 60;

  return timeInMinutes;
};
