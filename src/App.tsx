import "./App.css";
import BusinessPlan from "./components/BusinessPlan";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const App = () => {
  return (
    // Note: Phải có LocalizationProvider để có thể sử dụng được date picker
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        {/* <Calendar /> */}
        <BusinessPlan />
      </div>
    </LocalizationProvider>
  );
};

export default App;
