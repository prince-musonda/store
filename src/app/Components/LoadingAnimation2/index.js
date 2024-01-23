import LoadingSpinnerComponent from "react-spinners-components";
import "./style.css";
export default function LoadingAnimation2() {
  return (
    <div className="loading-animation-container">
      <LoadingSpinnerComponent type="Interwind" size={"100px"} />
      <p className="text-white text-2xl">Please wait ...</p>
    </div>
  );
}
