import moment, { Moment } from "moment";

export const getDateRange = (
  referenceDate: Moment = moment(),
  offset: number = 1,
  days: number = 7
) => {
  const start_date = referenceDate.clone().subtract(offset, "days");
  const end_date = referenceDate.clone().add(days - offset, "days");
  return {
    orig: {
      start_date,
      end_date,
    },
    formatted: {
      start_date: start_date.format("YYYY-MM-DD"),
      end_date: end_date.format("YYYY-MM-DD"),
    },
  };
};
