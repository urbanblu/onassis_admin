"use client";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import WritersPerformace from "./_components/writers-performance";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CloseButton } from "@heroui/react";
import RetentionRatePerformance from "./_components/rate-performace";
import { AnimatePresence, motion } from "framer-motion";

export default function AnalysisPageView() {
  const router = useRouter();
  const [tabSelection, setTabSelection] = useState("writers performance");
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);
  const lastTabRef = useRef("writers performance");
  const [direction, setDirection] = useState(1);

  const handleRightTap = () => {
    if (tabSelection === "retention rate performace") return;

    setDirection(1);
    setTabSelection("retention rate performace");
  };

  const handleLeftTap = () => {
    if (tabSelection === "writers performance") return;

    setDirection(-1); // Moving "Back"
    setTabSelection("writers performance");
  };

  const directionalVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 50 : -50,
    }),
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: () => ({
      opacity: 0,
    }),
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      const tab = searchParams.get("tab");

      const urlTab = typeof tab === "string" ? tab : tab?.[0];

      if (!urlTab) {
        router.replace(`/analysis/?tab=writers performance`);
      } else if (urlTab !== tabSelection) {
        Promise.resolve().then(() => setTabSelection(urlTab));
        lastTabRef.current = urlTab;
      }
      return;
    }

    if (lastTabRef.current === tabSelection) {
      return;
    }

    lastTabRef.current = tabSelection;
    router.replace(`/analysis/?tab=${tabSelection}`);
  }, [searchParams, tabSelection, router]);

  return (
    <div className="flex flex-col p-5 px-7 pb-10">
      <div className="flex justify-between items-center space-x-3 mb-6 shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={tabSelection}
            custom={direction}
            variants={directionalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full flex justify-start items-center"
          >
            {tabSelection === "writers performance" ? (
              <span className="text-sm sm:text-lg font-gotham-black uppercase">
                WRITERS PERFORMANCE
              </span>
            ) : (
              <span className="text-sm sm:text-lg transition-all font-gotham-black uppercase">
                SALES, WINS AND RETENTION RATE PERFORMANCE
              </span>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="space-x-2 flex">
          <CloseButton
            className="border border-black bg-transparent"
            onPress={handleLeftTap}
          >
            <IoChevronBackOutline />
          </CloseButton>
          <CloseButton
            className="border border-black bg-transparent"
            onPress={handleRightTap}
          >
            <IoChevronForwardOutline />
          </CloseButton>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tabSelection}
          custom={direction}
          variants={directionalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {tabSelection === "writers performance" ? (
            <WritersPerformace />
          ) : (
            <RetentionRatePerformance />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
