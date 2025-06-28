import { Suspense } from "react";
import ThankYouComponent from "./_components/thank-you";

function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouComponent />
    </Suspense>
  );
}

export default ThankYouPage;
