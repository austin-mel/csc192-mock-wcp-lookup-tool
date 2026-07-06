import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";
import Timezone from "dayjs/plugin/timezone";
import AdvancedFormat from 'dayjs/plugin/advancedFormat'
import RelativeTime from 'dayjs/plugin/relativeTime'


dayjs.extend(UTC);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);
dayjs.extend(RelativeTime);


export { dayjs };
export default dayjs;