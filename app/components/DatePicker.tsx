import { Range, DateRange } from "react-date-range";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Button from "./Button";
import useDateModal from "@/app/hooks/useDateModal";
import useReservation from "../hooks/useReservation";

interface DatePickerProps {
  disabledDate: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({ disabledDate }) => {
  const DateModal = useDateModal();
  const reservationStore = useReservation();

  return (
    <div className='flex flex-col border-2 border-black rounded-xl overflow-hidden shadow-lg'>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => reservationStore.setDateRange(item.selection)}
        ranges={[reservationStore.dateRange]}
        months={2}
        direction='horizontal'
        minDate={new Date()}
        maxDate={addDays(new Date(), 30)}
        disabledDates={disabledDate}
      />
      <div className='flex justify-end px-4 -mt-4'>
        <Button label='Close' onClick={DateModal.onClose} outline />
      </div>
    </div>
  );
};

export default DatePicker;
