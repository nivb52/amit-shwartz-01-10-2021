export const getSafe = (fn, default_value = false) => {
  try {
    return fn();
  } catch (e) {
    return default_value;
  }
};

export const thousandSeparator = (param) => {
  return getSafe(
    () => param.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    ""
  );
};