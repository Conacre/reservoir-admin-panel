import { Reservoir } from "../types";

export function validateReservoir(
  reservoir: Reservoir,
  reservoirs: Reservoir[],
  products: { id: number; name: string }[]
): string | null {
  if (!reservoir.name || reservoir.name.trim().length === 0)
    return "Название резервуара не заполнено";
  if (reservoir.name.length < 2)
    return "Название слишком короткое";
  if (reservoir.name.length > 50)
    return "Название слишком длинное";
  if (!/^[\w\s-]+$/.test(reservoir.name))
    return "Название содержит недопустимые символы";
  if (reservoirs.some(r => r.name === reservoir.name && r.id !== reservoir.id))
    return "Резервуар с таким названием уже существует";
  if (!reservoir.product || !products.some(p => p.name === reservoir.product?.name))
    return "Тип топлива не выбран или не найден";
  if (reservoir.capacity === "" || reservoir.capacity === null || isNaN(Number(reservoir.capacity)))
    return "Объём резервуара не заполнен или некорректен";
  if (Number(reservoir.capacity) <= 0)
    return "Объём резервуара должен быть больше нуля";
  if (Number(reservoir.capacity) > 1000000)
    return "Объём резервуара слишком большой";
  if (reservoir.volume === "" || reservoir.volume === null || isNaN(Number(reservoir.volume)))
    return "Текущий объём не заполнен или некорректен";
  if (Number(reservoir.volume) < 0)
    return "Текущий объём не может быть отрицательным";
  if (Number(reservoir.volume) > Number(reservoir.capacity))
    return "Текущий объём не может быть больше максимального объёма резервуара";
  if (reservoir.isLocked)
    return "Нельзя редактировать заблокированный резервуар";
  return null;
}