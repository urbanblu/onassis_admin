"use client";

import FirstSalesSegment from "./_components/first-segment";
import SecondSalesSegment from "./_components/second-segment";
import ThirdSalesSegment from "./_components/third-segment";

function SalesPageView() {
  return (
    <div className="w-full h-[calc(100vh-6rem)] md:overflow-hidden py-5 px-5 md:px-8 flex flex-col">
      <div className="grid md:grid-cols-3 gap-x-4 h-full min-h-0 space-y-5 md:space-y-0">
        <FirstSalesSegment />
        <SecondSalesSegment />
        <ThirdSalesSegment />
      </div>
    </div>
  );
}

export default SalesPageView;
